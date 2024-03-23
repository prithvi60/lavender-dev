import Establishment from "../features/Admin/Establishment";

export const WEBSITE_TITLE ='Lavender UI';

export const BACKGROUND_COLOR = "#5F4F65";

export const LANDING_PAGE = {
    TITLE: "Welcome to Lavender",
    SUBTITLE: "Lorem ipsum dolor sit amet"
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
        {label: 'Haircut', value: 'haircut'},
        {label: 'Manicure', value: 'manicure'},
        {label: 'Pedicure', value: 'pedicure'},
        {label: 'Massage', value: 'massage'},
        {label: 'Facial', value: 'facial'},
    ],
    PLACEHOLDER: "Select category"
};

export const DESIGNATION = {
    OPTIONS: [
        {label: 'Manager', value: 'manager'},
        {label: 'Supervisor', value: 'supervisor'},
        {label: 'Assistant', value: 'assistant'},
        {label: 'Hairstylist', value: 'hairstylist'},
    ],
    PLACEHOLDER: "Select designation"
}

export const STATUS = {
    OPTIONS: [
        {label: 'Active', value: 'active'},
        {label: 'InActive', value: 'inActive'},
    ],
    PLACEHOLDER: "Select status"
}