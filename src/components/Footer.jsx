// import { Facebook, Instagram, Mail, PawPrint, Twitter } from "lucide-react";

// import React from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'

// const Footer = () => {
//   return (
//     <div className='md:mx-10'>
//       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

//         <div>
//         <PawPrint size={28} className="text-pet-blue" />
//         <span className="text-xl font-bold">Pet<span className="text-pet-blue">Well</span></span>   
//           <p className='w-full md:w-2/3 text-gray-600 leading-6'>Your trusted partner in pet healthcare, providing compassionate care by Dr. Ahmad Hassan and team since 2005.</p>
//         </div>

//         <div>
//           <p className='text-xl font-medium mb-5'>COMPANY</p>
//           <ul className='flex flex-col gap-2 text-gray-600'>
//             <NavLink to='/'><li className='cursor-pointer hover:text-black'>Home</li></NavLink>
//             <NavLink to='/barber'><li className='cursor-pointer hover:text-black'>My Shopes</li></NavLink>
//             <NavLink to='/about'><li className='cursor-pointer hover:text-black'>About</li></NavLink>
//             <NavLink to='/contact'><li className='cursor-pointer hover:text-black'>Contact</li></NavLink>
//           </ul>
//         </div>

//         <div>
//           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//           <ul className='flex flex-col gap-2 text-gray-600'>
//             <li>03164356746</li>
//             <li> myousaf5431@gmail.com</li>
//           </ul>
//         </div>

//       </div>

//       <div>
//         <hr />
//         <p className='py-5 text-sm text-center'>Copyright 2024 @ Voguevibe.com - All Right Reserved.</p>
//       </div>

//     </div>
//   )
// }

// export default Footer



import { Facebook, Instagram, Mail, PawPrint, Twitter } from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pet-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <PawPrint size={28} className="text-pet-blue" />
              <span className="text-xl font-bold">Pet<span className="text-pet-blue">Well</span></span>
            </Link>
            <p className="text-gray-300 mb-4">
              Your trusted partner in pet healthcare, providing compassionate care by Pet well and team since 2005.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-pet-blue p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-pet-blue p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-pet-blue p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-pet-blue transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/find-vet" className="text-gray-300 hover:text-pet-blue transition-colors">Find a Vet</Link>
              </li>
              <li>
                <Link to="/lost-found" className="text-gray-300 hover:text-pet-blue transition-colors">Lost & Found</Link>
              </li>
              <li>
                <Link to="/meal-plans" className="text-gray-300 hover:text-pet-blue transition-colors">Meal Plans</Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-pet-blue transition-colors">Community</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-4">Have questions about your pet's health? Reach out to our expert veterinarian.</p>
            {/* <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-pet-blue hover:bg-pet-blue/90">
                <Mail size={18} />
              </Button>
            </div> */}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PetWell Veterinary Clinic. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

