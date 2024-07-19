export interface ISaloonData {
  id: number;
  tags: string[];
  image: string;
  parlorName: string;
  rating: number;
  treatments:any;
  location: string;
  reviewCount: number;
}


export interface ISearchEstablishmentData{
  establishmentId: number,
  establishmentName: string,
  establishmentLocation: string,
  estImages: string[],
  rating: number,
  services: [],
}

export interface Appointments{
  id: string,
  client: string,
  ScheduledDate: string,
  duration: string,
  service: string,
  bookingDate: string,
  bookedBy: string,
  TeamMember: string,
  price: string,
  Status: string
}


export interface IScheduleAppointmentList {
  availableDate:  string;
  availableSlots: IAvailableSlots;
}

export interface IAvailableSlots {
  Morning:   ISlotDetail[];
  Afternoon: ISlotDetail[];
  Evening:   ISlotDetail[];
}

export interface ISlotDetail {
  employeeId: string;
  startTime:  string;
  endTime:    string;
  isSelected: boolean;
}

export interface SaveAppoinment {
  customerId:          string;
  establishmentId:     string;
  employeeId:          string;
  startTime:           Date;
  endTime:             Date;
  totalDuration:       number;
  totalCost:           number;
  appointmentNotes:    string;
  serviceTags:         string[];
  appointmentServices: AppointmentService[];
  paymentInfo:         PaymentInfo;
  walkIn:              boolean;
}

export interface AppointmentService {
  serviceId: string;
  optionId:  string;
}

export interface PaymentInfo {
  payAtVenue:  boolean;
  cardStoreId: string;
}
