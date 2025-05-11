
// import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../context/button";

const CtaSection = () => {
  return (
<section className="py-16 bg-pet-blue">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Ready to Schedule Your Pet's Visit?
      </h2>
      <p className="text-blue-100 text-lg mb-8 md:px-12">
        Whether it's a routine check-up or a specific concern, our veterinary team is here to help your pet live their happiest, healthiest life.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/book">
          <button className="bg-white text-pet-blue hover:bg-pet-cream hover:text-pet-blue rounded-full py-4 px-6 flex items-center justify-center gap-2 shadow-md transition duration-300 ease-in-out">
            <Calendar size={20} />
            Book an Appointment
          </button>
        </Link>
        <button className="border border-white text-white hover:bg-blue-700 hover:border-transparent rounded-full py-4 px-6 flex items-center justify-center gap-2 transition duration-300 ease-in-out">
          <Phone size={20} />
          Call Us: (123) 456-7890
        </button>
      </div>

      <div className="mt-8 text-blue-100">
        <p>Need emergency help? Our 24/7 emergency service is always available.</p>
      </div>
    </div>
  </div>

  {/* Wave Divider */}
  <div className="relative mt-16">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
      <path 
        fill="#F9F4E8" 
        fillOpacity="1" 
        d="M0,32L80,42.7C160,53,320,75,480,80C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
      ></path>
    </svg>
  </div>
</section>

  );
};

export default CtaSection;
