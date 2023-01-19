import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import * as React from 'react'
import { useEffect, useState } from 'react'
import defectInfoApi from '../apis/defectInfo'
import productApi from '../apis/product'
import productModelApi from '../apis/productModel'

export default function DefectMark () {
  const [products, setProducts] = useState<Product.ProductDto[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product.ProductDto>()
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')

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
      setProducts(
        res.data.filter(
          product =>
            productTypes[product.id] !== 'RAW' && product.status === 'PRODUCED'
        )
      )
    })
  }, [])

  const handleMarkDefect = () => {
    void defectInfoApi
      .addDefectInfo({
        productId: selectedProduct?.id ?? 0,
        type,
        description
      })
      .then(async () => {
        await productApi.updateProduct({
          id: selectedProduct?.id ?? 0,
          status: 'REJECTED'
        })
        setSelectedProduct(undefined)
        setType('')
        setDescription('')
      })
  }

  const handleMarkNonDefect = () => {
    void productApi.updateProduct({
      id: selectedProduct?.id ?? 0,
      status: 'ACCEPTED'
    })
    setSelectedProduct(undefined)
    setType('')
    setDescription('')
  }

  return (
    <>
      <Typography variant='h5'>缺陷品标记</Typography>
      <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <Select
          value={selectedProduct?.id.toString() ?? ''}
          onChange={e => {
            const id = Number.parseInt(e.target.value)
            const product = products.find(p => p.id === id)
            setSelectedProduct(product)
          }}
        >
          {products.map(product => (
            <MenuItem key={product.id} value={product.id}>
              {product.id} - {product.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label='缺陷类型'
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <TextField
          label='缺陷描述'
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          multiline
        />
        <Button
          variant='contained'
          color='secondary'
          disabled={selectedProduct === null}
          onClick={handleMarkDefect}
        >
          标记缺陷
        </Button>
        <Button
          variant='contained'
          color='success'
          disabled={selectedProduct === null}
          onClick={handleMarkNonDefect}
        >
          标记非缺陷
        </Button>
      </Box>
    </>
  )
}
