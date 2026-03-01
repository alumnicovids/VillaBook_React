import { Button } from "@/components/common/Button";
import { useVilla } from "@/context/VillaContext";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { EditProfileModal } from "./EditProfileModal";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router";

export const ProfileDetails = () => {
  const { profileData, villaList } = useVilla();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const bookings = JSON.parse(localStorage.getItem("booking_history") || "[]");
  const recentBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;
  const villa = recentBooking ? villaList.find(v => v.id === recentBooking.id) : null;

  return (
    <div className="ml-80">
      {/* Profile Detailed Info */}
      <div className="glass rounded-3xl h-fit p-8 border border-white/5">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <img 
                  src={profileData.avatar} 
                  alt={profileData.name} 
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-accent/30 ring-offset-4 ring-offset-background transition-all group-hover:ring-accent"
                />
              </div>
              {/* Personal Info */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-serif font-bold text-primary">
                    {profileData.name}
                  </h1>
                  <span className="bg-accent/10 text-accent rounded-full text-[10px] font-bold py-1 px-3 uppercase tracking-widest">
                    NEW MEMBER
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-medium">{profileData.bio}</p>
              </div>
            </div>

            {/* Edit Button */}
            <Button 
              size="sm" 
              className="text-sm font-bold"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Profile
              <span>
                <FaArrowRightLong size={12} />
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-white/10">
          {/* Email */}
          <div>
            <h1 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">EMAIL ADDRESS</h1>
            <p className="text-sm font-medium text-primary">{profileData.email}</p>
          </div>

          {/* Phone */}
          <div>
            <h1 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">PHONE NUMBER</h1>
            <p className="text-sm font-medium text-primary">{profileData.phone}</p>
          </div>

          {/* Address */}
          <div>
            <h1 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">STREET ADDRESS</h1>
            <p className="text-sm font-medium text-primary">{profileData.address}</p>
          </div>
        </div>
      </div>

      <h1 className="mt-12 mb-6 text-2xl font-serif text-primary">My Recent Booking</h1>
      
      {villa ? (
        <div className="glass rounded-2xl overflow-hidden flex border border-white/5 hover:border-accent/30 transition-all group">
          <div className="w-48 h-32 overflow-hidden">
            <img 
              src={villa.image[0]} 
              alt={villa.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
            />
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-bold text-xl text-primary mb-1">{villa.name}</h3>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MdLocationOn className="text-accent" />
                  {villa.location}
                </p>
              </div>
              <Link 
                to="/profile/my-bookings" 
                className="text-xs font-bold text-accent hover:underline uppercase tracking-widest"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-soft rounded-2xl p-8 text-center border border-dashed border-border/50">
          <p className="text-muted-foreground text-sm">No recent bookings found.</p>
          <Link to="/discover" className="text-accent font-bold text-sm mt-2 inline-block hover:underline">
            Browse Our Collection
          </Link>
        </div>
      )}

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
};
