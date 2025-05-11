
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

import { PawPrint, Stethoscope, Heart, Scissors, Pill, Calendar } from "lucide-react";

const services = [
  {
    title: "Wellness Exams",
    description: "Regular check-ups to ensure your pet is healthy and happy.",
    icon: <Stethoscope className="h-12 w-12 text-pet-blue" />,
  },
  {
    title: "Vaccinations",
    description: "Protection against common infectious diseases for your pet.",
    icon: <Pill className="h-12 w-12 text-pet-blue" />,
  },
  {
    title: "Dental Care",
    description: "Complete dental services to keep your pet's teeth healthy.",
    icon: <PawPrint className="h-12 w-12 text-pet-blue" />,
  },
  {
    title: "Surgery",
    description: "Advanced surgical procedures for all your pet's needs.",
    icon: <Scissors className="h-12 w-12 text-pet-blue" />,
  },
  {
    title: "Emergency Care",
    description: "24/7 emergency services for critical situations.",
    icon: <Heart className="h-12 w-12 text-pet-blue" />,
  },
  {
    title: "Virtual Consultations",
    description: "Convenient online appointments from the comfort of home.",
    icon: <Calendar className="h-12 w-12 text-pet-blue" />,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pet-dark">Our Services</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We offer a wide range of veterinary services to keep your pets healthy and happy throughout every stage of their lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="pet-card border-none hover:-translate-y-1 transition-all duration-200">
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-semibold text-pet-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
