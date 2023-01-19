import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row
} from 'material-react-table'
import warehouseApi from '../apis/warehouse'
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
import _ from 'lodash'

function CreateNewRawProduct ({
  open,
  onClose,
  onSubmit
}: {
  open: boolean
  onClose: () => void
  onSubmit: (values: Product.ProductDto[]) => void
}) {
  const defaultRequest: Product.ProductCreationRequest = {
    status: 'ACCEPTED',
    batchId: 0,
    batchNum: 0,
    modelId: 0,
    machineId: 0,
    warehouseId: 0,
    previous: [],
    infos: {}
  }

  const [request, setRequest] = useState<Product.ProductCreationRequest>(
    defaultRequest
  )
  const [modelInfo, setModelInfo] = useState<{ [key: string]: number }>({})
  const [warehouseInfo, setWarehouseInfo] = useState<{ [key: string]: number }>(
    {}
  )
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    void productModelApi.getAllProductModels().then(res => {
      const info: { [key: string]: number } = {}
      res.data.forEach(model => {
        if (model.type === 'RAW') {
          info[model.name] = model.id
        }
      })
      setModelInfo(info)
    })
  }, [])

  useEffect(() => {
    void warehouseApi.getAllWarehouses().then(res => {
      const info: { [key: string]: number } = {}
      res.data.forEach(warehouse => {
        info[warehouse.houseName] = warehouse.id
      })
      setWarehouseInfo(info)
    })
  }, [])

  const handleSubmit = useCallback(() => {
    void Promise.all(
      _.range(1, amount + 1).map(
        async num => await productApi.addProduct({ ...request, batchNum: num })
      )
    ).then(async responses => {
      const values = await Promise.all(
        responses.map(
          async res => await productApi.getProduct(res.data).then(r => r.data)
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
      <DialogTitle textAlign='center'>录入原料</DialogTitle>
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
              key='batchId'
              label='批次号'
              name='batchId'
              type='number'
              onChange={e =>
                setRequest({
                  ...request,
                  [e.target.name]: Number.parseInt(e.target.value)
                })
              }
            />
            <TextField
              key='amount'
              label='数量'
              name='amount'
              type='number'
              onChange={e => setAmount(Number.parseInt(e.target.value))}
            />
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
            <Select
              key='warehouse'
              label='仓库'
              name='warehouse'
              defaultValue={''}
              onChange={e =>
                setRequest({
                  ...request,
                  warehouseId: warehouseInfo[e.target.value]
                })
              }
            >
              {Object.keys(warehouseInfo).map(key => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={handleClose}>取消</Button>
        <Button color='secondary' onClick={handleSubmit} variant='contained'>
          录入
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const columns: Array<MRT_ColumnDef<Product.ProductDto>> = [
  {
    header: '原料ID',
    accessorFn: row => row.id
  },
  {
    header: '名称',
    accessorFn: row => row.name
  },
  {
    header: '入库日期',
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

export default function Warehousing () {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [tableData, setTableData] = useState<Product.ProductDto[]>([])

  const handleDeleteRow = (row: MRT_Row<Product.ProductDto>) => {
    void productApi.deleteProduct(row.original.id).then(fetchTableData)
  }

  const handleCreateNewRow = (values: Product.ProductDto[]) => {
    setTableData([...tableData, ...values])
  }

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
        res.data.filter(product => productTypes[product.id] === 'RAW')
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
            录入原料
          </Button>
        )}
      />
      <CreateNewRawProduct
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </div>
  )
}
