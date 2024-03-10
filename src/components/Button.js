import { Button as MuiButton } from '@mui/material';

import './index.css';

export const Button = props => {
    const { onClick, name, ...rest} = props;

    return (
        <MuiButton className="b-button" variant="contained" onClick={onClick} {...rest}>
            {name}
        </MuiButton>
    )
}