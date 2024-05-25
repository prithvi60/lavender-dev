import DayTimeline from './DayTimeline';

const Timeline = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const events=[
    { start: 0, end: 2, name: 'Event 1' }]
  
    const calculateHeight = (start, end) => {
      const height = end - start
      const heightInPixel = height 
    }
  return (
    <div className="flex flex-col items-center w-full">
      {hours.map((hour) => (
        <div key={hour} className="flex items-center w-full h-32 ">
          <div className='urbanist-font h-full pr-1 w-1/12 text-sm bg bg-zinc-100 border-gray-500 text-right border-r border-b'>
            <div className="">{`${hour}:00`}</div>
            <div>pm</div>
          </div>
          <div className="w-11/12  bg-red-500">
            <DayTimeline events={events} hour={hour}/>
          </div>
        </div>
      ))}
    </div>
    
  );
};


function CalenderTimeline() {
  return (
    <Timeline/>
    // <ReactCalendertimeline/>
  )
}

export default CalenderTimeline