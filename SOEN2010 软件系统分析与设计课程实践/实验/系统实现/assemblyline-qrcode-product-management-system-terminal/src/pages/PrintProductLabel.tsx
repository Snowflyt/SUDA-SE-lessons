import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_TableInstance
} from 'material-react-table'
import productApi from '../apis/product'
import productModelApi from '../apis/productModel'
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Autocomplete,
  TextField
} from '@mui/material'
import { RowSelectionState } from '@tanstack/react-table'
import { drawDateTime, drawQrCode } from '../utils/label'

let previousIds: number[] = []

function PrintModal ({
  open,
  tableInstanceRef,
  onClose
}: {
  open: boolean
  tableInstanceRef: React.RefObject<MRT_TableInstance<Product.ProductDto>>
  onClose: () => void
}) {
  let productId: number = 0
  const [products, setProducts] = useState<Product.ProductDto[]>([])

  useEffect(() => {
    void productApi.getAllProducts().then(res => {
      setProducts(res.data)
    })
  }, [])

  useEffect(() => {
    setInterval(() => {
      const canvasQrcode = document.querySelector(
        '#print-raw-model-canvas-qrcode'
      )
      const canvasText = document.querySelector('#print-raw-model-canvas-text')
      if (canvasQrcode !== null && canvasText !== null) {
        if (tableInstanceRef.current !== null) {
          const rows = tableInstanceRef.current.getSelectedRowModel().rows
          if (rows.length > 0) {
            productId = rows[0].original.id
            drawQrCode(canvasQrcode as HTMLCanvasElement, productId)
            drawDateTime(canvasText as HTMLCanvasElement)
          }
        }
      }
    }, 100)
  }, [])

  const handleSubmit = useCallback(() => {
    console.log(previousIds)
    void productApi.updateProduct({
      id: productId,
      previous: previousIds
    })
  }, [])

  const handleClose = useCallback(() => {
    onClose()
  }, [])

  return (
    <Dialog open={open}>
      <DialogTitle textAlign='center'>打印标签</DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <canvas
              id='print-raw-model-canvas-qrcode'
              height='200px'
              width='200px'
            ></canvas>
            <canvas
              id='print-raw-model-canvas-text'
              height='50px'
              width='200px'
            ></canvas>
            <Autocomplete
              multiple
              id='tags-standard'
              options={products}
              getOptionLabel={option => `${option.id} - ${option.name}`}
              defaultValue={[]}
              onChange={(_, value) => {
                previousIds = value.map(v => v.id)
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='standard'
                  label='前置产品'
                  placeholder=''
                />
              )}
              sx={{ width: '100%' }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={handleClose}>取消</Button>
        <Button color='secondary' onClick={handleSubmit} variant='contained'>
          打印
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const columns: Array<MRT_ColumnDef<Product.ProductDto>> = [
  {
    header: '产品ID',
    accessorFn: row => row.id
  },
  {
    header: '名称',
    accessorFn: row => row.name
  },
  {
    header: '生产日期',
    accessorFn: row => new Date(row.date).toLocaleString()
  },
  {
    header: '批次号',
    accessorFn: row => row.batchId
  },
  {
    header: '批次中编号',
    accessorFn: row => row.batchNum
  },
  {
    header: '模板ID',
    accessorFn: row => row.modelId
  },
  {
    header: '仓库ID',
    accessorFn: row => row.warehouseId
  }
]

export default function PrintProductLabel () {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [tableData, setTableData] = useState<Product.ProductDto[]>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const tableInstanceRef = useRef<MRT_TableInstance<Product.ProductDto>>(null)

  const fetchTableData = useCallback(() => {
    void productApi.getAllProducts().then(async res => {
      const productTypes: { [key: string]: string } = {}
      await Promise.all(
        res.data.map(async product => {
          const model = await productModelApi
            .getProductModel(product.modelId)
            .then(r => r.data)
          productTypes[product.id] = model.type
        })
      )
      setTableData(
        res.data.filter(product => productTypes[product.id] !== 'RAW')
      )
    })
  }, [])

  useEffect(() => {
    fetchTableData()
  }, [])

  return (
    <div style={{ maxHeight: '100vh' }}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableColumnOrdering
        enableRowSelection
        enableMultiRowSelection={false}
        onRowSelectionChange={setRowSelection}
        muiTableBodyRowProps={({ row }) => ({
          onClick: row.getToggleSelectedHandler(),
          sx: { cursor: 'pointer' }
        })}
        state={{ rowSelection }}
        renderTopToolbarCustomActions={() => (
          <Button
            color='secondary'
            onClick={() => setCreateModalOpen(true)}
            variant='contained'
          >
            打印标签
          </Button>
        )}
        tableInstanceRef={tableInstanceRef}
      />
      {/* productId为选中的原料ID */}
      <PrintModal
        open={createModalOpen}
        tableInstanceRef={tableInstanceRef}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  )
}
