import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useVilla } from "@/context/VillaContext";
import {
  MdLocationOn,
  MdKingBed,
  MdBathtub,
  MdPool,
  MdWifi,
  MdSpa,
  MdArrowForward,
  MdVerifiedUser,
  MdEventAvailable,
  MdSchedule,
} from "react-icons/md";
import { Background } from "@/components/Background";
import { Button } from "@/components/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { formatPrice } from "@/utils/Formatter";

export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { villaList, toggleWishlist, wishlist } = useVilla();
  const [villa, setVilla] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (villaList && villaList.length > 0) {
      const found = villaList.find((v) => v.id.toString() === id);
      setVilla(found);
      setCurrentImageIndex(0);
    }
  }, [id, villaList]);

  useEffect(() => {
    if (!villa || villa.image.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % villa.image.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [villa]);

  if (!villa)
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading...
      </main>
    );

  const isWishlisted = wishlist.some((item) => item.id === villa.id);

  // Promo logic
  const hasPromo =
    villa.promo && villa.promo.status === "active" && villa.promo.disc;
  const discountPercent = hasPromo
    ? parseFloat(String(villa.promo.disc).replace("%", "")) || 0
    : 0;
  const discountedPrice = hasPromo
    ? Math.round(villa.price * (1 - discountPercent / 100))
    : villa.price;

  return (
    <section className="relative min-h-screen items-center overflow-hidden">
      <Background />

      <div className="max-w-7xl mx-auto px-6 py-4 mt-32 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
            Property Details
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
            {villa.name}
          </h2>
          <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50" />
        </div>

        <nav className="flex text-xs font-medium uppercase tracking-widest text-muted-foreground gap-2">
          <Link className="hover:text-primary transition-colors" to="/">
            Bali
          </Link>
          <span>/</span>
          <Link className="hover:text-primary transition-colors" to="/">
            {villa.location.split(",")[0]}
          </Link>
          <span>/</span>
          <span className="text-primary">{villa.name}</span>
        </nav>
      </div>

      <main className="antialiased text-foreground min-h-screen">
        <section className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
          <div className="relative h-162.5 w-full rounded-xl overflow-hidden group">
            <img
              alt={villa.name}
              className="w-full h-full object-cover"
              src={villa.image[currentImageIndex]}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80"></div>

            {/* Image Counter and Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="bg-surface/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-foreground">
                {currentImageIndex + 1} / {villa.image.length}
              </div>
            </div>

            {/* Navigation Arrows */}
            {villa.image.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) =>
                        (prev - 1 + villa.image.length) % villa.image.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface/50 hover:bg-surface/70 backdrop-blur-md text-foreground p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev + 1) % villa.image.length,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface/50 hover:bg-surface/70 backdrop-blur-md text-foreground p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  →
                </button>
              </>
            )}

            <div className="absolute bottom-0 left-0 p-12 w-full flex justify-between items-end">
              <div className="text-foreground">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                    {villa.tag}
                  </span>
                  <div className="flex items-center gap-1 bg-surface/50 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="font-bold">{villa.rating}</span>
                  </div>
                </div>
                <h1 className="text-6xl font-serif font-bold mb-2 text-primary">
                  {villa.name}
                </h1>
                <p className="flex items-center gap-2 text-lg opacity-90 text-foreground">
                  <MdLocationOn className="text-base" />
                  {villa.location}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => toggleWishlist(villa)}
                  className={`${isWishlisted ? "bg-accent hover:bg-accent/80 text-red-500" : "bg-surface/30 hover:bg-surface/50"} backdrop-blur-md text-foreground px-6 py-3 rounded-xl flex items-center gap-2 transition-all`}
                >
                  {isWishlisted ? <FaHeart /> : <FaRegHeart />} Save
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              <div className="space-y-6">
                <div className="flex items-center gap-8 py-6 border-y border-border">
                  <div className="flex items-center gap-3">
                    <MdKingBed className="text-3xl text-accent" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                        Bedrooms
                      </p>
                      <p className="text-sm font-semibold">
                        {villa.amenities.bed} Beds
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdBathtub className="text-3xl text-accent" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                        Bathrooms
                      </p>
                      <p className="text-sm font-semibold">
                        {villa.amenities.bathtub} Baths
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdPool className="text-3xl text-accent" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                        Pool
                      </p>
                      <p className="text-sm font-semibold">
                        {villa.amenities.pool ? "Private Pool" : "No Pool"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none text-foreground">
                  <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
                    About this property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {villa.detail.description}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8 text-primary">
                  What this place offers
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                  {villa.detail.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <MdWifi className="text-2xl text-accent" />
                      <span className="font-medium text-sm text-foreground">
                        {facility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8 text-primary">
                  Elevate your stay
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {villa.detail.extraServices.map((service, index) => (
                    <div
                      key={index}
                      className="p-6 border border-border rounded-xl flex items-center justify-between hover:border-accent transition-colors cursor-pointer group glass"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:bg-accent/10">
                          <MdSpa className="text-accent text-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {service.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-foreground">
                          IDR {service.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
                  Location & Surroundings
                </h2>
                <p className="text-muted-foreground mb-6">
                  {villa.detail.address}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <h3 className="font-bold uppercase tracking-widest text-xs text-muted-foreground">
                      Nearby Attractions
                    </h3>
                    <ul className="space-y-4">
                      {villa.detail.nearbyPlaces.map((place, index) => {
                        const [name, distance] = place.split(" (");
                        return (
                          <li
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="flex items-center gap-3 text-foreground">
                              <MdLocationOn className="text-sm text-accent" />
                              {name}
                            </span>
                            <span className="text-muted-foreground">
                              {distance?.replace(")", "")}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="glass border border-border p-8 rounded-xl sticky top-24 shadow-sm">
                <div className="flex items-baseline justify-between mb-8">
                  <div className="w-full">
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-1">
                      Price from
                    </p>
                    {hasPromo ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-3xl font-bold text-primary">
                            {formatPrice(discountedPrice)}
                          </h3>
                          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">
                            {villa.promo.disc} OFF
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(villa.price)}
                        </p>
                      </div>
                    ) : (
                      <h3 className="text-3xl font-bold text-primary">
                        {formatPrice(villa.price)}
                      </h3>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      / night inclusive of taxes
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/book/${villa.id}`)}
                  background="primary"
                  className="w-full mb-6"
                >
                  Confirm Booking <MdArrowForward />
                </Button>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <MdVerifiedUser className="text-sm" /> Best price guaranteed
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <MdEventAvailable className="text-sm" /> Instant
                    confirmation
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <MdSchedule className="text-sm" />{" "}
                    {villa.detail.cancellationPolicy}
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-xs font-bold uppercase mb-4 tracking-tighter text-muted-foreground">
                    Available Room Types
                  </p>
                  <div className="space-y-2">
                    {villa.rooms.map((room, index) => {
                      const roomDiscountedPrice = hasPromo
                        ? Math.round(room.price * (1 - discountPercent / 100))
                        : room.price;
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 text-sm border-b border-border last:border-0"
                        >
                          <span className="text-foreground">{room.type}</span>
                          <div className="flex flex-col items-end gap-1">
                            {hasPromo ? (
                              <>
                                <span className="font-bold text-primary">
                                  {formatPrice(roomDiscountedPrice)}
                                </span>
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(room.price)}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold text-primary">
                                {formatPrice(room.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};
