import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

const CheckBox = props => {
    const {label, required, disabled, variant, onChange, value, className, ...rest} = props;

    return (
        <FormControlLabel
            control={<MuiCheckbox
                variant={variant ?? "standard"}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                className={`checkbox ${className ?? ""}`}
            />}
            label={label}
            required={required ?? true}
            disabled={disabled ?? false}
            {...rest}
        />
    )
}

export default CheckBox;