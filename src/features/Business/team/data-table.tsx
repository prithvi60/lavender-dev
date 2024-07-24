import React, { useEffect, useState } from "react"
import { Button as Buttons} from "../../../components/ui/button"
import Button from "../../../components/Button"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { SearchInput, Selector, AppointmentDateSelector } from './AppointmentControllers'
import { fixedRangeDateOptions } from "../../../constants/appointments"
import { DataTablePagination } from "../../../components/DataTablePagination"
import { useDrawer } from '../BusinessDrawerContext'
import { useNavigate } from "react-router-dom"
import AddMemberForm from "./AddMemberForm"
import endpoint from "../../../api/endpoints"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const { openDrawer, isOpen } = useDrawer()
 
  // const [filterStartDate, setFilterStartDate] = useState(new Date())
  // const [filterEndDate, setFilterEndDate] = useState('')

  return (
    <div className="rounded-md border">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex m-4 justify-between items-center">
          <SearchInput
            placeholder="Search by ID/Client name"
            value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("client")?.setFilterValue(event.target.value)
            }
          />
          <div style={{paddingLeft: '10px'}}>
            <Buttons variant="outline" size="lg" style={{minWidth: '188px', minHeight: '37px'}}>Export</Buttons>
          </div>
        </div>
        <div style={{paddingRight: '10px'}}>
          <Button size="lg" sx={{minWidth: '148px', minHeight: '25px'}}
          onClick={() => openDrawer('addMember')} name={"Add Member"}></Button>
        </div>
      </div>



      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="h-24 border-b-2 border-t-2 border-gray-300"
                  key={header.id}
                  style={{ fontWeight: '600', color: "#808080" }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                style={{ fontWeight: '700', color: "#4D4D4D" }}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => openDrawer("addMember", row?.original?.employeeId)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <DataTablePagination table={table} pageData={undefined} />
      
    </div>
  )
}




// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from  "../../../components/ui/table"
// import {AppointmentDateSelector, SearchInput, Selector } from './AppointmentControllers'
// import { fixedRangeDateOptions } from "../../../constants/appointments"
// import { DataTablePagination } from "../../../components/DataTablePagination"
// import { Button } from "../../../components/ui/button"
// import GetIcon from "../../../assets/Icon/icon"
// import { useDrawer } from '../../../pages/BusinessDrawerContext';
// import { useState } from "react"
// import React from "react"
// import Avatar from '@mui/material/Avatar';


// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[]
//   data: TData[]
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [rowSelection, setRowSelection] = React.useState({})

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })

//   const { openDrawer } = useDrawer();

//   const [ filterStartDate , setFilterStartDate] = useState(new Date())
//   const [ filterEndDate , setFilterEndDate] = useState('')
//   return (
//     <div className="rounded-md border">
//         <div className="w-3/4 flex flex-row justify-between items-center">
//             <div className="flex m-4 justify-between items-center w-6/12">
//                 <SearchInput
//                 placeholder={'Search by ID/Client name'}
//                 value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
//                 onChange={(event) =>
//                   table.getColumn("client")?.setFilterValue(event.target.value)
//                 }

                // />
                {/* <Avatar  src="/broken-image.jpg" style={{ backgroundColor: '#1B1464' }}  /> */}
                {/* <Button  variant="outline" size="lg">Export</Button>
                </div> */}
                {/* <Selector onSelect={() => { } } className={"w-[180px] justify-evenly"} options={fixedRangeDateOptions} placeholder={"All time"} label={undefined}/>
                <div>
                  <AppointmentDateSelector 
                    startDate={filterStartDate}
                    endDate={filterEndDate}
                    startDateControl={setFilterStartDate}
                    endDateControl={setFilterEndDate}
                  />
                 </div> */}
                 
            {/* <div>
                  <GetIcon onClick={    
                    () => {
                    openDrawer("FilterDrawer")
                    }}
                    className='my-5 mx-16 border-2 border-gray-400 p-1 cursor-pointer rounded-sm' 
                    iconName="FilterIcon"/>
                </div> */}

                {/* <div>
                <Button  variant="outline" size="lg" className="bg-indigo-500 text-white">Add Member</Button>
                </div>
        </div>
        
      <Table>

        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="h-24 border-b-2 border-t-2 border-gray-300" key={header.id} style={{fontWeight:'600',color:"#808080"}}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                style={{fontWeight:'700',color:"#4D4D4D"}}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => openDrawer(<div>{row.id}</div>)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />

    </div>
  )
} */}
