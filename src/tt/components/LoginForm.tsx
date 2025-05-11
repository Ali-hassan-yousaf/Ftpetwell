
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is just a mock implementation
    // In a real app, you would validate credentials against your backend
    if (email === "admin@petcare.com" && password === "admin123") {
      toast({
        title: "Admin Login Successful",
        description: "Welcome back to Pet Care Admin!",
        duration: 3000,
      });
      navigate("/admin-panel");
    } else if (email === "doctor@petcare.com" && password === "doctor123") {
      toast({
        title: "Doctor Login Successful",
        description: "Welcome back to Pet Care Doctor Panel!",
        duration: 3000,
      });
      navigate("/doctor-panel");
    } else {
      toast({
        title: isLogin ? "Login Successful" : "Account Created",
        description: isLogin 
          ? "Welcome back to Pet Care!" 
          : "Thank you for joining Pet Care. Please check your email to verify your account.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-center mb-6">
        <div className="flex">
          <Button
            variant="ghost"
            className={`rounded-l-lg ${isLogin ? 'bg-pet-blue text-white' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant="ghost"
            className={`rounded-r-lg ${!isLogin ? 'bg-pet-blue text-white' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com" 
            required 
            className="pet-input"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            required 
            className="pet-input"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded text-pet-blue focus:ring-pet-blue" />
            <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
          </div>
          {isLogin && <a href="#" className="text-sm text-pet-blue hover:underline">Forgot password?</a>}
        </div>

        <Button type="submit" className="w-full bg-pet-blue hover:bg-pet-blue/90 text-white">
          {isLogin ? "Login" : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
