import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isUndefined, isEmpty, get } from 'lodash';
import { api } from '../helpers/api';
import EmailEditForm from './EmailEditForm';

export default function UserCards() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit Email');

  const onEditButtonClick = () => {
    setIsEditingEmail(!isEditingEmail);

    if(!isEditingEmail) {
      setEditButtonText('Close');
    } else {
      setEditButtonText('Edit Email')
    }
  }

  useEffect(() => {
    const request = async () => {
      try {
        const response = await api.users(id);
        const data = get(response, 'data');
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!isUndefined(id) && !isEmpty(id)) {
      request();
    }
  }, []);

  return (
    <>
      <div className='user-card'>
        <div>First Name: {userData.firstName}</div>
        <div>Last Name: {userData.lastName}</div>
        <div>Email: {userData.email}</div>
        <div>Company: {userData.company}</div>
        <div>Title: {userData.title}</div>
        <div>
          Address: {userData.street} {userData.city} {userData.state},{' '}
          {userData.zipCode}
        </div>
      </div>
      <div className ="edit-email">
        <button type='button' onClick={onEditButtonClick}>{editButtonText}</button>
        { isEditingEmail && <EmailEditForm id={id} setUserData={setUserData} />}
      </div>
    </>
  );
}
