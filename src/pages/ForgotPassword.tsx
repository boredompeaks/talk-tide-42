import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 relative flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')] 
        bg-cover bg-center bg-no-repeat"
        style={{ filter: 'brightness(0.6)' }}
      />
      
      <div className="relative z-10 w-full max-w-md p-6 backdrop-blur-md bg-white/20 rounded-xl shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <KeyRound className="h-12 w-12 text-white mb-2" />
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-white/80 text-center">
            Enter your email address and we'll send you instructions to reset your password
          </p>
        </div>
        
        <form className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="bg-white/20 text-white placeholder-white/60 border-white/20"
          />
          
          <Button className="w-full" size="lg">
            Send Reset Link
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-white/80 hover:text-white inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;