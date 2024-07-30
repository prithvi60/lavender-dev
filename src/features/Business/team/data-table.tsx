import React, { useState } from "react";
import { Button as Buttons } from "../../../components/ui/button";
import Button from "../../../components/Button";
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
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { SearchInput } from './AppointmentControllers';
import { DataTablePagination } from "../../../components/DataTablePagination";
import { useDrawer } from '../BusinessDrawerContext';
import * as XLSX from "xlsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { openDrawer } = useDrawer();

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
  
    const headers = table.getHeaderGroups()[0]?.headers
      .map(header => header?.id)
      .filter(header => header !== 'edit') || [];
  
    const rows = table.getRowModel().rows.map(row => {
      const original: any = row.original;
      return {
        member: original.employeeName,
        contact: original?.email,
        startingDate: original.startingDate,
      };
    });
  
    if (headers.length === 0 || rows.length === 0) {
      console.error("No headers or data to export");
      return;
    }
  
    const wsData = [headers, ...rows.map(row => [row.member, row.contact, row.startingDate])];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
  
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "EmployeeList.xlsx");
  };

  return (
    <div className="rounded-md border">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex m-4 justify-between items-center">
          <SearchInput
            placeholder="Search services"
            value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("client")?.setFilterValue(event.target.value)
            }
          />
          <div style={{ paddingLeft: '10px' }}>
            <Buttons
              variant="outline"
              size="lg"
              style={{ minWidth: '188px', minHeight: '37px' }}
              onClick={handleExport}
            >
              Export
            </Buttons>
          </div>
        </div>
        <div style={{ paddingRight: '10px' }}>
          <Button
            size="lg"
            sx={{ minWidth: '148px', minHeight: '25px' }}
            onClick={() => openDrawer('addMember')}
            name={"Add Member"}
          />
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
            table.getRowModel().rows.map((row) => (
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
  );
}
