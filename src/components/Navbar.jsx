import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { PawPrint } from "lucide-react";
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isElevenAM, setIsElevenAM] = useState(false);
  const { backendUrl, userData, setUserData } = useContext(AppContext);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
    }

    const now = new Date();
    const hours = now.getHours();
    setIsElevenAM(hours >= 11 && hours < 12);
  }, [location, token]);

  const logout = (e) => {
    if (e) e.preventDefault();
    
    localStorage.removeItem('token');
    localStorage.removeItem('dToken');
    localStorage.removeItem('aToken');
    sessionStorage.clear();
    
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    
    setToken('');
    setUserData({});
    setShowMenu(false);
    
    navigate(isElevenAM ? '/register' : '/login');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      {/* Logo Section */}
      <div 
        className="flex items-center space-x-2 ml-4 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <PawPrint size={32} className="text-pet-blue animate-paw-bounce" />
        <span className="text-xl md:text-2xl font-bold text-pet-dark">
          Pet<span className="text-pet-blue">Well</span>
        </span>
      </div>
      
      {/* Desktop Navigation */}
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
        </NavLink>
        <NavLink to='/barber' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-1'>Find a vet</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
        </NavLink>
        <NavLink to='/Lostandfound' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-1'>Lost & Found</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
        </NavLink>
        <NavLink to='/about' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-1'>Meal</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
        </NavLink>
        <NavLink to='/community' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-1'>Community</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
        </NavLink>
        <NavLink to='/Precautions' className={({isActive}) => isActive ? 'text-primary' : ''}>
          <li className='py-1'>Precautions</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-4 '>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img 
              className='w-8 h-8 rounded-full object-cover' 
              src={userData?.image || assets.profile_pic} 
              alt="Profile" 
            />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate(isElevenAM ? '/register' : '/login')} 
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            {isElevenAM ? 'Create account' : 'Login'}
          </button>
        )}
        
        <img 
          onClick={() => setShowMenu(true)} 
          className='w-6 md:hidden cursor-pointer' 
          src={assets.menu_icon} 
          alt="Menu" 
        />

        {/* Mobile Menu */}
        <div className={`md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all ${showMenu ? 'fixed w-full' : 'h-0 w-0'}`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <div className="flex items-center space-x-2">
              <PawPrint size={32} className="text-pet-blue" />
              <span className="text-xl font-bold text-pet-dark">
                Pet<span className="text-pet-blue">Well</span>
              </span>
            </div>
            <img 
              onClick={() => setShowMenu(false)} 
              src={assets.cross_icon} 
              className='w-7 cursor-pointer' 
              alt="Close" 
            />
          </div>
          
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink to='/' className={({isActive}) => isActive ? 'text-primary' : ''} onClick={() => setShowMenu(false)}>
              <li className='py-1'>Home</li>
            </NavLink>
            <NavLink to='/barber' className={({isActive}) => isActive ? 'text-primary' : ''} onClick={() => setShowMenu(false)}>
              <li className='py-1'>Find a vet</li>
            </NavLink>
            <NavLink to='/Lostandfound' className={({isActive}) => isActive ? 'text-primary' : ''} onClick={() => setShowMenu(false)}>
              <li className='py-1'>Lost & Found</li>
            </NavLink>
            <NavLink to='/about' className={({isActive}) => isActive ? 'text-primary' : ''} onClick={() => setShowMenu(false)}>
              <li className='py-1'>Meal</li>
            </NavLink>
            <NavLink to='/community' className={({isActive}) => isActive ? 'text-primary' : ''} onClick={() => setShowMenu(false)}>
              <li className='py-1'>Community</li>
            </NavLink>
            <NavLink to='/Precautions' className={({isActive}) => isActive ? 'text-primary' : ''} onClick={() => setShowMenu(false)}>
              <li className='py-1'>Precautions</li>
            </NavLink>
          </ul>
          
          <div className='mt-10 px-5 pb-10'>
            {token ? (
              <div className='flex flex-col gap-4'>
                <div className="flex justify-center mb-4">
                  <img 
                    className='w-16 h-16 rounded-full object-cover border-2 border-primary'
                    src={userData?.image || assets.profile_pic} 
                    alt="Profile" 
                  />
                </div>
                <button 
                  onClick={() => { navigate('/my-profile'); setShowMenu(false); }} 
                  className='bg-primary text-white px-8 py-3 rounded-full font-light'
                >
                  My Profile
                </button>
                <button 
                  onClick={logout} 
                  className='border border-primary text-primary px-8 py-3 rounded-full font-light'
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { 
                  navigate(isElevenAM ? '/register' : '/login'); 
                  setShowMenu(false);
                }} 
                className='bg-primary text-white px-8 py-3 rounded-full font-light w-full'
              >
                {isElevenAM ? 'Create account' : 'Login'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
