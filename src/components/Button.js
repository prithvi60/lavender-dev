import { Button as MuiButton } from '@mui/material';

import './index.css';

export const Button = props => {
    return (
        <MuiButton className="b-button" variant="contained" onClick={props?.onClick}>
            {props?.name}
        </MuiButton>
    )
}