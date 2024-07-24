import * as React from "react"
import {
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
import { ChevronDown } from "lucide-react"

import Button from "../../../components/Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdownMenu"
import { Input } from "../../../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { clients } from "../../../constants/clients"
import { Client, columns } from "./clients-columns"
import { AppointmentDateSelector, SearchInput, Selector } from "../Appointments/AppointmentControllers"
import { fixedRangeDateOptions } from "../../../constants/appointments"
import { useDrawer } from "../BusinessDrawerContext"
import { useState } from "react"
import { Cancel } from "@mui/icons-material"

const data: Client[] = clients

export function BusinessClients() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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

  const { openDrawer } = useDrawer();

  const [ filterStartDate , setFilterStartDate] = useState(new Date())
  const [ filterEndDate , setFilterEndDate] = useState('')
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-evenly py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <SearchInput
          placeholder={'Search by ID/Client name'}
          // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          />
          <Selector onSelect={() => { } } className={"w-[180px] justify-evenly"} options={fixedRangeDateOptions} placeholder={"All time"} label={undefined}/>
          <div>
            <AppointmentDateSelector 
              startDate={filterStartDate}
              endDate={filterEndDate}
              startDateControl={setFilterStartDate}
              endDateControl={setFilterEndDate}
            />
            </div>
            {
            table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()
            ?
            <div className="flex ">
              <Button name={"Cancel"} variant="outlined" onClick={() => {
                table.toggleAllPageRowsSelected(false)
              }} className="mx-5">
                
                <Cancel/>
              </Button>
                <Button name={"Delete"} className="mx-5">
                
                <div className="rounded-full p-1 px-2 bg-black ml-1">{table.getFilteredSelectedRowModel().rows.length}</div>
              </Button>
            </div>
            :
            <div>
              <Button name={"Add new client"} className="mx-5" sx={{minWidth: "144px", padding: "10px, 40px, 10px, 40px"}}>
                
              </Button>
            </div>
            }
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            name={"Previous"}
          >
            
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            name={"Next"}
          >
            
          </Button>
        </div>
      </div>
    </div>
  )
}
