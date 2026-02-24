import { Button } from "@/components/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { MdLocationOn, MdOutlineBathtub, MdPool } from "react-icons/md";
import { Link } from "react-router";
import { formatPrice } from "@/utils/Formatter";
import { useVilla } from "@/context/VillaContext";

export const Card = ({ villa }) => {
  const { wishlist, toggleWishlist } = useVilla();
  const isWishlisted = wishlist.some((item) => item.id === villa.id);
  const hasPromo =
    villa.promo && villa.promo.status === "active" && villa.promo.disc;
  const discountPercent = hasPromo
    ? parseFloat(String(villa.promo.disc).replace("%", "")) || 0
    : 0;
  const discountedPrice = hasPromo
    ? Math.round(villa.price * (1 - discountPercent / 100))
    : villa.price;

  return (
    <div className="relative overflow-hidden rounded-xl glass text-sm text-primary hover:bg-primary/10">
      {/* Card images */}
      <div className="flex h-50">
        <img
          src={villa.image[0]}
          alt={villa.name}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute top-4 right-2 text-lg text-red-500 cursor-pointer transition-colors"
          onClick={() => toggleWishlist(villa)}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </div>
        <div className="absolute top-2 left-2 glass-soft rounded-xl p-2 text-xs text-accent tracking-tight">
          {villa.tag}
        </div>
        {hasPromo && (
          <div className="absolute top-3 left-24 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
            {villa.promo.disc} OFF
          </div>
        )}
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
          {hasPromo ? (
            <div className="flex flex-col items-end">
              <div className="text-sm text-primary">
                {formatPrice(discountedPrice)}
              </div>
              <div className="text-xs text-muted-foreground/70 line-through">
                {formatPrice(villa.price)}
              </div>
            </div>
          ) : (
            formatPrice(villa.price)
          )}
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
      <Link to={`/detail/${villa.id}`}>
        <div className="flex items-center justify-between">
          <Button size="sm" className="m-2 w-full" background="primary">
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
