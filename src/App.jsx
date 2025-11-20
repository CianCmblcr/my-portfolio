import Header from "./Header";
import AnimatedSection from "./components/AnimatedSection";
import Navbar from "./components/Navbar";
import myPicture from './assets/profile pic me.jpg';
import SpotifyProject from "./assets/spotify-cover.png";
import GlowNestProject from "./assets/glownest-cover.png";
import LifeLaneProject from "./assets/lifelane-cover.png";
import { Link } from "react-router-dom";



function  App () {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16171B] via-[#2C2F35] to-[#3A3F46] text-gray-50 flex flex-col">

      <Navbar />

      {/* Home Section */}
       <section id="home" className="min h-screen py-32  flex items-center justify-center flex-col">
  <div className="px-[16px] w-full text-center flex flex-col">
    <h1 className="text-6xl md:text-8xl lg:text-9xl custom-satoshi fade-in-up-animation">Cian Combalicer</h1>
    <h2 className="text-xl md:text-4xl custom-satoshi fade-in-up-animation mb-4">UX/UI Designer | Front End Developer</h2>
    <p className="text-sm md:text-lg custom-satoshi font-light fade-in-up-animation mb-4">Figma • Photoshop • Illustrator</p>
    <p className="text-sm md:text-lg custom-satoshi font-light fade-in-up-animation">HTML/CSS • Javascript • React</p>
    <br />
    <div>
      <a href="#projects" className="mt-8 text-lg custom-satoshi font-light px-6 py-3 bg-white text-black rounded-3xl hover:bg-gray-300 transition fade-in-up-animation">
      View My Work
      </a>
    </div>
  </div>    
</section>

      {/* About Section */}
      <section id="about" className="h-screen flex items-center justify-center py-32">
  <AnimatedSection animationClass="fade-in-up-animation">
    <div className="flex flex-col md:flex-row items-center justify-center h-full px-4 md:px-16 space-y-8 md:space-y-0 md:space-x-16 max-w-7xl">
      <div className="flex-1 flex items-center justify-center h-64 md:h-full">
        <img
          src={myPicture}
          alt="Cian Combalicer"
          className="w-full h-full object-cover shadow-lg"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
        <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto md:mx-0">
          Hello! My name is Cian Combalicer, and I'm a passionate UX/UI Designer and Front-End Developer based in Metro Manila, Philippines. I specialize in creating intuitive and visually appealing digital experiences. My work is a blend of creative design, leveraging tools like Figma, Photoshop, and Illustrator, and technical development using HTML, CSS, JavaScript, and React. I love bringing ideas to life, from the initial concept to a fully functional and polished product. Let's build something great together!
        </p>
      </div>
    </div>
  </AnimatedSection>
</section>

      {/* Projects Section */}
<section id="projects" className="py-32">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-white mb-12">Projects</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Project Card 1 */}
      <div className="bg-[#2C2F35] rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 fade-in-up-animation">
  <img src={SpotifyProject} alt="Spotify Project" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-2xl font-bold text-white mb-2">Spotify Desktop Reimagined</h3>
    <p className="text-sm text-gray-400 mb-4">
      A modern redesign of Spotify’s desktop app focused on clarity, spacing, and usability.
    </p>
    <Link to="/projects/spotify">View Project</Link>
  </div>
</div>
      
      {/* Project Card 2 */}
      <div className="bg-[#2C2F35] rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 fade-in-up-animation">
  <img src={GlowNestProject} alt="GlowNest Project" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-2xl font-bold text-white mb-2">GlowNest Interior Website</h3>
    <p className="text-sm text-gray-400 mb-4">
      A warm, minimalist interior design landing page built with strong branding and visuals.
    </p>
    <Link to="/projects/glownest">View Project</Link>
  </div>
</div>
      
      {/* Project Card 3 */}
      <div className="bg-[#2C2F35] rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 fade-in-up-animation">
  <img src={LifeLaneProject} alt="Project 3" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-2xl font-bold text-white mb-2">LifeLane</h3>
    <p className="text-sm text-gray-400 mb-4">
      Ambulance booking app designed to streamline emergency medical services.
    </p>
     <Link to="/projects/lifelane">View Project</Link>
  </div>
</div>
    </div>
  </div>
</section>

     {/* Contact Section */}
<section
  id="contact"
  className="h-screen flex flex-col items-center justify-center py-40"
>
  <h1 className="text-4xl font-bold text-white custom-satoshi mb-10">
    Let’s Connect
  </h1>

  {/* Social Links */}
  <div className="flex space-x-10 text-white text-6xl">
    <a
      href="https://linkedin.com/in/ciancmblcr"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-400 transition"
    >
      <i className="fa-brands fa-linkedin"></i>
    </a>

    <a
      href="https://twitter.com/cian_cmblcr"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-black transition"
    >
      <i className="fa-brands fa-x-twitter"></i>
    </a>

    <a
      href="https://behance.net/cianjacob"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-300 transition"
    >
      <i className="fa-brands fa-behance"></i>
    </a>

    <a
      href="mailto:jacob.cian443@gmail.com"
      className="hover:text-red-400 transition"
    >
      <i className="fa-solid fa-envelope"></i>
    </a>
  </div>

  <p className="text-gray-400 mt-10 custom-satoshi text-center px-6">
    Open for freelance work, collaborations, or just say hello.
  </p>
</section>


      <footer className="bg-[#3A3F46] text-white py-8 text-center custom-satoshi border-t border-gray-700">
        <div className="container mx-auto">
          <p>&copy; 2025 Cian Combalicer. All rights reserved.</p>
          <p className="mt-2">Design by Cian Combalicer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;