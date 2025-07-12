import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { LayoutTemplate,Menu,X } from 'lucide-react'
import { landingPageStyles } from '../assets/dummystyle'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import ImageSlider from '../components/Carousel'
import FloatingShapes from '../components/FloatingShapes'
import Footer from '../components/Footer'
import ModalLS from '../components/ModalLS'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { useNavigate, useNavigation } from 'react-router-dom'
import { ProfileInfoCard } from '../components/Cards'

const LandingPage = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () =>{
        if (user){
            setOpenAuthModal(true)
        }
        else{
            navigate('/dashboard')
        }
    }

  return (
    <div>
       <img className="absolute top-0 right-0 opacity-60 -z-10" src="./gradient.png" alt="Gradient-img" />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#b456ec] -rotate-[-30deg] -z-10"></div>
      <Header />
      <img className="absolute bottom-0 left-0 opacity-60 -z-10" src="./gradient.png" alt="Gradient-img" />
     
     <div className="h-0 w-[40rem] absolute bottom-[20%] left-[-5%] shadow-[0_0_900px_20px_#b456ec] -rotate-[-30deg] -z-10"></div>
     <div className='md:flex md:flex-col md:gap-5 '>
       <Hero/>
      
      <About/>
     </div>
     
      <ImageSlider/>
      <FloatingShapes/>
      <Footer/>

     
    </div>
  )
}

export default LandingPage
