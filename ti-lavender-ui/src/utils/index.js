
import { routes } from "../routes"; 

export const getRoute = (name) => {
    return routes?.filter(item => item?.name === name)?.[0]?.path ?? "";
}