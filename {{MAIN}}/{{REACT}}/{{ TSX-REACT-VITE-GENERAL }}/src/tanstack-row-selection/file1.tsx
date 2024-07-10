import React, { HTMLProps } from 'react'
import ReactDOM from 'react-dom/client'

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

import './index.css'
import { makeData, Person } from './makeData'


function App() {
  //const rerender = React.useReducer(() => ({}), {})[1]
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo<ColumnDef<Person>[]>(() =>
    [{ id: 'select', header: () => {} , cell: ({ row }) =>(<div>
        <IndeterminateCheckbox {...{ checked: row.getIsSelected(), disabled: !row.getCanSelect(), indeterminate: row.getIsSomeSelected(), onChange: row.getToggleSelectedHandler(),}}/>
    </div>)},

    {accessorKey: 'title', cell: info => info.getValue() },
    {accessorKey: 'visits', header: '06', footer: props => props.column.id },
    {accessorKey: 'status', header: '07', footer: props => props.column.id },
    {accessorKey: 'progress', header: 'total', footer: props => props.column.id, }, ], [])

  const [data, {/*setData*/}] = React.useState(() => makeData(100000))
  //const refreshData = () => setData(() => makeData(100000))


  const table = useReactTable({
    data, columns, state: {rowSelection, }, enableRowSelection: true, 
    onRowSelectionChange: setRowSelection, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), debugTable: true, })

  return (
    <div className="TableContainer"><table><thead>
      {table.getHeaderGroups().map(headerGroup => (<tr key={headerGroup.id}>{headerGroup.headers.map(header => {
        return (<th key={header.id} colSpan={header.colSpan}>{header.isPlaceholder ? null :
        (<>{flexRender( header.column.columnDef.header,header.getContext())}</>)}</th>)})}</tr>))}</thead>

        <tbody>{table.getRowModel().rows.map(row => {return (<tr key={row.id}>{row.getVisibleCells().map(cell => {return (
        <td key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</td>)})}</tr>)})}

    </tbody></table></div>
  )
}



function IndeterminateCheckbox({indeterminate, className = '', ...rest }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => { if (typeof indeterminate === 'boolean') {ref.current.indeterminate = !rest.checked && indeterminate}}, [ref, indeterminate])
  return (<input type="checkbox" ref={ref} className={className + ' cursor-pointer'}{...rest}/>)}


const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>)
