import { useRef, useState } from "react";
import { CustomTooltip } from "../../../../components/CustomTooltip";
import { useDrawer } from "../../BusinessDrawerContext";
import { getFormattedTimeRange } from "../utils";
import { HOUR_HEIGHT, HOUR_MARGIN_TOP, AppointmentHover } from "./CalenderComponents";

export const Appointment = ({data, elementRef, onDragStart, onDragEnd, onDrag, disabled = false, count, index, disableHoverOnDrag}) => {

    const {howLong, client, service, statusColor } = data
    const date = new Date(data.date)
    const fromTop = (date.getHours() * HOUR_HEIGHT) + HOUR_MARGIN_TOP + (date.getMinutes() * 2)
    const width = 99/count
    const left = ((width ) * index)
    const { openDrawer } = useDrawer()
    // const nodeRect = elementRef.current.getBoundingClientRect();


    const [height, setHeight] = useState(howLong * 2);

    const resizableRef = useRef(null);

    const startResizing = (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', resizeDiv);
      document.addEventListener('mouseup', stopResizing);
    };

    const resizeDiv = (e) => {
      const newHeight = Math.round(e.clientY - resizableRef.current.getBoundingClientRect().top);
      if (newHeight > 60) { // Minimum height to avoid collapsing
        setHeight(newHeight);
      }
    };

    const stopResizing = () => {
      document.removeEventListener('mousemove', resizeDiv);
      document.removeEventListener('mouseup', stopResizing);
    };

    return (      
    <div
      ref={resizableRef}
      // ref={elementRef}
      // draggable={!disabled}
      // onDragStart={onDragStart}
      // onDragEnd={onDragEnd}
      // onDrag={onDrag}
      
      style={{
        position: 'absolute',
        top: `${fromTop}px`,
        background: statusColor,
        height: `${height}px`,
        color: (statusColor === '#E6E1FF') ? 'black' : 'white',
        //minWidth: '20%',
        width: `${width}%`,
        marginRight: '3px',
        marginLeft: '1px',
        padding: '5px',
        borderRadius: '12px',
        borderWidth: '1px',
        borderColor: 'white',
        left: `${left}%`
      }}
      onClick={() => openDrawer("AppointmentDetails", data)}
      >
        <CustomTooltip 
          disableHoverListener={disabled} maxW={'384px'} 
          arrowColor='#C9C5FF'
          arrow={!disableHoverOnDrag}
          title={!disableHoverOnDrag ? <AppointmentHover appointment={data}/> : <></>}
        >
          <div 
            ref={elementRef}
            draggable={!disabled}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrag={onDrag}
            style={{
              height: '95%',
              cursor: disabled ? 'default' : 'grab'
            }}
            className='truncate'
          >
            <div>
              {getFormattedTimeRange(date, howLong)} | {service}
            </div>
  
            <div className='font-bold'>{client}</div>
            <div className='font-bold'>{date.getDate()}</div>
            <div className="font-bold">{height/HOUR_HEIGHT}</div>
  
          </div>
        </CustomTooltip>
        <div onMouseDown={startResizing} id="resizer" className='w-full h-3 absolute bottom-0 cursor-ns-resize'></div>
    </div>
    )
    };