import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../../components/ui/checkbox"
import { Button } from "../../../components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Client =  {
    id: number,
    clientName: string,
    email: string,
    mobile: string,
    visits: number,
    visitDate: string,
    creationDate: string
}

export const columns: ColumnDef<Client>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() 
            //&& "indeterminate"
          )
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Client",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("clientName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "mobile",
      header: () => <div className="text-right">Mobile</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue('mobile')}</div>
      },
    },
    {
      accessorKey: "visits",
      header: ({column}) => <div className="text-right"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >Visits</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue('visits')}</div>
      },
    },
    {
      accessorKey: "visitDate",
      header: () => <div className="text-right">Visit Date</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue('visitDate')}</div>
      },
    },
    {
      accessorKey: "creationDate",
      header: () => <div className="text-right">Creation Date</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue('creationDate')}</div>
      },
    },
]