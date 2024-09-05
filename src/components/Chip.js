import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import GetIcon from '../assets/Icon/icon';

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
                    deleteIcon={<GetIcon iconName="CloseIcon"/>}
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