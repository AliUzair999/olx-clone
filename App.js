// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

import Layout from './views/Layout'
import ErrorPage from './views/ErrorPage'
import Signup from "./views/Signup"
import Login from "./views/Login"
import Dashboard from "./views/Dashboard"
import Test from "./views/Test"
import Profile from './views/Profile';
import CreateAd from './views/CreateAd';
import AdDetail from './views/AdDetail';

import { auth, db  } from "./config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {doc, getDoc} from "firebase/firestore"





function App() {

  const [page, setPage] = useState('login')
  const [userData, setUserData] = useState("")
  let uid;
  // console.log(userData)

  useEffect(() => {
       onAuthStateChanged(auth, (user) => {
        // console.log(user?.data)
        if (user) {
          uid = user.uid;
          async function abc() {
            // console.log("abc worked")
            const usersDocRef = await doc(db, "users", uid)
            const usersDocData = await getDoc(usersDocRef)
            // console.log(usersDocData)
            // console.log(usersDocData.data())
            setUserData(usersDocData.data())
          }
          abc()
        }
        else {
          // console.log("else worked")
          setUserData(null)
        }
      })
    
  }, [])

  const protectedRoute = (component) => {
    if (userData) {
      return component
    }
    else {
      return <Navigate to="/login" replace />
      // return <Login />

    }
  }

  const unProtectedRoute = (component) => {
    if (userData) {
      return <Navigate to="/dashboard" replace />
      // return <Dashboard userData={userData}/>
    }
    else {
      return component

    }
  }


  return (

    <div className="App">
      <header className="App-header">

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="/signup" element={unProtectedRoute(<Signup />)} />
            <Route path="/login" element={unProtectedRoute(<Login />)} />
            <Route path="/dashboard" element={<Dashboard userData={userData} setUserData={setUserData} />} />
            <Route path="/dashboard/ad-detail/:adId" element={<AdDetail/>} />
            <Route path="/dashboard/create-ad" element={protectedRoute(<CreateAd userData={userData} />)} />
            <Route path="/dashboard/my-profile" element={protectedRoute(<Profile userData={userData} />)} />

            <Route path="*" element={<ErrorPage />} />

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
