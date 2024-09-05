import { ColumnDef } from "@tanstack/react-table";
import Avatar from '@mui/material/Avatar';
import GetIcon from "../../../assets/Icon/icon";
import Button from "../../../components/Button";
import endpoint from "../../../api/endpoints";
import { useSelector } from "react-redux";
import AvatarCell from "./AvatarCell";

export type Team = {
  profileImage: string;
  employeeName: string;
  email: string;
  startingDate: string;
};



export const columns: ColumnDef<Team>[] = [
  
  {
    accessorKey: "employeeName",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer text-left"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div className="mr-1">Member</div>
        <GetIcon iconName={column.getIsSorted() ? (column.getIsSorted() === "asc" ? "IconSortAsc" : "IconSortDesc") : "IconSortDefault"} />
      </button>
    ),
    cell: ({ row }) => <AvatarCell row={row} />,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div className="mr-1">Contact</div>
        {/* <GetIcon iconName={column.getIsSorted() ? (column.getIsSorted() === "asc" ? "IconSortAsc" : "IconSortDesc") : "IconSortDefault"} /> */}
      </button>
    ),
    cell: ({ row }) => (
      <div>{row.original.email}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "startingDate",
    header: ({ column }) => (
      <button
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div className="mr-1">Servicing From</div>
        <GetIcon iconName={column.getIsSorted() ? (column.getIsSorted() === "asc" ? "IconSortAsc" : "IconSortDesc") : "IconSortDefault"} />
      </button>
    ),
    cell: ({ row }) => (
      <div>{row.original.startingDate}</div>
    ),
    enableSorting: true,
  },
  {
    id: "edit",
    cell: () => (
      <Button variant="outlined" size="lg" sx={{ width: '197px', height: '44px', padding: '10px 40px 10px 40px', borderRadius: '10px', borderColor: '#825FFF', color: '#825FFF', fontSize: '18px', fontWeight: 600 }} name={'Edit member'} />
    ),
  },
];
