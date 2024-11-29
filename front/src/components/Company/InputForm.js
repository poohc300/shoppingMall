import React from 'react';

const InputForm = (onSendData = (f) => f) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleClick = () => {
    const formData = {
      name: name,
      address: address,
      contactInfo: contactInfo,
    };
    onSendData(formData);
  };

  return (
    <div className='customer-input-form'>
      <div className='name'>
        제조사 명:
        <input
          type='text'
          value={name}
          onClick={(e) => setName(e.target.value)}
        />
      </div>
      <div className='name'>
        제조사 주소:
        <input
          type='text'
          value={address}
          onClick={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className='name'>
        제조사 연락처 정보:
        <input
          type='text'
          value={contactInfo}
          onClick={(e) => setContactInfo(e.target.value)}
        />
      </div>
      <div className='button'>
        <button type='button' onClick={handleClick}>
          등록 / 수정
        </button>
      </div>
    </div>
  );
};
export default InputForm;
