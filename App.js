// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useState } from 'react';

import Layout from './views/Layout'
import ErrorPage from './views/ErrorPage'
import Signup from "./views/Signup"
import Login from "./views/Login"
import Dashboard from "./views/Dashboard"
import Test from "./views/Test"
import Profile from './views/Profile';
import CreateAd from './views/CreateAd';



function App() {

  const [page, setPage] = useState('login')
  const [userData, setUserData] = useState("")
  // console.log(userData)


  return (

    <div className="App">
      <header className="App-header">

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/dashboard" element={<Dashboard userData={userData} setUserData={setUserData}/>}/>
            <Route path="/dashboard/create-ad" element={<CreateAd userData={userData} setUserData={setUserData}/>}/>
            <Route path="/dashboard/my-profile" element={<Profile userData={userData} setUserData={setUserData}/>}/>

            <Route path="*"  element={<ErrorPage />}/>

          </Route>

        </Routes>




        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. amd 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

      </header>
    </div>
  );
}

export default App;
