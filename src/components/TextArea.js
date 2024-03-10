import React, {Fragment} from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Typography } from '@mui/material';

const TextArea = props => {
    const { label, placeholder, ...rest} = props;
    return (
        <Fragment>
            <Typography color="inherit">
                {label}
            </Typography>
            <TextareaAutosize
                className="b-text-area"
                aria-label="empty textarea"
                placeholder={placeholder}
                {...rest}
            />
        </Fragment>
    );
}

export default TextArea;


