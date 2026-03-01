import { useVilla } from "@/context/VillaContext";
import { formatPrice } from "@/utils/Formatter";
import { MdLocationOn, MdCalendarMonth, MdCheckCircle, MdOutlineRateReview } from "react-icons/md";
import { Link } from "react-router";
import { useState } from "react";
import { ReviewModal } from "@/features/villas/components/ReviewModal";

export const MyBookings = () => {
  const { villaList, showToast } = useVilla();
  const [selectedVilla, setSelectedVilla] = useState(null);
  const bookings = JSON.parse(localStorage.getItem("booking_history") || "[]");

  // Get villa details for each booking
  const enrichedBookings = bookings.map(booking => {
    const villa = villaList.find(v => v.id === booking.id);
    return { ...booking, villa };
  }).reverse(); // Latest first

  const handleReviewSubmit = (reviewData) => {
    console.log("Review submitted:", reviewData, "for villa:", selectedVilla.name);
    showToast("Thank you for your review!", "success");
    setSelectedVilla(null);
  };

  if (enrichedBookings.length === 0) {
    return (
      <div className="ml-80">
        <div className="glass rounded-xl p-12 text-center">
          <div className="flex justify-center mb-6 text-accent/50">
            <MdCalendarMonth size={64} />
          </div>
          <h2 className="text-2xl font-serif text-primary mb-4">No Bookings Yet</h2>
          <p className="text-muted-foreground mb-8">Your future adventures will appear here.</p>
          <Link to="/discover" className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:brightness-110 transition-all">
            Explore Villas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-80 space-y-6">
      <h2 className="text-3xl font-serif text-primary">My Bookings</h2>
      <div className="grid gap-6">
        {enrichedBookings.map((booking, index) => (
          <div key={index} className="glass rounded-xl overflow-hidden flex flex-col md:flex-row border border-white/5 group">
            <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
              <img 
                src={booking.villa?.image[0] || "/Background.png"} 
                alt={booking.villa?.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-primary">{booking.villa?.name}</h3>
                  <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    <MdCheckCircle /> COMPLETED
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MdLocationOn className="text-accent" />
                  {booking.villa?.location}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Room Type</p>
                    <p className="font-semibold">{booking.roomType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Reference</p>
                    <p className="font-mono">{booking.bookingReference || booking.reference}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/50 flex justify-between items-end">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Paid</p>
                  <p className="text-xl font-bold text-accent">{formatPrice(booking.pricing?.totalPrice || booking.totalPrice)}</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedVilla(booking.villa)}
                    className="flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors uppercase tracking-widest"
                  >
                    <MdOutlineRateReview size={18} /> Review
                  </button>
                  <Link 
                    to={`/detail/${booking.id}`}
                    className="text-sm font-bold text-primary hover:underline uppercase tracking-widest"
                  >
                    View Property
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVilla && (
        <ReviewModal 
          isOpen={!!selectedVilla}
          onClose={() => setSelectedVilla(null)}
          onSubmit={handleReviewSubmit}
          villaName={selectedVilla.name}
        />
      )}
    </div>
  );
};
