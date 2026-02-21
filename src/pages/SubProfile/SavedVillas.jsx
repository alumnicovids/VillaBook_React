import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { useVilla } from "../../context/VillaContext";
import { HiOutlineHeart } from "react-icons/hi2";
import { Link } from "react-router";

export const SavedVillas = () => {
  const { wishlist, clearWishlist } = useVilla();
  const [offset, setOffset] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 ml-80">
      {showConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            onClick={() => setShowConfirm(false)}
          />
          <div className="glass-strong p-8 rounded-3xl max-w-sm w-full relative z-10 border-border/20">
            <h3 className="font-serif text-2xl text-primary mb-2">
              Clear Wishlist?
            </h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              This will remove all saved villas from your collection.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl glass hover:bg-surface transition-colors text-xs uppercase tracking-widest font-bold"
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

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">
            Saved Properties
          </span>
          <h2 className="text-4xl font-serif text-foreground leading-tight">
            My Wishlist
          </h2>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-bold border-b border-border/30 pb-1"
          >
            Clear All Collection
          </button>
        )}
      </div>

      <div className="relative">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
          <div className="flex flex-col items-center justify-center">
            <div
              className="relative transition-transform duration-300"
              style={{ transform: `translateY(${offset * 0.05}px)` }}
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <HiOutlineHeart className="text-8xl text-primary/40 relative z-10 mb-6" />
            </div>
            <h3 className="text-2xl font-serif text-foreground mb-2">
              No saved villas yet
            </h3>
            <p className="text-muted-foreground max-w-xs text-center mb-8 text-sm italic leading-relaxed">
              "Every great journey begins with a single dream. Start exploring
              and find your perfect sanctuary."
            </p>
            <Link
              to="/discover"
              className="px-8 py-3 bg-primary text-primary-foreground hover:bg-surface hover:text-foreground transition-all duration-300 rounded-full tracking-widest text-xs uppercase font-bold"
            >
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
