import React from 'react';




const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-pet-cream to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-pet-dark">
              Your Pet's Health, <span className="text-pet-blue">Our Priority</span>
            </h1>
            <p className="text-lg text-gray-600">
              At PetWell, we provide compassionate veterinary services to ensure your furry, feathered, or scaly family members live their happiest, healthiest lives.
            </p>
            
           
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=2340&h=1560" 
                alt="Veterinarian with pet" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Stats Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg absolute -bottom-6 -left-6 md:left-6 max-w-xs pet-card">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-pet-blue">2,500+</h3>
                <p className="text-pet-dark mt-1">Happy Pets Treated This Month!</p>
              </div>
            </div>
            
            {/* Paw Print Decorations */}
            <div className="absolute -top-6 -right-3 opacity-20">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15Z" fill="#6CA0D9"/>
                <path d="M7.5 12C8.32843 12 9 11.3284 9 10.5C9 9.67157 8.32843 9 7.5 9C6.67157 9 6 9.67157 6 10.5C6 11.3284 6.67157 12 7.5 12Z" fill="#6CA0D9"/>
                <path d="M7.5 15C8.32843 15 9 14.3284 9 13.5C9 12.6716 8.32843 12 7.5 12C6.67157 12 6 12.6716 6 13.5C6 14.3284 6.67157 15 7.5 15Z" fill="#6CA0D9"/>
                <path d="M16.5 12C17.3284 12 18 11.3284 18 10.5C18 9.67157 17.3284 9 16.5 9C15.6716 9 15 9.67157 15 10.5C15 11.3284 15.6716 12 16.5 12Z" fill="#6CA0D9"/>
                <path d="M16.5 15C17.3284 15 18 14.3284 18 13.5C18 12.6716 17.3284 12 16.5 12C15.6716 12 15 12.6716 15 13.5C15 14.3284 15.6716 15 16.5 15Z" fill="#6CA0D9"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};



export default Header;


