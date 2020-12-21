import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isUndefined, isEmpty, get } from 'lodash';
import { api } from '../helpers/api';
import EmailEditForm from './EmailEditForm';
import UserCardField from './UserCardField';


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
        <UserCardField title={"First Name"} info={userData.firstName} />
        <UserCardField title={"Last Name"} info={userData.lastName} />
        <UserCardField title={"Email"} info={userData.email} />
        <UserCardField title={"Company"} info={userData.company} />
        <UserCardField title={"Title"} info={userData.title} />
        <UserCardField title={"Address"} info={userData.street + ', ' + userData.city + ', ' + userData.state + ' ' + userData.zipCode} />
      </div>
      <div className ="edit-email">
        <button type='button' className="edit-email-button" onClick={onEditButtonClick}>{editButtonText}</button>
        { isEditingEmail && <EmailEditForm id={id} setUserData={setUserData} />}
      </div>
    </>
  );
}
