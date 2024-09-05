import { type Table } from "@tanstack/react-table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import Pagination from "@mui/material/Pagination"
import { Box } from "@mui/material"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
  pageData: any;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 15],
  pageData
}: DataTablePaginationProps<TData>) {

  // console.log({ pageData });


  const [currentPage, setCurrentPage] = useState(1)
  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value)
    table.setPageIndex(value - 1)
  }


  return (
    <Box className="flex items-center justify-between p-3 " sx={{ '@media (max-width: 580px)': { display: 'flex', flexDirection: 'column' } }}>
      <Box className="flex-1 text-sm text-muted-foreground w-full flex-start mb-2 md:mb-0">
        Showing {pageData?.number + 1} to {pageData?.numberOfElements} of {pageData?.totalElements} entries
      </Box>
      <Box className="flex items-center space-x-2 lg:space-x-8 md:flex-row">
        <div className="flex items-center md:space-x-2">
          <div className="text-xs md:text-sm font-medium">Rows per page</div>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">

          <button
            className="h-8 w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft width={17} height={17} className={`text-white ${!table.getCanPreviousPage() ? 'bg-gray-500' : 'bg-blue-950'} rounded-full`} />
          </button>
          <div className="flex w-full justify-center">
            <Pagination page={currentPage} color="secondary" count={table.getPageCount()} variant="outlined" shape="rounded" hideNextButton hidePrevButton onChange={handlePageChange} />
          </div>

          <button
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight width={17} height={17} className={`text-white ${!table.getCanNextPage() ? 'bg-gray-500' : 'bg-blue-950'} rounded-full`} />
          </button>
        </div>
      </Box>
    </Box>
  )
}