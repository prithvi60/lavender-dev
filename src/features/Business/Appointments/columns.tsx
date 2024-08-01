import { ColumnDef } from "@tanstack/react-table"
import GetIcon from "../../../assets/Icon/icon"
import { Selector } from "./AppointmentControllers"
import { bookingStatus } from '../../../constants/appointments'
import { formatDateString } from "../../../utils/TimeFormat"
// This type is used to define the shape of our data.
export type Appointments = {
    id: string,
    client: string,
    scheduledDate: string,
    duration: string | number,
    service: string,
    bookingDate: string,
    bookedBy: string,
    teamMember: string,
    price: string | number,
    status: string,
    bookingType: string,
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
        cell: ({row}) => {
          const {date, time } = formatDateString(row.getValue('scheduledDate'))
          return (
            <div>
              {date}
              <br/>
              {time}
            </div>
          )
        }
      },
      {
        accessorKey: "duration",
        
        header: ({column}) => (<button className="flex items-center cursor-pointer">
            <div className="mr-1">Duration</div>
            <GetIcon
            iconName="IconSortDefault"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </button>),
        cell: ({row}) => (<div>{row.getValue('duration')} min</div>),
        enableSorting: true,
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
        cell: ({row}) => {
          const {date, time } = formatDateString(row.getValue('bookingDate'))
          return (
            <div>
              {date}
              <br/>
              {time}
            </div>
          )
        }
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
        accessorKey: "bookingType",
        header: "Booking Type",
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
            const status: string = row.getValue("status")
            return <Selector onSelect={() => { } } className={"border-2 border-primary-clr rounded-lg text-lg capitalize"}  placeholder={status} options={bookingStatus} label={undefined}/>
          },
      }
]
