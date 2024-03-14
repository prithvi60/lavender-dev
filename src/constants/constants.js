import BusinessHours from "../features/Admin/BusinessHours";
import Employee from "../features/Admin/Employee";
import Establishment from "../features/Admin/Establishment";

export const WEBSITE_TITLE ='Lavender UI';

export const BACKGROUND_COLOR = "#5F4F65";

export const LANDING_PAGE = {
    TITLE: "Welcome to Lavender",
    SUBTITLE: "Lorem ipsum dolor sit amet"
}

export const DRAWER_SUBITEMS = {
    ESTABLISHMENT: {
        ADD_ESTABLISHMENT: { NAME: "Add Establishment", COMPONENT: <Establishment />},
        ADD_SERVICE: { NAME: "Add Service", COMPONENT: <Establishment />},
        ADD_OPENING_HOURS: { NAME: "Add Opening Hours", COMPONENT: <BusinessHours />},
        ADD_EMPLOYEE: { NAME: "Add Employee", COMPONENT: <Employee />},
    }
}

export const DASHBOARD = {
    DRAWER_WIDTH: 260,
    DRAWER_ITEMS: [
        {title: "Dashboard"},
        {title: "Establishments", subTitle: Object.values(DRAWER_SUBITEMS?.ESTABLISHMENT).map(obj => obj['NAME'])},
        {title: "Bookings"},
        {title: "Users"},
        {title: "Settings"}]
}

export const SEARCH_PANEL_BOXES = ["Treatment", "Location", "Date", "Time"];

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];