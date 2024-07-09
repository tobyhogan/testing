import React, { HTMLAttributes, HTMLProps } from 'react'
import ReactDOM from 'react-dom/client'

import { Column, ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, Table, useReactTable } from '@tanstack/react-table'

import './index.css'
import { makeData, Person } from './makeData'


function App() {
  const rerender = React.useReducer(() => ({}), {})[1]
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo<ColumnDef<Person>[]>(() => [{ id: 'select', header: ({ table }) => (<IndeterminateCheckbox {...{
    checked: table.getIsAllRowsSelected(), indeterminate: table.getIsSomeRowsSelected(), onChange: table.getToggleAllRowsSelectedHandler(), }}/>),
        cell: ({ row }) => (<div className="px-1"><IndeterminateCheckbox
          {...{ checked: row.getIsSelected(), disabled: !row.getCanSelect(), indeterminate: row.getIsSomeSelected(), onChange: row.getToggleSelectedHandler(),
          }}/></div>),},{ header: 'voidme', footer: props => props.column.id, columns: [ {accessorKey: 'title', cell: info => info.getValue(), footer: props => props.column.id,},
          { accessorFn: row => row.lastName, id: 'lastName', cell: info => info.getValue(), header: () => <span>03</span>, footer: props => props.column.id, },],},
      { header: 'voidme', footer: props => props.column.id, columns: [ {accessorKey: 'age',
        header: () => '05', footer: props => props.column.id,}, { header: 'voidme', columns: [ {accessorKey: 'visits', header: () => <span>06</span>, footer: props => props.column.id, },
          {accessorKey: 'status',header: '07',footer: props => props.column.id,},
          {accessorKey: 'progress', header: 'total', footer: props => props.column.id, },],},],},],[] )

  const [data, setData] = React.useState(() => makeData(100000))
  const refreshData = () => setData(() => makeData(100000))


  const table = useReactTable({
    data, columns, state: {rowSelection, }, enableRowSelection: true, //enable row selection for all rows
    onRowSelectionChange: setRowSelection, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), debugTable: true, })

  return (
    <div className="p-2"><div className="h-2" /><table><thead>
      {table.getHeaderGroups().map(headerGroup => (<tr key={headerGroup.id}>{headerGroup.headers.map(header => {
        return (<th key={header.id} colSpan={header.colSpan}>{header.isPlaceholder ? null : (<>
          {flexRender(
            header.column.columnDef.header,
            header.getContext()

    )}</>)}</th>)})}</tr>))}</thead>

        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()

          )}</td>)})}</tr>)})}
        </tbody><tfoot><tr><td className="p-1"><IndeterminateCheckbox
                {...{
                  checked: table.getIsAllPageRowsSelected(),
                  indeterminate: table.getIsSomePageRowsSelected(),
                  onChange: table.getToggleAllPageRowsSelectedHandler(),

      }}/></td><td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td></tr></tfoot></table><div className="h-2" />

      <div><button className="border rounded p-2 mb-2" onClick={() => rerender()}>Force Rerender</button></div>
      <div><button className="border rounded p-2 mb-2" onClick={() => refreshData()}>Refresh Data</button></div>
      <div><button className="border rounded p-2 mb-2" onClick={() => console.info('table.getSelectedRowModel().flatRows',
        table.getSelectedRowModel().flatRows)}>Log table.getSelectedRowModel().flatRows</button></div>
      <div><label>Row Selection State:</label><pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre></div>
    </div>
  )
}



function IndeterminateCheckbox({indeterminate, className = '', ...rest }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => { if (typeof indeterminate === 'boolean') {ref.current.indeterminate = !rest.checked && indeterminate}}, [ref, indeterminate])
  return (<input type="checkbox" ref={ref} className={className + ' cursor-pointer'}{...rest}/>)}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>)
