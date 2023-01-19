import * as React from 'react'
import { useEffect, useState } from 'react'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import defectInfoApi from '../apis/defectInfo'
import { Box } from '@mui/material'

const columns: Array<MRT_ColumnDef<DefectInfo.DefectInfoDto>> = [
  {
    header: '缺陷信息ID',
    accessorFn: row => row.id
  },
  {
    header: '产品ID',
    accessorFn: row => row.productId
  },
  {
    header: '上传时间',
    accessorFn: row => row.date
  },
  {
    header: '缺陷类型',
    accessorFn: row => row.type
  }
]

export default function DefectReport () {
  const [tableData, setTableData] = useState<DefectInfo.DefectInfoDto[]>([])

  useEffect(() => {
    void defectInfoApi.getAllDefectInfos().then(res => {
      setTableData(res.data)
    })
  }, [])

  return (
    <div style={{ maxHeight: '100vh' }}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableColumnOrdering
        renderDetailPanel={({ row }) => <Box>{row.original.description}</Box>}
      />
    </div>
  )
}
