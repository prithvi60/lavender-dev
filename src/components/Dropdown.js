import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Dropdown = props => {
    const { label, variant, required, value, onChange, options, ...rest} = props;

    const getOptions = () => {
        return options?.map((option, index) => {
            return <MenuItem value={option?.value}>{option?.label}</MenuItem>
        })
    }

    return (
        <FormControl variant={variant ?? "standard"} fullWidth required={required ?? true}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
                {...rest}
            >
                {getOptions()}
            </Select>
        </FormControl>
    )
}

export default Dropdown;