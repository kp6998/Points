import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import LoginForm from "./components/LoginForm";
import RegistrationForm from './components/RegistrationForm';
import Profile from './components/Profile';
import FindUser from './components/FindUser';
import OtherProfile from './components/OtherProfile';

import './styles/styles.css'
function App() {
  var contract, accounts;
  const [address, setAddress] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const artifact = require("./contracts/Points.json");
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        setAddress(artifact.networks[networkID].address);
        contract = new web3.eth.Contract(abi, address);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  });
  
  const handleLogin = async (userName) => {
    try {
      const result = await contract.methods.Login(userName).call({
        from: accounts[0],
      });
      if (result) {
        sessionStorage.setItem('UserName', userName);
        alert('Logined successfully');
        window.location.href = '#/Profile';
      } else {
        alert('Username or address not matched, Please register!');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async (userName, fullName, fatherName, birthDate) => {
    try {
      console.log(userName);
      const result = await contract.methods.RegUserDetails(
        userName,
        fullName,
        fatherName,
        birthDate
      ).send({
        from: accounts[0],
      });
      if (result.status) {
        alert('Registered successfully! Your username is ' + userName);
      } else {
        alert('User details already registered, please try login');
      }
    } catch (error) {
      if(error.code == -32603) alert('User details already registered, please try login');
      console.error("Error:", error);
    }
  };

  return (
    <HashRouter>
      <Routes>
        <Route index element={<LoginForm onLogin={handleLogin} />} />
        <Route path='RegistrationForm' element={<RegistrationForm onRegister={handleRegister} />} />
        <Route path='Profile' element={<Profile />} />
        <Route path='FindUser' element={<FindUser />} />
        <Route path='OtherProfile' element={<OtherProfile />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
