import React from 'react';
import { Typography } from '@mui/material';

const Text = props => {
    const {variant, align, name, className, ...rest} = props;

    return (
        <Typography className={`text ${className ?? ""}`} variant={variant} align={align ?? "center"}>{name}</Typography>
    )
    
}

export default Text;