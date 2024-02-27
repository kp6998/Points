import React, {useEffect} from 'react';
import '../styles/Profile.css'

const Profile = () => {
  useEffect(() => {
    console.log(sessionStorage.getItem('UserName'));
    if(sessionStorage.getItem('UserName') == null) {window.location.href = '/';}
  })
  return (
    <div className='clsProfile'>
      <div className='clsHead'>
        <h2 className='clsUsername'>Username</h2>
      </div>
      <div className='clsBody'>
        <h3 className='clsFullName'>fullName</h3>
        <h3 className='clsFatherName'>fatherName</h3>
        <h3 className='clsDob'>dob</h3>
        <h3 className='clsAddress'>address</h3>
        <div className='clsPoints'>
          <h3 className='clsPointsUp'><span>0</span>&#129033;</h3>
          <h3 className='clsPointsDown'><span>0</span>&#129035;</h3>
        </div>
      </div>
    </div>
  );
};
export default Profile;
