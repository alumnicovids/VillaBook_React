import { useParams, useNavigate } from "react-router";
import { useVilla } from "@/context/VillaContext";
import { Background } from "@/components/layout/Background";
import { useBookingManager } from "@/features/booking/hooks/useBookingManager";
import { ProgressBar } from "@/features/booking/components/ProgressBar";
import { RoomSelection } from "@/features/booking/components/RoomSelection";
import { GuestInfoForm } from "@/features/booking/components/GuestInfoForm";
import { ExtraServices } from "@/features/booking/components/ExtraServices";
import { ReviewBooking } from "@/features/booking/components/ReviewBooking";
import { PaymentStage } from "@/features/booking/components/PaymentStage";
import { SuccessStage } from "@/features/booking/components/SuccessState";
import { BookingSummary } from "@/features/booking/components/BookingSummary";
import { CheckOutState } from "@/features/booking/components/CheckOutState";
import { ActiveBookingState } from "@/features/booking/components/ActiveBookingState";
import { ReviewModal } from "@/features/villas/components/ReviewModal";
import { useState } from "react";
import { HiOutlineBookmarkAlt, HiOutlineTag } from "react-icons/hi";

export const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { villaList, profileData, showToast } = useVilla();
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const {
    stage,
    setStage,
    selectedRoom,
    setSelectedRoom,
    guestInfo,
    setGuestInfo,
    selectedServices,
    setSelectedServices,
    bookingReference,
    confirmPayment,
  } = useBookingManager(id, villaList, profileData);

  const villa = id
    ? villaList?.find((v) => v.id.toString() === id)
    : villaList?.find((v) => {
        const bookings = JSON.parse(
          localStorage.getItem("booking_history") || "[]",
        );
        return v.id === bookings[bookings.length - 1]?.id;
      });

  const handleReview = () => setIsReviewOpen(true);
  const handleCheckOut = () => setStage(8);
  const nextStage = () => setStage((prev) => prev + 1);
  const prevStage = () => setStage((prev) => prev - 1);

  const handleHome = () => {
    localStorage.removeItem("booking_stage_active");
    navigate("/");
  };

  const onSubmitReview = () => {
    setIsReviewOpen(false);
    showToast("Review submitted successfully!", "success");
    handleHome();
  };

  if (!id && stage < 6) {
    return (
      <section className="pt-24 pb-12 min-h-[85vh] flex flex-col items-center justify-center">
        <Background />
        <div className="mb-12 text-center">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
            Reservation Status
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
            No Active Booking
          </h2>
          <div className="w-24 h-1 bg-accent mt-4 mx-auto opacity-50" />
        </div>

        <div className="glass-strong p-12 rounded-xl text-center max-w-lg mx-4 border border-white/5">
          <div className="flex justify-center mb-6">
            <div className="p-5 rounded-full bg-secondary/50 text-accent ring-1 ring-white/10">
              <HiOutlineBookmarkAlt size={48} />
            </div>
          </div>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            It looks like you haven't started any journey with us yet. Discover
            our handpicked villas and start your luxury experience today.
          </p>
          <button
            onClick={() => navigate("/discover")}
            className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:brightness-110 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Explore Collections
          </button>
        </div>
      </section>
    );
  }

  if (!villa) return null;

  const isPromoActive = villa?.promo?.status === "active";
  const discountPercent = isPromoActive
    ? parseInt(villa.promo.disc.replace("%", ""), 10)
    : 0;

  const activePromo = isPromoActive
    ? {
        title: "Special Offer",
        discountPercent: discountPercent,
      }
    : null;

  const calculateDiscountedPrice = (price) => {
    return activePromo ? price - price * (discountPercent / 100) : price;
  };

  const originalRoomPrice = Number(selectedRoom?.price || villa?.price || 0);
  const roomDiscountedPrice = calculateDiscountedPrice(originalRoomPrice);

  const nights = Number(guestInfo?.nights || 1);
  const roomTotal = roomDiscountedPrice * nights;
  const totalSavings = (originalRoomPrice - roomDiscountedPrice) * nights;

  const servicesTotal = selectedServices.reduce(
    (t, i) => t + Number(villa?.detail?.extraServices?.[i]?.price || 0),
    0,
  );
  const totalPrice = roomTotal + servicesTotal;

  return (
    <section className="pt-24 pb-12 min-h-screen">
      <Background />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {stage < 6 && (
            <>
              <div className="mb-12 text-center md:text-left">
                <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
                  Exclusive Collection
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
                  Complete Booking
                </h2>
                <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50" />
              </div>

              {activePromo && (
                <div className="mb-8 p-4 glass-strong border-l-4 border-accent rounded-r-xl flex items-center gap-4 animate-in slide-in-from-left duration-500">
                  <div className="p-2 rounded-full bg-accent/20 text-accent">
                    <HiOutlineTag size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent uppercase text-xs tracking-wider">
                      Special Offer Applied
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {activePromo.title}: You are saving{" "}
                      <span className="text-accent font-semibold">
                        {activePromo.discountPercent}%
                      </span>{" "}
                      on your room selection!
                    </p>
                  </div>
                </div>
              )}

              <ProgressBar stage={stage} />
            </>
          )}

          <div
            className={`grid grid-cols-1 ${stage >= 6 ? "" : "lg:grid-cols-3"} gap-8`}
          >
            <div
              className={
                stage >= 6 ? "max-w-3xl mx-auto w-full" : "lg:col-span-2"
              }
            >
              {stage === 1 && (
                <RoomSelection
                  villa={villa}
                  selectedRoom={selectedRoom}
                  setSelectedRoom={setSelectedRoom}
                  hasPromo={!!activePromo}
                  calculateDiscountedPrice={calculateDiscountedPrice}
                  isStage1Valid={() => selectedRoom !== null}
                  nextStage={nextStage}
                />
              )}
              {stage === 2 && (
                <GuestInfoForm
                  initialData={guestInfo}
                  onBack={prevStage}
                  onSubmit={(data) => {
                    setGuestInfo(data);
                    nextStage();
                  }}
                />
              )}
              {stage === 3 && (
                <ExtraServices
                  initialServices={selectedServices}
                  availableServices={villa.detail.extraServices}
                  onBack={prevStage}
                  onSubmit={(services) => {
                    setSelectedServices(services);
                    nextStage();
                  }}
                />
              )}
              {stage === 4 && (
                <ReviewBooking
                  guestInfo={guestInfo}
                  onBack={prevStage}
                  onConfirm={nextStage}
                />
              )}
              {stage === 5 && (
                <PaymentStage
                  onComplete={() =>
                    confirmPayment(
                      villa,
                      roomDiscountedPrice,
                      roomTotal,
                      servicesTotal,
                      totalPrice,
                      !!activePromo,
                      discountPercent,
                      nextStage,
                    )
                  }
                />
              )}
              {stage === 6 && (
                <SuccessStage
                  bookingReference={bookingReference}
                  guestInfo={guestInfo}
                  villaName={villa.name}
                  onNext={nextStage}
                />
              )}
              {stage === 7 && (
                <ActiveBookingState
                  villaName={villa.name}
                  onCheckOut={handleCheckOut}
                />
              )}
              {stage === 8 && (
                <CheckOutState onReview={handleReview} onHome={handleHome} />
              )}

              <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                onSubmit={onSubmitReview}
                villaName={villa.name}
              />
            </div>

            {stage < 6 && (
              <BookingSummary
                villa={villa}
                selectedRoom={selectedRoom}
                selectedServices={selectedServices}
                roomTotal={roomTotal}
                totalPrice={totalPrice}
                discountInfo={
                  activePromo
                    ? {
                        percent: discountPercent,
                        savings: totalSavings,
                      }
                    : null
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
