import { Button } from "@/components/button";
import { CgProfile } from "react-icons/cg";

export const ProfileDetails = () => {
  return (
    <div className="ml-80">
      {/* Profile Detailed Info */}
      <div className="glass rounded-xl h-fit p-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              {/* Profile Picture */}
              <CgProfile size={50} className="hover:text-primary" />
              {/* Personal Info */}
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Asmara Kusuma
                </h1>
                <p className="text-sm">Solo Traveler</p>
              </div>
            </div>
            {/* Edit Button */}
            <Button size="sm" className="text-sm font-bold">
              Edit Profil <span></span>
            </Button>
          </div>
        </div>

        <div>
          {/* Email */}
          <div></div>

          {/* Phone */}
          <div></div>

          {/* Address */}
          <div></div>
        </div>
      </div>

      <h1 className="mt-8 text-xl font-serif text-accent">My Recent Booking</h1>
      <div></div>
    </div>
  );
};
