
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Emily Rodriguez",
    pet: "Max (Golden Retriever)",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    text: "Pet Care has been amazing for our family. Dr. Johnson really took the time to understand Max's needs and developed a treatment plan that worked perfectly for his arthritis. The staff is always warm and friendly too!",
  },
  {
    id: 2,
    name: "James Wilson",
    pet: "Luna (Siamese Cat)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    text: "When Luna needed emergency surgery after swallowing a toy, Dr. Chen was truly a lifesaver. The clinic's 24/7 emergency service gave us peace of mind, and the follow-up care was exceptional.",
  },
  {
    id: 3,
    name: "Sophia Kim",
    pet: "Buddy (Mixed Breed)",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    text: "The virtual consultations offered by Pet Care have been a game-changer for us. Buddy gets anxious at clinics, so being able to consult with Dr. Patel remotely for minor issues has been wonderful.",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    pet: "Oliver (Maine Coon)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    text: "I'm so grateful for the compassionate care Oliver received during his final days. The team at Pet Care made a difficult time much more bearable with their kindness and support.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (autoplay) {
      timer = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearTimeout(timer);
  }, [current, autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pet-dark">What Pet Owners Say</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from our community of satisfied pet parents about their experiences with Pet Care.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-pet-cream/30 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pet-blue">
                      <img 
                        src={testimonials[current].image} 
                        alt={testimonials[current].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-pet-blue rounded-full p-1">
                      <Quote className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-lg text-gray-600 italic mb-6">"{testimonials[current].text}"</p>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-pet-dark">{testimonials[current].name}</p>
                      <p className="text-sm text-pet-blue">{testimonials[current].pet}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={handlePrev}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={handleNext}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrent(index);
                }}
                className={`w-2 h-2 mx-1 rounded-full transition-all ${
                  current === index ? "bg-pet-blue w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
