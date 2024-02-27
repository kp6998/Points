import React, { useState } from 'react';
import { Link } from "react-router-dom";

const RegistrationForm = ({ onRegister }) => {
  var userName;
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  function generateUsername(fullName, fatherName, birthDate) {
    const cleanFullName = fullName.replace(/\s+/g, '');
    const cleanFatherName = fatherName.replace(/\s+/g, '');
    const cleanBirthDate = birthDate.split('-').join('');
    userName = cleanFullName.toUpperCase() + cleanFatherName.toUpperCase() + cleanBirthDate;
  }
  const handleRegister = () => {
    generateUsername(fullName, fatherName, birthDate);
    onRegister(userName.toUpperCase(), fullName, fatherName, birthDate);
  };

  return (
    <form>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Father Name"
        value={fatherName}
        onChange={(e) => setFatherName(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Birth Date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <button onClick={handleRegister}>Register</button>
      <div className='clsLink'>
        <a>Already have account? </a>
        <Link to="/">Login</Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
