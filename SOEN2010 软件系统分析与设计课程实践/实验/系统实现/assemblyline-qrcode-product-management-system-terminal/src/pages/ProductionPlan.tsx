import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row
} from 'material-react-table'
import batchApi from '../apis/batch'
import productApi from '../apis/product'
import productModelApi from '../apis/productModel'
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Box,
  Tooltip,
  IconButton,
  Select,
  MenuItem
} from '@mui/material'
import { Delete } from '@mui/icons-material'

function CreateNewBatchModal ({
  open,
  onClose,
  onSubmit
}: {
  open: boolean
  onClose: () => void
  onSubmit: (values: Product.ProductDto[]) => void
}) {
  const defaultRequest: Batch.BatchCreationRequest = {
    modelId: 0,
    total: 0
  }

  const [request, setRequest] = useState<Batch.BatchCreationRequest>(
    defaultRequest
  )
  const [modelInfo, setModelInfo] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    void productModelApi.getAllProductModels().then(res => {
      const info: { [key: string]: number } = {}
      res.data.forEach(model => {
        if (model.type === 'FINISHED') {
          info[model.name] = model.id
        }
      })
      setModelInfo(info)
    })
  }, [])

  const handleSubmit = useCallback(() => {
    void batchApi.addBatch(request).then(async res => {
      const values = await Promise.all(
        Object.values(res.data.map).flat().map(
          async id => await productApi.getProduct(id).then(r => r.data)
        )
      )
      onSubmit(values)
      handleClose()
    })
  }, [request])

  const handleClose = useCallback(() => {
    onClose()
    setRequest(defaultRequest)
  }, [])

  return (
    <Dialog open={open}>
      <DialogTitle textAlign='center'>新建批次</DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >
            <Select
              key='model'
              label='模板'
              name='model'
              defaultValue={''}
              onChange={e =>
                setRequest({
                  ...request,
                  modelId: modelInfo[e.target.value]
                })
              }
            >
              {Object.keys(modelInfo).map(key => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
            <TextField
              key='total'
              label='数量'
              name='total'
              type='number'
              onChange={e => setRequest({ ...request, total: Number.parseInt(e.target.value) })}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={handleClose}>取消</Button>
        <Button color='secondary' onClick={handleSubmit} variant='contained'>
          新建
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
    header: '状态',
    accessorFn: row => {
      switch (row.status) {
        case 'PENDING':
          return '待生产'
        case 'IN_PROGRESS':
          return '生产中'
        case 'PRODUCED':
          return '已生产'
        case 'ACCEPTED':
          return '检验合格'
        case 'REJECTED':
          return '检验不合格'
        case 'CONSUMED':
          return '已消耗'
      }
    }
  },
  {
    header: '加工日期',
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

export default function ProductionPlan () {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [tableData, setTableData] = useState<Product.ProductDto[]>([])

  const handleDeleteRow = (row: MRT_Row<Product.ProductDto>) => {
    void productApi.deleteProduct(row.original.id).then(fetchTableData)
  }

  const handleCreateNewRow = (values: Product.ProductDto[]) => {
    setTableData([...tableData, ...values])
  }

  const fetchTableData = useCallback(() => {
    void productApi.getAllProducts().then(res => {
      setTableData(res.data.filter(product => product.status !== 'CONSUMED'))
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
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color='secondary'
            onClick={() => setCreateModalOpen(true)}
            variant='contained'
          >
            新建批次
          </Button>
        )}
      />
      <CreateNewBatchModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </div>
  )
}
