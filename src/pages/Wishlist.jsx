// Wishlist.jsx
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Background } from "@/components/Background";
import { useVilla } from "../context/VillaContext";
import { HiOutlineHeart } from "react-icons/hi2";
import { Link } from "react-router";

export const Wishlist = () => {
  const { wishlist, clearWishlist } = useVilla();
  const [offset, setOffset] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Background />

      {showConfirm && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowConfirm(false)}
          />

          <div className="glass-strong p-8 rounded-2xl max-w-sm w-full relative z-10 border-accent/20 animate-in zoom-in-95 duration-200">
            <h3 className="font-serif text-2xl text-primary mb-2">
              Clear Wishlist?
            </h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              This will remove all saved villas from your collection. This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl glass hover:bg-white/5 transition-colors text-xs uppercase tracking-widest font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearWishlist();
                  setShowConfirm(false);
                }}
                className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 transition-colors text-xs uppercase tracking-widest font-bold"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 mt-32 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
              Saved Properties
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
              My Wishlist
            </h2>
            <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50" />
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-xs uppercase tracking-[0.2em] text-red-400/70 hover:text-red-400 transition-colors font-bold border-b border-red-400/30 pb-1 self-center md:self-end"
            >
              Clear All Collection
            </button>
          )}
        </div>

        <div className="container mx-auto relative z-10">
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {wishlist &&
                wishlist.map((villa, index) => (
                  <div
                    key={villa.id}
                    className="transform transition-all duration-200 hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 1}ms` }}
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
      </div>
    </section>
  );
};
