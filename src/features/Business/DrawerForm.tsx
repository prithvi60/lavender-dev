import { useState } from 'react';
import { Selector } from './Appointments/AppointmentControllers';

const DrawerForm = ({ formElements }) => {
  const initialState = formElements.reduce((acc, element) => {
    acc[element.name] = element.type === 'checkbox' ? false : '';
    return acc;
  }, {});

  const [formState, setFormState] = useState(initialState);

  const handleChange = (name, value) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setFormState(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formElements.map((element, index) => {
        switch (element.type) {
          case 'textfield':
            return (
              <div key={index}>
                <label className="block text-gray-700">{element.label}</label>
                <input
                  type="text"
                  name={element.name}
                  value={formState[element.name]}
                  onChange={(e) => handleChange(element.name, e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            );
          case 'dropdown':
            return (
              <div key={index}>
                <label className="block text-gray-700">{element.label}</label>
                <Selector
                  label={element.name}
                  placeholder={"test"}
                  options={element.options}
                  // value={formState[element.name]}
                  onSelect={(e) => handleChange(element.name, e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  {/* {element.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))} */}
                </Selector>
              </div>
            );
          case 'checkbox':
            return (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  name={element.name}
                  checked={formState[element.name]}
                  onChange={(e) => handleChange(element.name, e.target.checked)}
                  className="mr-2"
                />
                <label className="text-gray-700">{element.label}</label>
              </div>
            );
          default:
            return null;
        }
      })}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default DrawerForm;
