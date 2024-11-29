import React, { useState } from 'react';
import InputForm from './InputForm';

const CreateCompany = () => {
  const [data, setData] = useState({});

  const handleData = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className='createCompany'>
        <InputForm onSendData={handleData} />
      </div>
    </div>
  );
};
export default CreateCompany;
