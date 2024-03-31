import { TextField as MuiTextField } from '@mui/material';

const TextField = props => {
    const { id, required, label, autoComplete, variant, onChange, value, ...rest} = props;

    return (
        <MuiTextField
            required={required ?? true}
            id={id}
            name={id}
            label={label}
            fullWidth
            autoComplete={autoComplete}
            variant={variant ?? "standard"}
            onChange={(e) => onChange(id, e.target.value)}
            value={value}
            className='textfield'
            {...rest}
        />
    )
}

export default TextField;