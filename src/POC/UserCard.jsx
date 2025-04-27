import React from 'react'
import { Link, useParams } from 'react-router-dom';

function UserCard(props) {
    const{userObj}=props;
    const params=useParams();
    const isActive=params?.uniqueId===userObj.id;
  return (
    <div key={userObj.id}>
      <Link className="flex gap-4 items-center hover:bg-[#eff2f5] p-2 rounded cursor-pointer " to={`/${userObj.id}`}>
          
          <img src={userObj.userData.profile_pic} referrerPolicy="no-referrer" alt="Profile" className="rounded-full object-cover h-12 w-12"/>

        <h2>{userObj.userData.name}</h2>
        </Link>
    </div>
  )
}

export default UserCard;