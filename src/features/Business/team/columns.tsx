import { ColumnDef } from "@tanstack/react-table"
import Avatar from '@mui/material/Avatar'
import GetIcon from "../../../assets/Icon/icon"
import { Button } from "../../../components/ui/button" // Adjust the import path as needed

export type Team = {
  member: {
    name: string,
    avatarUrl: string // Assuming you have avatar URLs in your data
  },
  contact: {
    email: string,
    phoneNo: string
  },
  servicingFrom: {
    date: string,
    totalDays: string
  }
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
        <Avatar src={row.original.member.avatarUrl || "/broken-image.jpg"} style={{ backgroundColor: '#1B1464' }} />
        <div className="ml-2">{row.original.member.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div>
        <div>{row.original.contact.email}</div>
        <div>{row.original.contact.phoneNo}</div>
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
        <div>{row.original.servicingFrom.date}</div>
        <div>{row.original.servicingFrom.totalDays}</div>
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



// import { ColumnDef } from "@tanstack/react-table"
// import GetIcon from "../../../assets/Icon/icon"


// export type Teams = {
//     member:string,
//     contact:string,
//     servicingFrom
   
//   }
// export const columns: ColumnDef<teams>[] = [
    
      
//       {
//         accessorKey: "member",
//         header: () => (<button className="flex items-center cursor-pointer text-left">
//             <div className="mr-1">Member</div>
//             <GetIcon
//             iconName="IconSortDefault"
//           />
//         </button>),
//       },
//       {
//         accessorKey: "contact",
//         header: "Contact",
//       },
//       {
//         accessorKey: "servicingFrom",
        
//         header: ({column}) => (<button className="flex items-center cursor-pointer">
//             <div className="mr-1">Servicing From</div>
//             <GetIcon
//             iconName="IconSortDefault"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           />
//         </button>),
//         cell: ({row}) => (<div>{row.getValue('duration')} min</div>),
//         enableSorting: true,
//       }
// ]
