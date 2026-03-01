import { useState, useEffect } from "react";
import { useVilla } from "@/context/VillaContext";
import { MdClose, MdCameraAlt, MdPerson, MdEmail, MdPhone, MdLocationOn, MdInfo } from "react-icons/md";
import { Button } from "@/components/common/Button";

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { profileData, updateProfile } = useVilla();
  const [formData, setFormData] = useState(profileData);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(profileData);
    }
  }, [isOpen, profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const inputClasses = (fieldName) => `
    w-full bg-surface/30 border-b-2 transition-all duration-300 px-0 py-3 text-base outline-none
    ${activeField === fieldName ? "border-accent text-primary" : "border-white/10 text-muted-foreground hover:border-white/30"}
  `;

  const labelClasses = (fieldName) => `
    text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300
    ${activeField === fieldName ? "text-accent" : "text-muted-foreground/60"}
  `;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:pt-24">
      <div 
        className="absolute inset-0 bg-background/40 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-3xl bg-background/90 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Sidebar - Visual/Summary - Slightly smaller */}
          <div className="md:w-[30%] bg-surface/30 p-6 flex flex-col items-center text-center border-r border-white/5">
            <div className="relative mb-4 group cursor-pointer">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={formData.avatar} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full object-cover relative z-10 ring-4 ring-background shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
              <label className="absolute bottom-0 right-0 z-20 p-2 bg-accent text-accent-foreground rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer">
                <MdCameraAlt size={14} />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            <h3 className="text-lg font-serif font-bold text-primary mb-1 truncate w-full">{formData.name || "Your Name"}</h3>
            <p className="text-[10px] text-accent uppercase tracking-widest font-bold mb-4">{formData.bio || "Member"}</p>
            
            <div className="space-y-3 w-full text-left pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-1.5 rounded-lg bg-background/50"><MdEmail size={12} /></div>
                <span className="text-[9px] truncate">{formData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-1.5 rounded-lg bg-background/50"><MdPhone size={12} /></div>
                <span className="text-[9px]">{formData.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Form - More compact padding */}
          <div className="flex-1 p-6 md:p-8 relative">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-primary hover:bg-surface/50 rounded-full transition-all"
            >
              <MdClose size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-serif text-primary mb-1">Profile Settings</h2>
              <p className="text-xs text-muted-foreground italic">Refine your sanctuary details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-1">
                  <label className={labelClasses("name")}>Full Identity</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    onChange={handleChange}
                    className={inputClasses("name")}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className={labelClasses("bio")}>Traveler Title</label>
                  <input
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onFocus={() => setActiveField("bio")}
                    onBlur={() => setActiveField(null)}
                    onChange={handleChange}
                    className={inputClasses("bio")}
                    placeholder="e.g. Luxury Explorer"
                  />
                </div>

                <div className="space-y-1">
                  <label className={labelClasses("email")}>Correspondence</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    onChange={handleChange}
                    className={inputClasses("email")}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className={labelClasses("phone")}>Contact Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                    onChange={handleChange}
                    className={inputClasses("phone")}
                    placeholder="+62 ..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClasses("address")}>Primary Residence</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onFocus={() => setActiveField("address")}
                  onBlur={() => setActiveField(null)}
                  onChange={handleChange}
                  className={`${inputClasses("address")} min-h-[60px] resize-none text-sm`}
                  placeholder="Street, City, Country"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border border-white/5 rounded-xl hover:bg-surface/30"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="flex-[1.5] py-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save Sanctuary Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

