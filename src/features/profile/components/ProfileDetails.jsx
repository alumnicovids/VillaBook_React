import { Button } from "@/components/common/Button";
import { CgProfile } from "react-icons/cg";
import { useVilla } from "@/context/VillaContext";
import { FaArrowRightLong } from "react-icons/fa6";

export const ProfileDetails = () => {
  const { profileData } = useVilla();
  return (
    <div className="ml-80">
      {/* Profile Detailed Info */}
      <div className="glass rounded-xl h-fit p-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              {/* Profile Picture */}
              <CgProfile size={50} />
              {/* Personal Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-serif font-bold text-primary">
                    {profileData.name}
                  </h1>
                  <p className="bg-background rounded-full text-xs text-accent py-1 px-4">
                    NEW MEMBER
                  </p>
                </div>
                <p className="text-sm">{profileData.bio}</p>
              </div>
            </div>

            {/* Edit Button */}
            <Button size="sm" className="text-sm font-bold">
              Edit Profile
              <span>
                <FaArrowRightLong size={12} />
              </span>
            </Button>
          </div>
        </div>

        <div className="flex gap-20 mt-8 border-t border-accent/60">
          {/* Email */}
          <div className="mt-8 text-xs">
            <h1 className="text-primary">EMAIL</h1>
            <p>{profileData.email}</p>
          </div>

          {/* Phone */}
          <div className="mt-8 text-xs">
            <h1 className="text-primary">PHONE</h1>
            <p>{profileData.phone}</p>
          </div>

          {/* Address */}
          <div className="mt-8 text-xs">
            <h1 className="text-primary">ADDRESS</h1>
            <p>{profileData.address}</p>
          </div>
        </div>
      </div>

      <h1 className="mt-8 text-xl font-serif text-accent">My Recent Booking</h1>
      <div></div>
    </div>
  );
};
