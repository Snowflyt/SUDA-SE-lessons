import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import MaterialReactTable, { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table'
import { RowSelectionState } from '@tanstack/react-table'
import * as echarts from 'echarts'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import productApi from '../apis/product'
import productModelApi from '../apis/productModel'

interface PreviousInfo {
  dto: Product.ProductDto
  previous: PreviousInfo[]
}

interface TreeData {
  name: string
  children: TreeData[]
}

const getPreviousProducts = async (previous: number[]) => {
  const res = await Promise.all(
    previous.map(async id => await productApi.getProduct(id))
  )
  return res.map(r => r.data)
}

const parseToTree = (previous: PreviousInfo[]): TreeData[] => {
  return previous.map(p => ({
    name: `${p.dto.id} - ${p.dto.name}`,
    children: parseToTree(p.previous)
  }))
}

const getPrevious = async (
  product: Product.ProductDto
): Promise<PreviousInfo> => {
  const previous = await getPreviousProducts(product.previous)
  if (previous.length === 0) {
    return {
      dto: product,
      previous: []
    }
  }
  return {
    dto: product,
    previous: await Promise.all(
      previous.map(async p => await getPrevious(p))
    )
  }
}

function TraceModal ({
  open,
  tableInstanceRef,
  onClose
}: {
  open: boolean
  tableInstanceRef: React.RefObject<MRT_TableInstance<Product.ProductDto>>
  onClose: () => void
}) {
  useEffect(() => {
    setInterval(() => {
      const chartElement = document.querySelector('#myChart') as HTMLDivElement
      if (chartElement !== null) {
        if (tableInstanceRef.current !== null) {
          const rows = tableInstanceRef.current.getSelectedRowModel().rows
          if (rows.length > 0) {
            const productId = rows[0].original.id
            void productApi.getProduct(productId).then(async res => {
              const previousInfo = await getPrevious(res.data)
              const treeData = parseToTree([previousInfo])
              
              const chart = echarts.init(chartElement)
              // 根据数据生成树状图
              const option = {
                tooltip: {
                  trigger: 'item',
                  triggerOn: 'mousemove'
                },
                series: [
                  {
                    type: 'tree',

                    data: treeData,

                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    symbolSize: 7,

                    label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 9
                    },

                    leaves: {
                      label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                      }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                  }
                ]
              }
              chart.setOption(option)
            })
          }
        }
      }
    }, 1000)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
  }, [])

  return (
    <Dialog open={open}>
      <DialogTitle textAlign='center'>查看追溯图</DialogTitle>
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
            <div
              id='myChart'
              style={{
                width: '100%',
                height: '400px'
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button color='secondary' onClick={handleClose} variant='contained'>确定</Button>
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

export default function Trace () {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [tableData, setTableData] = useState<Product.ProductDto[]>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const tableInstanceRef = useRef<MRT_TableInstance<Product.ProductDto>>(null)

  useEffect(() => {
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
            查看追溯图
          </Button>
        )}
        tableInstanceRef={tableInstanceRef}
      />
      <TraceModal
        open={createModalOpen}
        tableInstanceRef={tableInstanceRef}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  )
}
