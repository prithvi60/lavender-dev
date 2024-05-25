import { ColumnDef } from "@tanstack/react-table"
import GetIcon from "../../../assets/Icon/icon"
import { Selector } from "./AppointmentControllers"
import { bookingStatus } from '../../../constants/appointments'
// This type is used to define the shape of our data.
export type Appointments = {
    id: string,
    client: string,
    scheduledDate: string,
    duration: string,
    service: string,
    bookingDate: string,
    bookedBy: string,
    teamMember: string,
    price: string,
    status: string
  }
export const columns: ColumnDef<Appointments>[] = [
    {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "client",
        header: "Client",
      },
      {
        accessorKey: "scheduledDate",
        header: () => (<button className="flex items-center cursor-pointer text-left">
            <div className="mr-1">Scheduled Date</div>
            <GetIcon
            iconName="IconSortDefault"
          />
        </button>),
      },
      {
        accessorKey: "duration",
        header: () => (<button className="flex items-center cursor-pointer">
            <div className="mr-1">Duration</div>
            <GetIcon
            iconName="IconSortDefault"
          />
        </button>),
      },
      {
        accessorKey: "service",
        header: "Service",
      },
      {
        accessorKey: "bookingDate",
        header: () => (<button className="flex items-center cursor-pointer text-left">
            <div className="mr-1">Booking Date</div>
            <GetIcon
            iconName="IconSortDefault"
          />
        </button>),
      },
      {
        accessorKey: "bookedBy",
        header: "Booked By",
      },
      {
        accessorKey: "teamMember",
        header: "Team Member",
      },
      {
        accessorKey: "price",
        header: () => (<button onClick={() => console.log("price sort click")} className="flex items-center cursor-pointer">
            <div className="mr-1">Price</div>
            <GetIcon
            iconName="IconSortDefault"
          />
        </button>),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return <Selector onSelect={() => { } } className={"border-2 border-primary-clr"} placeholder={status} options={bookingStatus} label={undefined}/>
          },
      }
]
