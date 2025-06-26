import { FaGithub, FaLinkedin } from "react-icons/fa";
import pic from '../assets/pic.jpg'

 const students = [
  {
    name: "Vaatsalya Sahu",
    branch: "Chemical Engineering",
    college: "Indian Institute of Technology Indore",
    github: "https://github.com/Svaatsalya",
    linkedin: "https://www.linkedin.com/in/vaatsalya-sahu-28274031b/",
    profile: pic,
  },

   {
    name: "Utkarsh Sharma",
    branch: "Chemical Engineering",
    college: "Indian Institute of Technology Indore",
    github: "https://github.com/utkarsh-shrma",
    linkedin: "https://www.linkedin.com/in/utkarsh-shrma-s20/",
    profile: pic,
  },

   {
    name: "Chetan Verma",
    branch: "Computer Science and Engineering",
    college: "Indian Institute of Technology Indore",
    github: "https://github.com/codecv28",
    linkedin: "https://www.linkedin.com/in/chetan-verma-a82239324/",
    profile: pic,
  },

   {
    name: "Vinod Dhoke",
    branch: "Computer Science and Engineering",
    college: "Indian Institute of Technology Indore",
    github: "https://github.com/vinod765",
    linkedin: "https://www.linkedin.com/in/vinod-dhoke-128195329/",
    profile: pic,
  },
 ];

export default function AboutUs() {
  return (

    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 px-4" id="about-us" >
      <div className="max-w-7xl mx-auto text-centre mb-12">
        <h1 className="text-5xl md:text-7xl font-mono uppercase tracking-wide font-black text-center">
          About Us
        </h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

          {students.map((student, index) => (

          <div key={index} 
                 className="bg-gray-800 bg-opacity-80 border border-gray-600 rounded-2xl p-6 text-center shadow-lg 
                              hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:border-purple-400 backdrop-blur-sm hover:bg-gray-900 hover:scale-105 hover:-translate-y-2 group cursor-pointer" >
            
                 <img src={student.profile} alt={student.name} 
                       className="w-24 h-24 rounded-full mx-auto border-2 border-gray-500 group-hover:border-purple-400 transition-all duration-300 mb-4 object-cover group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-400/50" /> 
                  
                  <h2 className="text-white font-black text-xl mb-3 tracking-wide font-sans uppercase 
                        group-hover:text-purple-300 transition-colors duration-300"> {student.name} </h2>
                    
                     <p className="text-purple-400 text-base mb-2 font-medium tracking-wide 
                           group-hover:text-purple-300 transition-colors duration-300">{student.branch}</p>
                       
                        <p className="text-white text-sm mb-6 font-light leading-relaxed 
                             group-hover:text-gray-300 transition-colors duration-300">{student.college}</p>

                 <div className="flex justify-center gap-8 text-gray-400 text-2xl group-hover:text-p -400 transition-all duration-300">
                <a href={student.github} target="_blank" rel="noopener noreferrer"   className="hover:text-purple-300 hover:scale-125 transition-all duration-200 hover:drop-shadow-lg">
                 
                  <FaGithub/>

                </a>
                <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 hover:scale-125 transition-all duration-200 hover:drop-shadow-lg">
                 
                  <FaLinkedin/>

                  </a>
               </div>
          </div>

        ))}

       </div>  
       </section>
    
  );
} 