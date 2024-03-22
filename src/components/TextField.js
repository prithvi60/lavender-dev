import { TextField as MuiTextField } from '@mui/material';

export const TextField = props => {
    return (
        <MuiTextField
            required={props?.required}
            id={props?.id}
            name={props?.id}
            label={props?.label}
            fullWidth
            autoComplete={props?.autoComplete}
            variant="outlined"
            onChange={(e) => props?.handleOnChange(props?.id, e.target.value)}
            value={props?.value}
            className='textfield'
        />
    )
}