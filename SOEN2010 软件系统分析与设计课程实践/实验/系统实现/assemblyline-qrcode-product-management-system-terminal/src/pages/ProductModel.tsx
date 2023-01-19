import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row
} from 'material-react-table'
import productModelApi from '../apis/productModel'
import {
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableHead,
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
import produce from 'immer'

function CreateNewProductModelModal ({
  open,
  onClose,
  onSubmit
}: {
  open: boolean
  onClose: () => void
  onSubmit: (values: ProductModel.ProductModelDto) => void
}) {
  const defaultRequest: ProductModel.ProductModelCreationRequest = {
    name: '',
    type: 'RAW',
    previous: {},
    requiredInfos: []
  }

  const [request, setRequest] = useState<
    ProductModel.ProductModelCreationRequest
  >(defaultRequest)
  const [previousId, setPreviousId] = useState(0)
  const [previousAmount, setPreviousAmount] = useState(0)

  const handleSubmit = useCallback(() => {
    void productModelApi.addProductModel(request).then(async res => {
      const values = (await productModelApi.getProductModel(res.data)).data
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
      <DialogTitle textAlign='center'>创建新模板</DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >
            <TextField
              key='name'
              label='名称'
              name='name'
              onChange={e =>
                setRequest({ ...request, [e.target.name]: e.target.value })
              }
            />
            <Select
              value={request.type}
              onChange={e =>
                setRequest({ ...request, [e.target.name]: e.target.value })
              }
              inputProps={{
                name: 'type'
              }}
            >
              <MenuItem value='RAW'>原料</MenuItem>
              <MenuItem value='INTERMEDIATE'>中间品</MenuItem>
              <MenuItem value='FINISHED'>成品</MenuItem>
            </Select>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>前置模板</TableCell>
                  <TableCell>数量</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(request.previous).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack direction='row' gap='1rem'>
              <TextField
                key='previousId'
                label='前置模板ID'
                name='previousId'
                onChange={e => setPreviousId(Number.parseInt(e.target.value))}
              />
              <TextField
                key='previousAmount'
                label='数量'
                name='previousAmount'
                type='number'
                onChange={e =>
                  setPreviousAmount(Number.parseInt(e.target.value))
                }
              />
              <Button
                onClick={() => {
                  setRequest(
                    produce(request, draft => {
                      draft.previous[previousId] = previousAmount
                    })
                  )
                }}
              >
                添加
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={handleClose}>取消</Button>
        <Button color='secondary' onClick={handleSubmit} variant='contained'>
          创建
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const columns: Array<MRT_ColumnDef<ProductModel.ProductModelDto>> = [
  {
    header: '模板ID',
    accessorFn: row => row.id
  },
  {
    header: '名称',
    accessorFn: row => row.name
  },
  {
    header: '类型',
    accessorFn: row => {
      switch (row.type) {
        case 'RAW':
          return '原料'
        case 'INTERMEDIATE':
          return '中间品'
        case 'FINISHED':
          return '成品'
        default:
          return row.type
      }
    }
  }
]

export default function ProductModel () {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [tableData, setTableData] = useState<ProductModel.ProductModelDto[]>([])

  const handleDeleteRow = (row: MRT_Row<ProductModel.ProductModelDto>) => {
    void productModelApi.deleteProductModel(row.original.id).then(() => {
      setTableData([
        ...tableData.slice(0, row.index),
        ...tableData.slice(row.index + 1)
      ])
    })
  }

  const handleCreateNewRow = (values: ProductModel.ProductModelDto) => {
    setTableData(
      produce(tableData, draft => {
        draft.push(values)
      })
    )
  }

  useEffect(() => {
    void productModelApi.getAllProductModels().then(res => {
      setTableData(res.data)
    })
  }, [])

  return (
    <div style={{ maxHeight: '100vh' }}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row, table }) => (
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
            创建新模板
          </Button>
        )}
        renderDetailPanel={({ row }) => {
          const [previousNames, setPreviousNames] = useState<{
            [key: string]: string
          }>({})
          const { previous } = row.original

          useEffect(() => {
            void Promise.all(
              Object.keys(previous).map(
                async id =>
                  await productModelApi.getProductModel(Number.parseInt(id))
              )
            ).then(res => {
              const names: { [key: string]: string } = {}
              res.forEach(r => {
                names[r.data.id] = r.data.name
              })
              setPreviousNames(names)
            })
          }, [])

          return (
            <>
              {Object.keys(row.original.previous).length > 0 ? (
                <>
                  <Typography sx={{ fontSize: 16 }}>前置产品信息</Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>前置模板ID</TableCell>
                        <TableCell>模板名称</TableCell>
                        <TableCell>数量</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(row.original.previous).map(
                        ([previousId, amount]) => (
                          <TableRow key={previousId}>
                            <TableCell>{previousId}</TableCell>
                            <TableCell>{previousNames[previousId]}</TableCell>
                            <TableCell>{amount}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </>
              ) : null}
              {row.original.requiredInfos.length > 0 ? (
                <>
                  <Typography sx={{ fontSize: 16 }}>可选字段</Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>字段名称</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.original.requiredInfos.map(info => (
                        <TableRow key={info}>
                          <TableCell>{info}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : null}
            </>
          )
        }}
      />
      <CreateNewProductModelModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </div>
  )
}
