import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { api } from '../helpers/api';

function EmailEditForm(props) {
  const { id, setUserData } = props;
  const [textValue, setTextValue] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const onUpdateEmail = async (e) => {
    e.preventDefault();
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
    <>
      <form className='edit-email-field' onSubmit={onUpdateEmail}>
        <label className="edit-email-field-label" htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          className="edit-email-field-input"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button className="edit-email-field-button" type='submit'>
          Submit
        </button>
      </form>
      {!isEmpty(error) && <div className="form-message error-message">{error.name}: {error.message}</div>}
      {isSuccess && <div className="form-message success-message">Updated</div>}
    </>
  );
}

export default EmailEditForm;
