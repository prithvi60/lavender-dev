import { Button as MuiButton } from '@mui/material';

export const Button = props => {
    const { onClick, name, ...rest} = props;

    return (
        <MuiButton classes={{root: "b-button"}} variant="contained" onClick={onClick} {...rest}>
            {name}
        </MuiButton>
    )
}