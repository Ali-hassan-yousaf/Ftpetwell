import React from 'react';

const App = () => {
  return (
    <div className="bg-gray-50">
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            alt="Happy golden retriever playing in a field" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Premium Care for Your Beloved Pets
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-slide-up">
              Where pets are treated like family
            </p>
            <div className="flex justify-center">
              <button
                className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-blue-700 transition-colors duration-300"
                onClick={() => window.location.href = '/saloons'}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img 
                    alt={service.title} 
                    className="w-full h-full object-cover" 
                    src={service.image}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">{service.price}</span>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm"
                      onClick={() => window.location.href = '/saloons'}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Happy Pet Parents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The best care my golden retriever has ever received! Truly a home away from home."
              </p>
              <p className="font-semibold text-gray-800">Sarah Johnson</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Professional service with genuine love for animals. Highly recommend!"
              </p>
              <p className="font-semibold text-gray-800">Michael Chen</p>
            </div>
          </div>
        </section>

        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Happy Clients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  src={img.src}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 text-white rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Pamper Your Pet?</h3>
          <p className="mb-6">Schedule an appointment with our expert caregivers today!</p>
          <button
            className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            onClick={() => window.location.href = '/saloons'}
          >
            Book Now
          </button>
        </section>
      </div>
    </div>
  );
};

// Updated data with unique images
const services = [
  {
    title: 'Grooming',
    description: 'Professional bathing, brushing, and styling',
    price: 'PKR 2500',
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Veterinary Care',
    description: 'Health checkups and vaccinations',
    price: 'PKR 3500',
    image: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Dog Walking',
    description: 'Daily exercise and outdoor adventures',
    price: 'PKR 1000/hr',
    image: 'https://www.thesprucepets.com/thmb/iVhigMbsWLpwQZNSF6-PObIQijA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/rules-for-walking-your-dog-1117437-01-9e2d4548f974456db20e7c5abe1c3291.jpg'
  },
  {
    title: 'Pet Sitting',
    description: 'Loving care while you\'re away',
    price: 'PKR 2000/day',
    image: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

const galleryImages = [
  {
    alt: 'Cat grooming',
    src: 'https://images.unsplash.com/photo-1625316708582-7c38734be31d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    alt: 'Pet vaccination',
    src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    alt: 'Dog playing',
    src: 'https://images.unsplash.com/photo-1597306599196-bf148477596b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    alt: 'Pet training',
    src: 'https://plus.unsplash.com/premium_photo-1707353402061-c31b6ba8562e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

export default App;