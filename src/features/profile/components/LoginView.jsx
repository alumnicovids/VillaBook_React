import { useState } from "react";
import { useVilla } from "@/context/VillaContext";
import { Button } from "@/components/common/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

export const LoginView = () => {
  const { login } = useVilla();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate and send to an API
    // For this prototype, we'll just use the form data to "login"
    login({
      name: formData.name || "John Doe",
      email: formData.email || "john.doe@example.com",
      bio: "Luxury traveler & villa enthusiast",
      phone: "+62 812 3456 7890",
      address: "Seminyak, Bali",
      avatar: "Blank_Profile.jpg",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto px-4">
      <div className="w-full glass rounded-3xl p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-accent/10 transition-colors"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-primary mb-3 tracking-tight">
              {isLogin ? "Welcome Back" : "Begin Your Journey"}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isLogin 
                ? "Enter your details to access your exclusive villa collection." 
                : "Join LuxeNest and unlock a world of unparalleled luxury stays."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                    <MdPerson size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface/50 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-accent uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                  <MdEmail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-surface/50 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-accent uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                  <MdLock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-surface/50 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 text-base font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <FaArrowRightLong size={16} />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-bold text-accent hover:underline transition-all"
              >
                {isLogin ? "Join Now" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
