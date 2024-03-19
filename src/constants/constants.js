import BusinessHours from "../features/Admin/BusinessHours";
import Employee from "../features/Admin/Employee";
import Establishment from "../features/Admin/Establishment";
import Service from "../features/Admin/Service";

export const WEBSITE_TITLE ='Lavender UI';

export const BACKGROUND_COLOR = "#5F4F65";

export const LANDING_PAGE = {
    TITLE: "Welcome to Lavender",
    SUBTITLE: "Lorem ipsum dolor sit amet"
}

/** Obsolete for deprecation */
export const DRAWER_SUBITEMS = {
    MANAGEMENT: {
        ESTABLISHMENTS: { NAME: "Establishments", COMPONENT: <Establishment />},
        SERVICES: { NAME: "Services", COMPONENT: <Service />},
        OPENING_HOURS: { NAME: "Opening Hours", COMPONENT: <BusinessHours />},
        EMPLOYEES: { NAME: "Employees", COMPONENT: <Employee />},
    }
}



export const DASHBOARD = {
    DRAWER_WIDTH: 260,
    DRAWER_ITEMS: [
        {title: "Dashboard"},
        {title: "Management"},
        {title: "Bookings"},
        {title: "Users"},
        {title: "Settings"}],
    DRAWER_COMPONENTS: {
        MANAGEMENT: {COMPONENT:  <Establishment />}
    }
}

export const SEARCH_PANEL_BOXES = ["Treatment", "Location", "Date", "Time"];

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SERVICE_CATEGORIES = {
    OPTIONS: [
        'Haircut', 'Manicure', 'Pedicure', 'Massage', 'Facial'
    ],
    PLACEHOLDER: "Select category"
};