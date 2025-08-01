import React,{useState, useEffect} from 'react'

const Documentation = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isWidthGreaterThanMD, setIsWidthGreaterThanMD] = useState(window.innerWidth>768)
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  

  useEffect(() => {
    const handleResize = () => {
      setIsWidthGreaterThanMD(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (
    <div className={`${isLoaded ? 'opacity-100 transition-all duration-1000 ease-in-out' :'opacity-0' } bg-gradient-to-tr from-[#300f46] via-black to-[#7207b5] p-10 `}>
      <h1 className='font-bold text-5xl text-center mb-5'>Portofy</h1>
      <h2 className='font-bold text-3xl text-center mb-5'>Instant Portfolio Builder</h2>
      <p className='text-lg mb-2'>
        Portofy is a responsive and user-friendly web-application designed to simplify the process of building personal portfolio. This empowers users to instantly create and deploy personalised and professional portfolio by simply filling out a form. The portfolio dynamically displays the user's profile, projects and contact details with a real-time preview feature.
      </p>
      <p className='text-lg mb-2'>
        The motivation behind this project stems from the challenges many individuals face in creating professional portfolios. Limited technical expertise, time constraints, and lack of design resources often act as barriers. Moreover, existing portfolio builders are often either overly complex or come at a cost.
      </p>
      <p className='text-lg mb-5'>
        Our solution addresses these issues by providing an intuitive, form-based platform that requires no coding knowledge. With minimal setup, users can generate a visually appealing portfolio that can be hosted online, downloaded as code or PDF, and shared via a public link. The goal is to make portfolio creation fast, accessible, and efficient for everyone.
      </p>
      <div className='flex justify-between'>
        <div>

          <h2 className='font-bold text-3xl mb-5'>Features at a Glance</h2>
          <li>Responsive design</li>
          <li>Live preview of the portfolio</li>
          <li>Select from multiple templates</li>
          <li>Form-based user input (name, skills, projects, links, etc.)</li>
          <li>Download as PDF</li>
          <li>Download as HTML/CSS zip</li>
          <li>Shareable public portfolio link</li>

          <h2 className='font-bold text-3xl my-5'>Step-by-Step Guide</h2>
          <li><span className='font-bold'>Open the web-app</span> </li>
          <li><span className='font-bold'>Log in or sign up using your email id</span> </li>
          <li><span className='font-bold'>Then click on create new and fill out the form with your details</span> </li>
          <li><span className='font-bold'>Preview updates instantly</span> </li>
          <li><span className='font-bold'>Choose a template</span> </li>
          <li><span className='font-bold'>Preview updates instantly</span> </li>
          <h2 className='font-bold text-3xl my-5'>Tech Behind the Project</h2>
          <li><span className='font-bold'>Frontend: ReactJs, TailwindCSS, GSAP, Spline</span> </li>
          <li><span className='font-bold'>Backend: Node.js, Express.js, MongoDB</span> </li>
          <li><span className='font-bold'>Version Control: Git, GitHub</span> </li>
          <li><span className='font-bold'>Hosting:</span> </li>
        </div>
        {isWidthGreaterThanMD && 
          <div className='imagesDisplay'>
            <img className='mt-20 lg:mr-48' width={350} src="Portfolio5.png" alt="Image" />
          </div>
        }
      </div>
    </div>
  )}


export default Documentation
