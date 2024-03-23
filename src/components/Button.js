import { Button as MuiButton } from '@mui/material';

const Button = props => {
    const { onClick, name, variant, className, ...rest} = props;

    return (
        <MuiButton classes={{root: `button ${className ?? ""}`}} variant={variant ?? "contained"} onClick={onClick} {...rest}>
            {name}
        </MuiButton>
    )
}

export default Button;