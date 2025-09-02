import Header from "./Header";
import AnimatedSection from "./components/AnimatedSection";
import Navbar from "./components/Navbar";
import myPicture from './assets/profile pic me.jpg';

function  App () {
  return (
    <div className="min-h-screen bg-[#2F4F4F] text-gray-50">
      <Navbar />

      {/* Home Section */}
       <section id="home" className="h-screen bg-[#171717] flex items-center justify-center flex-col">
        <div className="px-[16px] w-full text-center">
          <h1 className="text-[15rem] custom-satoshi fade-in-up-animation">Cian Combalicer</h1>
          <h2 className="text-4xl custom-satoshi fade-in-up-animation mb-4">UX/UI Designer | Front End Developer</h2>
          <p className="text-l custom-satoshi font-light fade-in-up-animation mb-4">Figma•Photoshop•Illustrator</p>
          <p className="text-l custom-satoshi font-light fade-in-up-animation">HTML/CSS•Javascript•React</p>
        </div>    
      </section>

      {/* About Section */}
      <section id="about" className="h-screen bg-[#171717] flex items-center justify-center">
        <AnimatedSection animationClass="fade-in-up-animation">
          <h1 className="text-4xl font-bold">About Me</h1>
          <img src="myPicture" alt="myPicture"
           />
        </AnimatedSection> 
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen bg-[#171717] flex items-center justify-center">
        <AnimatedSection animationClass="fade-in-up-animation">
            <div className="bg-[#2C2C2E] rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
            <img src="project-image-1.jpg" alt="Project 1" className="w-full h-48 object-cover"/>
            <div className="p-6">
            <h3 className="text-2xl font-satoshi font-bold text-white mb-2">Project Title 1</h3>
            <p className="text-sm text-gray-400">A brief description of the project.</p>
            <a href="#" className="mt-4 inline-block text-blue-400 hover:underline">View Project</a>
            </div>
            </div>
        </AnimatedSection>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen bg-[#171717] flex items-center justify-center">
         <div className="glassmorphic-card p-8 rounded-3xl shadow-lg w-full max-w-lg mx-4 sm:mx-auto border border-white border-opacity-30">
          <h1 className="text-4xl font-bold text-center custom-satoshi text-white m-4">
            Contact Me
          </h1>
          <form className="space-y-6">
            <div>
              <input type="text"
              id="name"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg glassmorphic-card text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-20 transition-all duration-300 ease-in-out"
              />
            </div>
            <div>
              <input type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg glassmorphic-card text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-20 transition-all duration-300 ease-in-out"
              />
            </div>
            <div>
              <textarea 
                id="message" 
                rows="4" 
                placeholder="Your message here..." 
                className="w-full p-3 rounded-lg glassmorphic-card text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-20 transition-all duration-300 ease-in-out"
              ></textarea>
            </div>
          </form>
          {/* Add your contact form elements here, they will now be fully visible */}
        </div>
      </section>

      <footer className="bg-[#171717] text-white py-8 text-center custom-satoshi border-t border-gray-700">
        <div className="container mx-auto">
          <p>&copy; 2025 Cian Combalicer. All rights reserved.</p>
          <p className="mt-2">Design by Cian Combalicer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;