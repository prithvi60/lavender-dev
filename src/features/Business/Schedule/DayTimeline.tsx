import React from 'react'

function DayTimeline({events, hour}) {
  return (
    <div>
      {events.filter(event => event.start <= hour && event.end > hour).map((event, index) => (
              <div key={index} className="p-1 bg-blue-500 text-white rounded ">
                {event.name}
              </div>
            ))}
    </div>
  )
}


const events = [
  { id: 1, startHour: 7, endHour: 12, title: 'Event 1' },
  { id: 2, startHour: 13, endHour: 14, title: 'Event 2' },
  { id: 3, startHour: 15, endHour: 17, title: 'Event 3' },
];

const CalendarTimeline = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-screen w-1/6 bg-gray-200">
        {events.map(event => (
          <div
            key={event.id}
            className="absolute w-full border-spacing-1 bg-blue-500 rounded-lg text-white py-1 px-2"
            style={{
              top: `${(event.startHour) * 4.166666666666667}%`, // Assuming each hour is 10% width
              height: `${(event.endHour - event.startHour) * 4.166666666666667}%`, // Assuming each hour is 10% width
            }}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayTimeline