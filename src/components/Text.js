import React from 'react';
import { Typography } from '@mui/material';

const Text = props => {
    const {variant, align, name, className, ...rest} = props;

    return (
        <Typography className={`text urbanist-font ${className ?? ""}`} variant={variant} align={align ?? "center"} {...rest}>{name}</Typography>
    )
    
}

export default Text;