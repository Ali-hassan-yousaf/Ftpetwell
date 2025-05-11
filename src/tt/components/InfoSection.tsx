
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Calendar, PawPrint } from "lucide-react";

const InfoSection = () => {
  return (
    <section className="py-16 bg-pet-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hours */}
          <Card className="pet-card border-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-pet-blue/10 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-pet-blue" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-pet-dark">Clinic Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Monday-Friday:</span> 8am - 7pm</p>
                <p><span className="font-medium">Saturday:</span> 9am - 5pm</p>
                <p><span className="font-medium">Sunday:</span> 10am - 4pm</p>
                <p className="text-pet-blue font-medium">Emergency: 24/7</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Locations */}
          <Card className="pet-card border-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-pet-blue/10 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-pet-blue" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-pet-dark">Our Locations</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-medium text-pet-dark">Main Clinic</p>
                  <p>123 Pet Street</p>
                  <p>Animalia, CA 94103</p>
                </div>
                <div>
                  <p className="font-medium text-pet-dark">North Branch</p>
                  <p>456 Furry Lane</p>
                  <p>Animalia, CA 94158</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Services */}
          <Card className="pet-card border-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-pet-blue/10 p-4 rounded-full mb-4">
                <PawPrint className="h-8 w-8 text-pet-blue" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-pet-dark">Services</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Wellness Exams</li>
                <li>Vaccinations</li>
                <li>Surgery</li>
                <li>Dental Care</li>
                <li>Emergency Care</li>
                <li>Virtual Consultations</li>
                <li>Nutritional Counseling</li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Book */}
          <Card className="pet-card border-none bg-gradient-to-br from-pet-blue to-blue-500 text-white">
            <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Book an Appointment</h3>
              <p className="mb-6">Schedule online or call us at:</p>
              <p className="text-xl font-bold">(123) 456-7890</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
