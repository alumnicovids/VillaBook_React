import { Button } from "@/components/Button";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { MdLocationOn, MdOutlineBathtub, MdPool } from "react-icons/md";
import { Link } from "react-router";
import { formatPrice } from "@/utils/Formatter";

export const Card = ({ villa }) => {
  return (
    <div className="relative overflow-hidden rounded-xl glass text-sm text-primary hover:bg-primary/10">
      {/* Card images */}
      <div className="flex h-50">
        <img
          src={villa.image[0]}
          alt={villa.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 right-2 text-red-500 text-lg cursor-pointer">
          <FaRegHeart />
        </div>
        <div className="absolute top-2 left-2 glass-soft rounded-xl p-2 text-xs text-accent tracking-tight">
          {villa.tag}
        </div>
      </div>

      {/* Card Title and Price */}
      <div className="flex justify-between px-2 py-3 text-text">
        <div className="flex flex-col tracking-tight">
          <div className="font-serif font-bold">{villa.name}</div>
          <div className="flex items-center text-sm text-gray-50/50">
            <MdLocationOn />
            <div>{villa.location}</div>
          </div>
        </div>
        <div className="font-bold text-primary text-sm">
          {formatPrice(villa.price)}
        </div>
      </div>

      {/* Card amenties */}
      <div className="flex justify-between px-2 py-3 border-t border-b border-accent/30">
        <div className="flex flex-col gap-1">
          <div className="text-2xl">
            <IoBedOutline />
          </div>
          <div className="text-muted-foreground/80">BEDROOMS</div>
          <div className="font-bold text-secondary-foreground">
            {villa.amenities.bed} Beds
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl">
            <MdOutlineBathtub />
          </div>
          <div className="text-muted-foreground/80">BATHROOMS</div>
          <div className="font-bold text-secondary-foreground">
            {villa.amenities.bathtub} Baths
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl">
            <MdPool />
          </div>
          <div className="text-muted-foreground/80">POOL</div>
          <div className="font-bold text-secondary-foreground">
            {villa.amenities.pool ? "Yes" : "No"}
          </div>
        </div>
      </div>
      {/* Card Button */}
      <Link to={`/detail/${villa.name}`}>
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            className="m-2 w-full hover:scale-[1.02] active:scale-95 transition-all"
            background="primary"
          >
            View Details
            <span>
              <FaArrowRightLong />
            </span>
          </Button>
        </div>
      </Link>
    </div>
  );
};
