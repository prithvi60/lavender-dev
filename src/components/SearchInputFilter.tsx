import React, { useState, useRef } from 'react';
import { Input } from './ui/input';
import GetIcon from '../assets/Icon/icon';

const ClientSearchFilter = ({ data, client, handler }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownState, setDropdownState] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const inputRef = useRef(null)

  const handleSearch = (event) => {
    const value = event.target.value;
    setDropdownState(true)
    setSearchTerm(value);
    const filtered = data.filter((item) => {
      return item.phone.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase())
    }
    );
    setFilteredData(filtered);
  };

  const handleSelect = (item) => {
    handler(item)
    setDropdownState(false)
  }

  const renderDropDownField = (item, highlight) => {
    const phoneSubStr = item.phone?.split(new RegExp(`(${highlight})`, 'gi'));
    const nameSubStr = item.name?.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <div className='cursor-pointer font-light'>
        <div className='font-medium'>
          {nameSubStr.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
              <span key={index} style={{ backgroundColor: 'lavender' }}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </div>
        <div>{item.email}</div>
        <div>
          {phoneSubStr.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
              <span key={index} style={{ backgroundColor: 'lavender' }}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-72">
      <div className='p-2 font-bold'>Client</div>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Change client"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => filteredData && setDropdownState(true)}
        endIcon={'Search'}
      />
      {dropdownState && searchTerm ? (
        <div className="z-50 absolute max-h-48 w-full mt-1 min-w-[8rem] overflow-scroll no-scrollbar rounded-md border bg-popover p-1 text-popover-foreground 
        shadow-xl">
          {(filteredData.length > 0) ? (
            filteredData.map((item, index) => (

              <div onClick={() => handleSelect(item)}
                className='w-full border-b border-gray-300 bg-background hover:bg-accent last:border-none' key={item.name}>
                {renderDropDownField(item, searchTerm)}
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>)
        :
        <></>}

      {client.name && <div className='bg-[#E6E1FF] relative rounded p-3 flex justify-between items-center mt-2'>
        <div className='flex flex-col font-light'>
          <div className='font-semibold'>{client.name}</div>
          <div>{client.email}</div>
          <div>{client.phone ? client.phone : ''}</div>
        </div>
        {client.name != 'Walk In' ? <div>
          <div className='cursor-pointer text-lg font-light' onClick={() => { handler({ name: '', email: '', phone: '' }) }}>X</div>
        </div> : <></>}
      </div>}

    </div>
  );
};

export default ClientSearchFilter;
