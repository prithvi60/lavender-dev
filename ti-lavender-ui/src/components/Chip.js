import React from 'react';
import { Chip as MuiChip } from '@mui/material';

const Chip = props => {
    const {variant, label, className, type, onClick, onDelete, ...rest} = props;

    switch (type) {
        case 'clickable':
            return (
                <MuiChip
                    variant={variant ?? "filled"}
                    label={label}
                    className={`chip ${className ?? ""}`}
                    onClick={onClick}
                    {...rest}
                />
            )
        case 'deletable':
            return (
                <MuiChip
                    variant={variant ?? "filled"}
                    label={label}
                    className={`chip ${className ?? ""}`}
                    onDelete={onDelete}
                    {...rest}
                />
            )
        case 'standard':
        default:
            return (
                <MuiChip
                    variant={variant ?? "filled"}
                    label={label}
                    className={`chip ${className ?? ""}`}
                    {...rest}
                />
            )
    }
    
}

export default Chip;