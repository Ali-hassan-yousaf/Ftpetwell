import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PawPrint, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      {/* Emergency banner */}
      <div className="bg-pet-blue text-white py-2 px-4 text-center text-sm md:text-base">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <Phone size={18} /> 
          <p>24/7 Emergency? Call (123) 456-7890</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint size={32} className="text-pet-blue animate-paw-bounce" />
            <span className="text-xl md:text-2xl font-bold text-pet-dark">Pet<span className="text-pet-blue">Well</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-pet-dark hover:text-pet-blue font-medium">About Us</Link>
            <Link to="/find-vet" className="text-pet-dark hover:text-pet-blue font-medium">Find a Vet</Link>
            <Link to="/lost-found" className="text-pet-dark hover:text-pet-blue font-medium">Lost & Found</Link>
            <Link to="/meal-plans" className="text-pet-dark hover:text-pet-blue font-medium">Meal Plans</Link>
            <Link to="/community" className="text-pet-dark hover:text-pet-blue font-medium">Community</Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full hover:bg-pet-cream">
                  <User size={18} className="mr-2" /> Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Login to PetWell</DialogTitle>
                  <DialogDescription>
                    Access your account to manage appointments and more
                  </DialogDescription>
                </DialogHeader>
                <LoginForm />
              </DialogContent>
            </Dialog>
            
            <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white rounded-full">
              Book Appointment
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-pet-dark p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col space-y-4 py-4">
            <Link to="/about" className="text-pet-dark hover:text-pet-blue font-medium">About Us</Link>
            <Link to="/find-vet" className="text-pet-dark hover:text-pet-blue font-medium">Find a Vet</Link>
            <Link to="/lost-found" className="text-pet-dark hover:text-pet-blue font-medium">Lost & Found</Link>
            <Link to="/meal-plans" className="text-pet-dark hover:text-pet-blue font-medium">Meal Plans</Link>
            <Link to="/community" className="text-pet-dark hover:text-pet-blue font-medium">Community</Link>
            
            <div className="flex flex-col space-y-2 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full hover:bg-pet-cream w-full">
                    <User size={18} className="mr-2" /> Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Login to PetWell</DialogTitle>
                    <DialogDescription>
                      Access your account to manage appointments and more
                    </DialogDescription>
                  </DialogHeader>
                  <LoginForm />
                </DialogContent>
              </Dialog>
              
              <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white rounded-full w-full">
                Book Appointment
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
