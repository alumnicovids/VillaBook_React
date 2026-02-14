// Wishlist.jsx
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Background } from "@/components/Background";
import { useVilla } from "../context/VillaContext";
import { HiOutlineHeart } from "react-icons/hi2";
import { Link } from "react-router";

export const Wishlist = () => {
  const { wishlist } = useVilla();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Background />

      <div className="container mx-auto px-4 mt-32 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
            Saved Properties
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
            My Wishlist
          </h2>
          <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50" />
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlist.map((villa, index) => (
              <div
                key={villa.id}
                className="transform transition-all duration-200 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card villa={villa} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-700">
            <div
              className="relative transition-transform duration-75 ease-out"
              style={{ transform: `translateY(${offset * 0.1}px)` }}
            >
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <HiOutlineHeart className="text-8xl text-accent/40 relative z-10 mb-6 drop-shadow-[0_0_25px_rgba(245,194,231,0.3)]" />
            </div>

            <h3 className="text-2xl font-serif text-text mb-2">
              No saved villas yet
            </h3>
            <p className="text-muted-foreground max-w-md text-center mb-8 italic">
              "Every great journey begins with a single dream. Start exploring
              and find your perfect sanctuary."
            </p>

            <Link
              to="/"
              className="px-8 py-3 glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full tracking-widest text-xs uppercase font-bold border-accent/30 shadow-lg hover:shadow-primary/20"
            >
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
