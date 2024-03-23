import { TextField as MuiTextField } from '@mui/material';

const TextField = props => {
    return (
        <MuiTextField
            required={props?.required ?? true}
            id={props?.id}
            name={props?.id}
            label={props?.label}
            fullWidth
            autoComplete={props?.autoComplete}
            variant={props?.variant ?? "standard"}
            onChange={(e) => props?.onChange(props?.id, e.target.value)}
            value={props?.value}
            className='textfield'
        />
    )
}

export default TextField;