import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 relative flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')] 
        bg-cover bg-center bg-no-repeat"
        style={{ filter: 'brightness(0.6)' }}
      />
      
      <div className="relative z-10 w-full max-w-md p-6 backdrop-blur-md bg-white/20 rounded-xl shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <UserPlus className="h-12 w-12 text-white mb-2" />
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-white/80">Join our community</p>
        </div>
        
        <form className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            className="bg-white/20 text-white placeholder-white/60 border-white/20"
          />
          <Input
            type="email"
            placeholder="Email"
            className="bg-white/20 text-white placeholder-white/60 border-white/20"
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-white/20 text-white placeholder-white/60 border-white/20"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="bg-white/20 text-white placeholder-white/60 border-white/20"
          />
          
          <Button className="w-full" size="lg">
            <UserPlus className="mr-2 h-4 w-4" />
            Create Account
          </Button>
        </form>
        
        <div className="mt-6 text-center text-white/80">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;