type BookingService = {
    serviceId: string;
    serviceName: string;
    optionId: string;
    optionName: string;
    salePrice: number;
};

type Booking = {
    bookingId: string;
    customerId: string;
    customerName: string;
    establishmentName: string;
    establishmentLocation: string;
    employeeId: string;
    employeeName: string;
    startTime: string;
    endTime: string;
    totalDuration: number;
    totalCost: number;
    appointmentNotes: string;
    bookingStatus: string;
    payAtVenue: boolean;
    services: BookingService[];
    review: any;
    serviceName: string;
    bookingType: string;
};

type SortInfo = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
};

type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: SortInfo;
    offset: number;
    paged: boolean;
    unpaged: boolean;
};

export type BookingResponse = {
    data:
    {
        content: Booking[];
        pageable: Pageable;
        totalPages: number;
        totalElements: number;
        last: boolean;
        numberOfElements: number;
        size: number;
        number: number;
        sort: SortInfo;
        first: boolean;
        empty: boolean;
    }
};

export enum TimeOfDay {
    Morning = "morning",
    Afternoon = "afternoon",
    Evening = "evening",
    Night = "night",
  }

export type SchedulePayload = {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: string;
    establishmentId?: string;
    customerId?: string;
    customerName?: string;
    fromDate?: string;
    toDate?: string;
    fromCost?: number;
    toCost?: number;
}