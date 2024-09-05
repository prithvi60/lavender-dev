import React from "react";
import Establishment from "../features/Admin/Establishment";
import Users from "../features/Admin/Users";

export const WEBSITE_TITLE = "Lavender UI";

export const BACKGROUND_COLOR = "#5F4F65";

export const LANDING_PAGE = {
  TITLE: "Discover me time.",
  SUBTITLE: "",
};

export const LANDING_PAGE_BUSINESS = {
  TITLE: "Lavender Business",
  SUBTITLE: "",
};

export const DASHBOARD = {
  DRAWER_WIDTH: 260,
  DRAWER_ITEMS: [
    { title: "Dashboard" },
    { title: "Management" },
    { title: "Bookings" },
    { title: "Users" },
    { title: "Settings" },
  ],
  DRAWER_COMPONENTS: {
    MANAGEMENT: { COMPONENT: <Establishment /> },
    USERS: { COMPONENT: <Users /> },
  },
};

export const SEARCH_PANEL_BOXES = ["Treatment", "Location", "Date", "Time"];

export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const SERVICE_CATEGORIES = {
  OPTIONS: [
    { label: "Haircut", value: "haircut" },
    { label: "Manicure", value: "manicure" },
    { label: "Pedicure", value: "pedicure" },
    { label: "Massage", value: "massage" },
    { label: "Facial", value: "facial" },
  ],
  PLACEHOLDER: "Select category",
};

export const DESIGNATION = {
  OPTIONS: [
    { label: "Manager", value: "manager" },
    { label: "Supervisor", value: "supervisor" },
    { label: "Assistant", value: "assistant" },
    { label: "Hairstylist", value: "hairstylist" },
  ],
  PLACEHOLDER: "Select designation",
};

export const STATUS = {
  OPTIONS: [
    { label: "Active", value: "active" },
    { label: "InActive", value: "inActive" },
  ],
  PLACEHOLDER: "Select status",
};

export   const categories = [
  { id: 1, name: 'Nail', image: 'NailImage' },
  { id: 2, name: 'Hair', image: 'WomenHairImage' },
  { id: 3, name: 'HairRemoval', image: 'HairRemovalImage' },
  { id: 4, name: 'Face', image: 'FaceImage' },
  { id: 5, name: 'Massage', image: 'MassageImage' },
  { id: 6, name: 'Men', image: 'MenImage' },
];

export const BUSINESS_NAV = [
  { label: "Home", iconName: "SalonHome" },
  { label: "Schedule", iconName: "Schedule" },
  { label: "Appointments", iconName: "Appointments" },
  { label: "Clients", iconName: "Clients" },
  { label: "Services", iconName: "Services" },
  { label: "Team", iconName: "Team" },
  { label: "Analytics", iconName: "Analytics" },
  { label: "Salon profile", iconName: "SalonProfile" },
  { label: "Account", iconName: "Account" },
]

export const bookingStatusFilters = ["confirmed", "booked", "cancelled", "finished"]

export const statusColors = ['#8280BA', '#35AFAC', '#FF83B0', '#E6E1FF']
export const nullStatusColors = ['#E6E6E6', '#fff']