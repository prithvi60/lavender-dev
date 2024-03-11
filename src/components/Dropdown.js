import { Select, MenuItem } from "@mui/material";

export const Dropdown = props => {
    const { onChange, value, placeholder, options, ...rest} = props;

    return (
        <Select
            name="designation"
            value={value}
            onChange={onChange}
            fullWidth
            variant="outlined"
            displayEmpty
            margin="dense"
            placeholder={placeholder}
            {...rest}
        >
            <MenuItem value="">{placeholder}</MenuItem>
            {options?.map(item => {
                return (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                )
            })}
        </Select>
    )
}