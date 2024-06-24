import { ColumnDef } from "@tanstack/react-table"
import Avatar from '@mui/material/Avatar'
import GetIcon from "../../../assets/Icon/icon"
import { Button } from "../../../components/ui/button" // Adjust the import path as needed

export type Team = {
  profileImage: string,
  employeeName: string,
  employeeNames: string,
  startingDate: string
}

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "member",
    header: () => (
      <button className="flex items-center cursor-pointer text-left">
        <div className="mr-1">Member</div>
        <GetIcon iconName="IconSortDefault" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Avatar src={row.original.profileImage|| "/broken-image.jpg"} style={{ backgroundColor: '#1B1464' }} />
        <div className="ml-2">{row.original.employeeName}</div>
      </div>
    ),
  },
  {
    accessorKey: "servicingFrom",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div className="mr-1">Servicing From</div>
        <GetIcon iconName="IconSortDefault" />
      </button>
    ),
    cell: ({ row }) => (
      <div>
        <div>{row.original.startingDate}</div>
      </div>
    ),
    enableSorting: true,
  },
  {
    id: "edit", 
    
    cell: () => (
      <Button variant="outline" size="lg" className="bg-indigo-500 text-white"
      onClick={() => openDrawer('addMember')}>Edit Member</Button>
    ),
  },
]
