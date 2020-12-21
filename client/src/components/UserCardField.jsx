import React from 'react';

export default function UserCardField(props) {
  const { title, info } = props;
  return (
    <div className='user-card-field'>
      <span className='user-card-field-title'>{title}:</span>
      <span className='user-card-field-info'>
        {info}
      </span>
    </div>
  );
}
