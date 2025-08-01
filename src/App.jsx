import React from "react";
import UserProvider from "./context/UserContext";
import { Routes,Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import EditResume from "./components/EditResume";
import Documentation from "./components/Documentation";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function App() {
useEffect(() => {
  window.scrollTo(0,0)
}, [])

  return (
    <main className="md:">
      
       <UserProvider>
       <Routes>
        <Route path='/' element= { <LandingPage/>} />
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/resume/:resumeId' element={<EditResume/>}    />
        <Route path="/documentation" element={<Documentation/>} />
       </Routes>
       </UserProvider>
      
      <Toaster toastOptions={{
        className:"",
        style: {
          fontSize: "13px"
        }
      }}></Toaster>
     
    </main>
  )
}
