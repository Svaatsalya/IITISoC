import React from "react";
import UserProvider from "./context/UserContext";
import { Routes,Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import EditResume from "./components/EditResume";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <main className="md:">
      
<<<<<<< HEAD
       <UserProvider>
       <Routes>
        <Route path='/' element= { <LandingPage/>} />
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/resume/:resumeId' element={<EditResume/>}    />
       </Routes>
       </UserProvider>
=======
      <img className="absolute top-0 right-0 opacity-60 -z-10" src="./gradient.png" alt="Gradient-img" />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[0%] shadow-[0_0_900px_20px_#b456ec] -rotate-[-30deg] -z-10"></div>
      <Header />
>>>>>>> 08aa42633e37b823faf2667e5941d9dca0e88f86
      
      <Toaster toastOptions={{
        className:"",
        style: {
          fontSize: "13px"
        }
      }}></Toaster>
     
    </main>
  )
}
