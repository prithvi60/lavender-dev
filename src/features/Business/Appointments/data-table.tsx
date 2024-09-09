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
import { AppointmentDateSelector, SearchInput, Selector } from './AppointmentControllers'
import { fixedRangeDateOptions } from "../../../constants/appointments"
import { DataTablePagination } from "../../../components/DataTablePagination"
import { Button } from "../../../components/ui/button"
import GetIcon from "../../../assets/Icon/icon"
import { useDrawer } from '../BusinessDrawerContext';
import { useState } from "react"
import React from "react"
import * as XLSX from 'xlsx';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageData: any,
  controllers: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageData,
  controllers
}: DataTableProps<TData, TValue>) {
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

  const [filterStartDate, setFilterStartDate] = useState(new Date())
  const [filterEndDate, setFilterEndDate] = useState('')

  const handleExport = () => {
 
    const visibleColumns = table.getAllColumns().filter(column => column.getIsVisible());

    const filteredData = table.getFilteredRowModel().rows;

    const sortedData = table.getSortedRowModel().rows;


    const filteredSortedData = sortedData.filter(row => filteredData.includes(row));


    const exportData = filteredSortedData.map(row => {
      const rowData: any = {};
      visibleColumns.forEach(column => {
        rowData[column.id] = row.getValue(column.id);
      });
      return rowData;
    });

 
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData, { header: visibleColumns.map(col => col.id) });


    XLSX.utils.book_append_sheet(wb, ws, "Appointments");

    XLSX.writeFile(wb, "appointments_export.xlsx");
  };

  return (
    <div className="rounded-md border">
      <div className="w-full flex flex-row justify-between items-center overflow-x-auto">
        <div className="flex m-4 gap-3.5 items-center w-full overflow-x-auto">
          <SearchInput
            value={""}
            placeholder={'Search by ID/Client name'}
            onChange={(event) =>
              controllers.customerName(event.target.value)
            }
          />
          <Selector onSelect={() => { }} className={"w-[188px] justify-evenly"} options={fixedRangeDateOptions} placeholder={"All time"} label={undefined} />
          <div>
            <AppointmentDateSelector
              startDate={filterStartDate}
              endDate={filterEndDate}
              startDateControl={setFilterStartDate}
              endDateControl={setFilterEndDate}
            />
          </div>
          <Button style={{ minWidth: '100px' }} variant="outline" size="lg" onClick={handleExport}>Export</Button>
        </div>
        <div>
          <GetIcon onClick={
            () => {
              openDrawer("FilterDrawer")
            }}
            className='mr-2 border-2 border-gray-400 p-1 cursor-pointer rounded-sm'
            iconName="FilterIcon" />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="h-24 border-b-2 border-t-2 border-gray-300" key={header.id} style={{ fontWeight: '600', color: "#808080", fontSize: '20px' }}>
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
                style={{ fontWeight: '700', color: "#4D4D4D", fontSize: '18px' }}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => openDrawer("AppointmentEdit", [row])}
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
      <DataTablePagination table={table} pageData={pageData} />

    </div>
  )
}
