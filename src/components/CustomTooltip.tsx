import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

type customTooltipProps = TooltipProps & {
    maxW: string,
    arrowColor: string
}

export const CustomTooltip = 
    styled(({ className, ...props }: customTooltipProps) => (
    <Tooltip
    placement="right"
    TransitionComponent={Zoom} arrow
    {...props} classes={{ popper: className }} />))
    (({ theme, maxW, arrowColor }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            maxWidth: maxW,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
            padding: 0,
            borderRadius: '12px'
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: arrowColor
        },
    }));