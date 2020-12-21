import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { api } from '../helpers/api';

function EmailEditForm(props) {
  const { id, setUserData } = props;
  const [textValue, setTextValue] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const onUpdateEmail = async () => {
    try {
      const res = await api.updateUserEmail(id, textValue);
      const userData = get(res, 'data');
      if (setUserData) {
        setUserData(userData)
      }
      setError('');
      setIsSuccess(true);
    } catch (error) {
      setError(error);
      setIsSuccess(false);
    }
  };

  return (
      <div className='edit-email'>
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button type='button' onClick={onUpdateEmail}>
          Submit{' '}
        </button>
        {!isEmpty(error) && <div>{error}</div>}
        {isSuccess && <div>Update Success</div>}
      </div>
  );
}

export default EmailEditForm;
