import { useRef, useState } from "react";
import { CustomTooltip } from "../../../../components/CustomTooltip";
import { useDrawer } from "../../BusinessDrawerContext";
import { addTime, areDatesSame, getFormattedTimeRange } from "../utils";
import { HOUR_HEIGHT, HOUR_MARGIN_TOP, AppointmentHover } from "./CalenderComponents";

export const Appointment = ({data, elementRef, onDragStart, onDragEnd, onDrag, disabled = false, count, index, disableHoverOnDrag}) => {

    const {howLong, client, service, statusColor, start, end } = data
    const date = new Date(data.date)
    const fromTop = (date.getHours() * HOUR_HEIGHT) + HOUR_MARGIN_TOP + (date.getMinutes() * 2)
    const width = 99/count
    const left = ((width ) * index)
    const { openDrawer } = useDrawer()

    const [height, setHeight] = useState(howLong * 2);

    const resizableRef = useRef(null);

    const startResizing = (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', resizeDiv);
      document.addEventListener('mouseup', stopResizing);
    };

    const resizeDiv = (e) => {
      const resizableRect = resizableRef.current.getBoundingClientRect()
      const parentRect = resizableRef.current.parentElement.getBoundingClientRect()
      let newHeight = Math.round(e.clientY - resizableRect.top);

      if((resizableRect.top + newHeight) > parentRect.bottom){
        newHeight = parentRect.bottom - resizableRect.top
      }
      if(newHeight >= 60) {
        const formattedHeight = Math.round(newHeight/30) * 30
        setHeight(formattedHeight);
      }
    };

    const stopResizing = () => {
      document.removeEventListener('mousemove', resizeDiv);
      document.removeEventListener('mouseup', stopResizing);
    };

    return <>{ areDatesSame(start, addTime(end, 'minutes', -1)) ? 
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
          left: `${left}%`,
        }}
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
                cursor: disabled ? 'pointer' : 'grab'
              }}
              className='truncate'
              onClick={() => openDrawer("AppointmentDetails", data)}
            >
              <div>
                {getFormattedTimeRange(date, howLong)} | {service}
              </div>
    
              <div className='font-bold'>{client}</div>
              <div className='font-bold'>{date.getDate()}</div>
              <div className="font-bold">{height/HOUR_HEIGHT}</div>
    
            </div>
          </CustomTooltip>
          {!disabled && <div onMouseDown={startResizing} id="resizer" className='w-full h-3 absolute bottom-0 cursor-ns-resize'></div>}
      </div> : <></>}
    </>
    };