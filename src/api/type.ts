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
};

export enum TimeOfDay {
    Morning = "morning",
    Afternoon = "afternoon",
    Evening = "evening",
    Night = "night",
  }