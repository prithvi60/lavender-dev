import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { ChevronDown, X } from 'lucide-react'

function AppointmentEdit() {
  const [date, setDate] = useState('April 14, 2024')
  const [time, setTime] = useState('8:15 pm')
  const [client, setClient] = useState('Olivia Thomson')
  const [service, setService] = useState('Manicure')
  const [total, setTotal] = useState(198)

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-[#4F46E5] text-white p-4">
        <div className="text-lg font-semibold mb-2">Thursday {date}</div>
        <div className="flex items-center">
          <Input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-transparent border-none text-white text-lg font-semibold w-20"
          />
          <ChevronDown className="ml-2" />
        </div>
        <div className="flex items-center mt-2">
          <span className="text-sm">Doesn't repeat</span>
          <ChevronDown className="ml-2" />
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <div className="relative">
            <Input
              placeholder="Change client"
              className="w-full pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {client && (
            <div className="mt-2 flex items-center bg-[#F3F4F6] rounded-md p-2">
              <span className="flex-1 text-sm">{client}</span>
              <X className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => setClient('')} />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <div className="relative">
            <Input
              placeholder="Add new service"
              className="w-full pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {service && (
            <div className="mt-2 flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
              <div>
                <div className="text-sm font-medium">{service}</div>
                <div className="text-xs text-gray-500">30 mins | Abril Lewis</div>
              </div>
              <div className="text-sm font-medium">$99</div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">${total}</span>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex-1 bg-white text-[#4F46E5] border-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
          >
            Cancelled
          </Button>
          <Button
            className="flex-1 bg-[#4F46E5] text-white hover:bg-[#4338CA]"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentEdit