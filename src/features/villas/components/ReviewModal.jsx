import { useState } from "react";
import { HiStar, HiX } from "react-icons/hi";

export const ReviewModal = ({ isOpen, onClose, onSubmit, villaName }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-strong w-full max-w-md rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif text-primary">Beri Ulasan</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HiX size={24} />
            </button>
          </div>
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-4">
              Bagaimana pengalaman Anda di {villaName}?
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90"
                >
                  <HiStar
                    size={32}
                    color={
                      (hover || rating) >= star
                        ? "var(--color-accent)"
                        : "var(--color-muted)"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="w-full bg-secondary border border-border rounded-2xl p-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none mb-6"
            placeholder="Tuliskan ulasan..."
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={() => onSubmit({ rating, comment })}
            disabled={!rating}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all"
          >
            Send Review
          </button>
        </div>
      </div>
    </div>
  );
};
