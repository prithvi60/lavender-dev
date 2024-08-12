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
import { Box } from "@mui/material";
import "./style.css";

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

  // Helper function to handle search input changes
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    // Set filter on the "client" column (change this to the appropriate column ID)
    table.getColumn("employeeName")?.setFilterValue(searchValue);
  };

  return (
    <div className="rounded-md border">
      <Box className="w-full flex flex-row justify-between items-center" sx={{'@media (max-width: 1000px)':{display: 'flex', flexDirection: 'column !important', alignItems: 'center'}}}>
        <Box className="flex m-4 justify-between items-center flex-wrap gap-4">
          <SearchInput
            placeholder="Search services"
            value={(table.getColumn("employeeName")?.getFilterValue() as string) ?? ""}
            onChange={handleSearchInputChange} // Attach the change handler
          />
          <Box sx={{ paddingLeft: '10px', '@media (max-width: 600px)': {width: '100px'} }}>
            <Buttons
              className="exportBtn"
              variant="outline"
              // size="lg"
              style={{ width: '188px', height: '37px', color: '#4D4D4D', fontSize: '18px', fontWeight: 700 }}
              onClick={handleExport}
            >
              Export
            </Buttons>
          </Box>
          <Box sx={{ 
            right: '10px',
            position: 'absolute',
            '@media (max-width: 600px)': {
              position: 'static',
              display: 'block'
            }
          }}>
          <Button
            size="lg"
            sx={{ width: '200px', height: '44px', borderRadius: '10px', padding: '10px 40px 10px 40px', fontSize: '18px', fontWeight: 600 }}
            onClick={() => openDrawer('addMember')}
            name={"Add Member"}
          />
        </Box>
        </Box>

      </Box>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="h-24 border-b-2 border-t-2 border-gray-300"
                  key={header.id}
                  style={{ fontWeight: '600', color: "#808080", fontSize: '20px' }}
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
                style={{ fontWeight: '700', color: "#4D4D4D", fontSize: '18px' }}
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
