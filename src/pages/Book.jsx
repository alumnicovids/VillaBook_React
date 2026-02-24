import { Background } from "@/components/Background";
import { useParams, useNavigate } from "react-router";
import { useVilla } from "@/context/VillaContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { formatPrice } from "@/utils/Formatter";
import {
  MdLocationOn,
  MdArrowBack,
  MdArrowForward,
  MdSearch,
} from "react-icons/md";

// Helper function to format dates for display
const formatDateDisplay = (dateString, format = "long") => {
  if (!dateString) return "";
  const options =
    format === "long"
      ? { weekday: "long", month: "long", day: "numeric", year: "numeric" }
      : { weekday: "short", month: "short", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { villaList, profileData } = useVilla();
  const [villa, setVilla] = useState(null);
  const [stage, setStage] = useState(() => {
    // Only load stage from localStorage if there's a villa ID (route /book/:id)
    if (id) {
      return 1; // Always start at stage 1 for /book/:id
    }
    // For /book route without ID, stage will be set when villa data is loaded
    return 1;
  });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingReference, setBookingReference] = useState(null);
  const [guestInfo, setGuestInfo] = useState(() => ({
    name: profileData?.name || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    checkin: "",
    checkout: "",
    nights: 1,
  }));

  // Save stage to localStorage whenever it changes
  useEffect(() => {
    if (!villa) return; // Only save when villa is loaded

    if (id) {
      // For /book/:id route
      localStorage.setItem(`booking_stage_${id}`, stage.toString());
    } else {
      // For /book route without ID, save to active booking stage
      localStorage.setItem("booking_stage_active", stage.toString());
    }
  }, [stage, id, villa]);

  useEffect(() => {
    if (!id) {
      const bookings = JSON.parse(
        localStorage.getItem("villa_bookings") || "[]",
      );

      if (bookings.length > 0 && villaList && villaList.length > 0) {
        const activeBooking = bookings[bookings.length - 1];
        const found = villaList.find((v) => v.id === activeBooking.id);

        if (found) {
          setVilla(found);
          setSelectedRoom(
            found.rooms.find((r) => r.type === activeBooking.roomType) ||
              found.rooms[0],
          );
          setGuestInfo(activeBooking.guestInfo);
          setSelectedServices(
            activeBooking.selectedServices.map((service) =>
              found.detail.extraServices.findIndex(
                (s) => s.type === service.type,
              ),
            ),
          );
          setBookingReference(activeBooking.bookingReference);
          const savedStage = localStorage.getItem("booking_stage_active");
          setStage(savedStage ? parseInt(savedStage) : 6);
        } else {
          setGuestInfo({
            name: profileData?.name || "",
            email: profileData?.email || "",
            phone: profileData?.phone || "",
            checkin: "",
            checkout: "",
            nights: 1,
          });
        }
      } else {
        setGuestInfo({
          name: profileData?.name || "",
          email: profileData?.email || "",
          phone: profileData?.phone || "",
          checkin: "",
          checkout: "",
          nights: 1,
        });
      }
    } else if (villaList && villaList.length > 0 && id) {
      const found = villaList.find((v) => v.id.toString() === id);
      setVilla(found);
      if (found?.rooms?.length > 0) {
        setSelectedRoom(found.rooms[0]);
      }

      const bookings = JSON.parse(
        localStorage.getItem("villa_bookings") || "[]",
      );
      const activeBooking = bookings.find(
        (b) => b.id.toString() === id.toString(),
      );

      if (activeBooking) {
        setSelectedRoom(
          found.rooms.find((r) => r.type === activeBooking.roomType) ||
            found.rooms[0],
        );
        setGuestInfo(activeBooking.guestInfo);
        setSelectedServices(
          activeBooking.selectedServices.map((service) =>
            found.detail.extraServices.findIndex(
              (s) => s.type === service.type,
            ),
          ),
        );
        setBookingReference(activeBooking.bookingReference);
      } else {
        setGuestInfo({
          name: profileData?.name || "",
          email: profileData?.email || "",
          phone: profileData?.phone || "",
          checkin: "",
          checkout: "",
          nights: 1,
        });
      }
    }
  }, [id, villaList, profileData]);

  if (!villa || (!id && stage < 6)) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Background />

        <div className="container mx-auto px-4 mt-32 relative z-10 flex items-center justify-center min-h-[70vh]">
          <div className="text-center md:text-left max-w-2xl">
            <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
              Start Your Journey
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight mb-6">
              {id ? "Villa Not Found" : "Find Your Perfect Villa"}
            </h2>
            <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50 mb-6" />
            <p className="text-muted-foreground text-lg">
              {id
                ? "The villa you're looking for doesn't exist or has been removed. Please browse our collection from the home page."
                : "Select a villa from our collection to start your booking journey."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={() => navigate("/")}
                background="primary"
                className="flex items-center justify-center gap-2"
              >
                <MdArrowBack /> Back to Home
              </Button>
              <Button
                onClick={() => navigate("/discover")}
                background="muted"
                className="flex items-center justify-center gap-2"
              >
                <span>
                  <MdSearch size={20} />
                </span>
                Browse Villas
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Promo logic
  const hasPromo =
    villa.promo && villa.promo.status === "active" && villa.promo.disc;
  const discountPercent = hasPromo
    ? parseFloat(String(villa.promo.disc).replace("%", "")) || 0
    : 0;

  // Helper function to calculate discounted price
  const calculateDiscountedPrice = (price) =>
    hasPromo ? Math.round(price * (1 - discountPercent / 100)) : price;

  const roomDiscountedPrice = selectedRoom
    ? calculateDiscountedPrice(selectedRoom.price)
    : 0;

  const roomTotal = roomDiscountedPrice * guestInfo.nights;
  const servicesTotal = selectedServices.reduce((sum, serviceId) => {
    const service = villa.detail.extraServices.find(
      (s, idx) => idx === serviceId,
    );
    return sum + (service?.price || 0);
  }, 0);
  const totalPrice = roomTotal + servicesTotal;

  const nextStage = () => setStage((prev) => Math.min(prev + 1, 8));
  const prevStage = () => setStage((prev) => Math.max(prev - 1, 1));

  // Validation functions for each stage
  const isStage1Valid = () => !!selectedRoom;

  const isStage2Valid = () => {
    // Check if all required fields are filled
    if (
      !guestInfo.name.trim() ||
      !guestInfo.email.trim() ||
      !guestInfo.phone.trim() ||
      !guestInfo.checkin ||
      !guestInfo.checkout
    ) {
      return false;
    }

    // Check if checkout date is after checkin date
    const checkinDate = new Date(guestInfo.checkin);
    const checkoutDate = new Date(guestInfo.checkout);

    return checkoutDate > checkinDate;
  };

  const handleConfirmPayment = () => {
    const ref = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setBookingReference(ref);

    const bookingData = {
      id: villa.id,
      villaName: villa.name,
      villaImage: villa.image[0],
      roomType: selectedRoom.type,
      guestInfo: guestInfo,
      selectedServices: selectedServices.map(
        (serviceId) => villa.detail.extraServices[serviceId],
      ),
      pricing: {
        roomPrice: roomDiscountedPrice,
        originalRoomPrice: selectedRoom.price,
        nights: guestInfo.nights,
        roomTotal: roomTotal,
        servicesTotal: servicesTotal,
        totalPrice: totalPrice,
        hasPromo: hasPromo,
        discountPercent: discountPercent,
      },
      bookingReference: ref,
      bookingDate: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("villa_bookings") || "[]",
    );
    const updatedBookings = existingBookings.filter((b) => b.id !== villa.id);

    updatedBookings.push(bookingData);

    localStorage.setItem("villa_bookings", JSON.stringify(updatedBookings));

    nextStage();
  };

  const toggleService = (index) => {
    setSelectedServices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo((prev) => ({ ...prev, [name]: value }));
    if (name === "checkin" || name === "checkout") {
      const checkin = new Date(name === "checkin" ? value : guestInfo.checkin);
      const checkout = new Date(
        name === "checkout" ? value : guestInfo.checkout,
      );
      if (checkin && checkout && checkout > checkin) {
        const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
        setGuestInfo((prev) => ({ ...prev, nights }));
      }
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="max-w-6xl mx-auto px-6 py-4 mt-32 relative z-10 pb-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate(`/detail/${villa.id}`)}
            className="flex items-center gap-2 text-accent hover:text-primary transition-colors mb-6"
          >
            <MdArrowBack /> Back to Details
          </button>
          <h1 className="text-5xl font-serif font-bold text-primary mb-2">
            {villa.name}
          </h1>
          <p className="flex items-center gap-2 text-lg text-muted-foreground">
            <MdLocationOn /> {villa.location}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex gap-2 items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= stage
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 8 && (
                  <div
                    className={`flex-1 h-1 w-24 ${
                      s < stage ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex text-xs text-muted-foreground">
            <span className="ml-1">Room</span>
            <span className="ml-30">Guest</span>
            <span className="ml-28">Services</span>
            <span className="ml-27">Payment</span>
            <span className="ml-27">Review</span>
            <span className="ml-27">Confirm</span>
            <span className="ml-27">Check-in</span>
            <span className="ml-23.5">Check-out</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Stage 1: Room Selection */}
            {stage === 1 && (
              <div className="glass border border-border p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  Select Room Type
                </h2>
                <div className="space-y-4 mb-8">
                  {villa.rooms.map((room, index) => {
                    const roomPrice = calculateDiscountedPrice(room.price);
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-6 border rounded-lg cursor-pointer transition-all ${
                          selectedRoom === room
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{room.type}</h3>
                          <div className="text-right">
                            {hasPromo ? (
                              <div>
                                <p className="font-bold text-primary">
                                  {formatPrice(roomPrice)}
                                </p>
                                <p className="text-sm text-muted-foreground line-through">
                                  {formatPrice(room.price)}
                                </p>
                              </div>
                            ) : (
                              <p className="font-bold text-primary">
                                {formatPrice(room.price)}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">/ night</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={nextStage}
                    background="primary"
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isStage1Valid()}
                  >
                    Continue <MdArrowForward />
                  </Button>
                </div>
              </div>
            )}

            {/* Stage 2: Guest Information */}
            {stage === 2 && (
              <div className="glass border border-border p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-2 text-primary">
                  Guest Information
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Your information is pre-filled from your account. Feel free to
                  edit if needed.
                </p>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={guestInfo.name}
                      onChange={handleGuestInfoChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={guestInfo.email}
                      onChange={handleGuestInfoChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={guestInfo.phone}
                      onChange={handleGuestInfoChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="+62..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        name="checkin"
                        value={guestInfo.checkin}
                        onChange={handleGuestInfoChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        name="checkout"
                        value={guestInfo.checkout}
                        onChange={handleGuestInfoChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Number of Nights:{" "}
                      <span className="font-bold text-primary">
                        {guestInfo.nights}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={prevStage}
                    className="w-full"
                    background="muted"
                  >
                    <MdArrowBack /> Back
                  </Button>
                  <Button
                    onClick={nextStage}
                    background="primary"
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isStage2Valid()}
                  >
                    Continue <MdArrowForward />
                  </Button>
                </div>
              </div>
            )}

            {/* Stage 3: Extra Services */}
            {stage === 3 && (
              <div className="glass border border-border p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  Add Extra Services
                </h2>
                <div className="space-y-3 mb-8">
                  {villa.detail.extraServices.map((service, index) => (
                    <div
                      key={index}
                      onClick={() => toggleService(index)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                        selectedServices.includes(index)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div>
                        <h3 className="font-bold">{service.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(service.price)}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(index)}
                        readOnly
                        className="w-5 h-5"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={prevStage}
                    className="w-full"
                    background="muted"
                  >
                    <MdArrowBack /> Back
                  </Button>
                  <Button
                    onClick={nextStage}
                    background="primary"
                    className="w-full"
                  >
                    Continue <MdArrowForward />
                  </Button>
                </div>
              </div>
            )}

            {/* Stage 4: Payment */}
            {stage === 4 && (
              <div className="glass border border-border p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  Payment Method
                </h2>
                <div className="space-y-3 mb-8">
                  <div className="p-4 border border-primary bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary" />
                      <div>
                        <h3 className="font-bold">Bank Transfer</h3>
                        <p className="text-sm text-muted-foreground">
                          Transfer to provided bank account
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-muted" />
                      <div>
                        <h3 className="font-bold">Credit Card</h3>
                        <p className="text-sm text-muted-foreground">
                          Coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={prevStage}
                    className="w-full"
                    background="muted"
                  >
                    <MdArrowBack /> Back
                  </Button>
                  <Button
                    onClick={handleConfirmPayment}
                    background="primary"
                    className="w-full"
                  >
                    Confirm <MdArrowForward />
                  </Button>
                </div>
              </div>
            )}

            {/* Stage 5: Check-in and Check-out Details */}
            {stage === 5 && (
              <div className="glass border border-border p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  Confirm Your Stay Details
                </h2>
                <p className="text-muted-foreground mb-8">
                  Please review your check-in and check-out information below.
                </p>

                {/* Check-in Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-primary mb-4">
                      Check-in
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase mb-1">
                          Date
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatDateDisplay(guestInfo.checkin)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase mb-1">
                          Time
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {villa.detail.checkInTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Check-out Section */}
                  <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-accent mb-4">
                      Check-out
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase mb-1">
                          Date
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatDateDisplay(guestInfo.checkout)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase mb-1">
                          Time
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {villa.detail.checkOutTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stay Duration */}
                <div className="bg-surface/30 p-6 rounded-lg mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-bold uppercase">
                        Total Duration
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {guestInfo.nights}{" "}
                        {guestInfo.nights === 1 ? "Night" : "Nights"}
                      </p>
                    </div>
                    <div className="text-4xl text-accent">🏨</div>
                  </div>
                </div>

                {/* Guest Information Summary */}
                <div className="bg-muted/20 p-6 rounded-lg mb-8">
                  <h3 className="font-bold text-primary mb-4">
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground font-bold uppercase mb-1">
                        Name
                      </p>
                      <p className="font-bold">{guestInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground font-bold uppercase mb-1">
                        Email
                      </p>
                      <p className="font-bold">{guestInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground font-bold uppercase mb-1">
                        Phone
                      </p>
                      <p className="font-bold">{guestInfo.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={prevStage}
                    className="w-full"
                    background="muted"
                  >
                    <MdArrowBack /> Back
                  </Button>
                  <Button
                    onClick={nextStage}
                    background="primary"
                    className="w-full"
                  >
                    Confirm & Complete <MdArrowForward />
                  </Button>
                </div>
              </div>
            )}

            {/* Stage 6: Confirmation */}
            {stage === 6 && (
              <div className="glass border border-border p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-4 text-accent">
                  Booking Confirmed! ✓
                </h2>
                <p className="text-muted-foreground mb-8">
                  Your booking has been successfully created. Confirmation email
                  has been sent to {guestInfo.email}
                </p>

                {/* Booking Reference */}
                <div className="bg-accent/10 p-6 rounded-lg mb-8">
                  <p className="text-sm text-muted-foreground mb-2">
                    Booking Reference
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {bookingReference}
                  </p>
                </div>

                {/* Check-in and Check-out Info */}
                <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mb-8 space-y-4">
                  <h3 className="font-bold text-primary mb-4">
                    Your Stay Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase mb-2">
                        Check-in
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {formatDateDisplay(guestInfo.checkin, "short")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {villa.detail.checkInTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase mb-2">
                        Check-out
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {formatDateDisplay(guestInfo.checkout, "short")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {villa.detail.checkOutTime}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      Total Stay:{" "}
                      <span className="font-bold text-primary">
                        {guestInfo.nights} nights
                      </span>
                    </p>
                  </div>
                </div>

                {/* Guest Information */}
                <div className="bg-surface/30 p-6 rounded-lg mb-8">
                  <h3 className="font-bold text-primary mb-4">
                    Guest Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Name:</span>{" "}
                      <span className="font-bold">{guestInfo.name}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <span className="font-bold">{guestInfo.email}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      <span className="font-bold">{guestInfo.phone}</span>
                    </p>
                  </div>
                </div>

                <Button
                  onClick={nextStage}
                  background="primary"
                  className="w-full"
                >
                  Check In <MdArrowForward />
                </Button>
              </div>
            )}

            {/* Stage 7: Check-in Experience */}
            {stage === 7 && (
              <div className="glass border border-border p-8 rounded-xl text-center">
                <div className="text-7xl mb-6 animate-bounce">🔑</div>
                <h2 className="text-4xl font-serif font-bold mb-4 text-primary">
                  Welcome to {villa.name}!
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Your stay has begun. Enjoy your time at our luxury villa.
                </p>

                <div className="bg-primary/10 border border-primary/20 p-8 rounded-lg mb-8">
                  <p className="text-sm text-muted-foreground font-bold uppercase mb-2">
                    Check-in Date & Time
                  </p>
                  <p className="text-3xl font-bold text-primary mb-4">
                    {formatDateDisplay(guestInfo.checkin)}
                  </p>
                  <p className="text-xl text-foreground">
                    {villa.detail.checkInTime}
                  </p>
                </div>

                <div className="bg-surface/30 p-6 rounded-lg mb-8 space-y-2 text-left">
                  <h3 className="font-bold text-primary mb-4">
                    Your Stay Information
                  </h3>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Room:</span>{" "}
                    <span className="font-bold">{selectedRoom.type}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Guest:</span>{" "}
                    <span className="font-bold">{guestInfo.name}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Duration:</span>{" "}
                    <span className="font-bold">
                      {guestInfo.nights}{" "}
                      {guestInfo.nights === 1 ? "Night" : "Nights"}
                    </span>
                  </p>
                </div>

                <p className="text-muted-foreground mb-8 text-sm">
                  If you need any assistance, our support team is available
                  24/7.
                </p>

                <Button
                  onClick={nextStage}
                  background="primary"
                  className="w-full"
                >
                  Check Out <MdArrowForward />
                </Button>
              </div>
            )}

            {/* Stage 8: Check-out Experience */}
            {stage === 8 && (
              <div className="glass border border-border p-8 rounded-xl text-center">
                <div className="text-7xl mb-6">👋</div>
                <h2 className="text-4xl font-serif font-bold mb-2 text-primary">
                  Thank You for Choosing {villa.name}!
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  We hope you had an amazing stay with us.
                </p>

                <div className="bg-accent/10 border border-accent/20 p-8 rounded-lg mb-8">
                  <p className="text-sm text-muted-foreground font-bold uppercase mb-2">
                    Check-out Date & Time
                  </p>
                  <p className="text-3xl font-bold text-accent mb-4">
                    {formatDateDisplay(guestInfo.checkout)}
                  </p>
                  <p className="text-xl text-foreground">
                    {villa.detail.checkOutTime}
                  </p>
                </div>

                <div className="bg-surface/30 p-6 rounded-lg mb-8">
                  <h3 className="font-bold text-primary mb-4">
                    Your Booking Summary
                  </h3>
                  <div className="space-y-2 text-left text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Booking Reference:
                      </span>
                      <span className="font-bold">{bookingReference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Amount Paid:
                      </span>
                      <span className="font-bold text-primary">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Stay Duration:
                      </span>
                      <span className="font-bold">
                        {guestInfo.nights}{" "}
                        {guestInfo.nights === 1 ? "Night" : "Nights"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 text-sm">
                  A confirmation email has been sent to {guestInfo.email}. Your
                  booking has been saved to your history.
                </p>

                <Button
                  onClick={() => {
                    // 1. Handle localStorage: Move current booking to history
                    const bookings = JSON.parse(
                      localStorage.getItem("villa_bookings") || "[]",
                    );
                    const history = JSON.parse(
                      localStorage.getItem("booking_history") || "[]",
                    );

                    const updatedBookings = bookings.filter(
                      (b) => b.bookingReference !== bookingReference,
                    );
                    const completedBooking = bookings.find(
                      (b) => b.bookingReference === bookingReference,
                    );

                    if (completedBooking) {
                      history.push({
                        ...completedBooking,
                        completedDate: new Date().toISOString(),
                        status: "completed",
                      });
                      localStorage.setItem(
                        "booking_history",
                        JSON.stringify(history),
                      );
                    }

                    localStorage.setItem(
                      "villa_bookings",
                      JSON.stringify(updatedBookings),
                    );

                    // 2. Clear stage-related tracking
                    localStorage.removeItem("booking_stage_active");
                    if (id) {
                      localStorage.removeItem(`booking_stage_${id}`);
                    }

                    // 3. Reset ALL component states to initial values
                    setVilla(null);
                    setStage(1);
                    setSelectedRoom(null);
                    setSelectedServices([]);
                    setBookingReference(null);

                    // Force reset guest info including dates
                    const defaultGuestInfo = {
                      name: profileData?.name || "",
                      email: profileData?.email || "",
                      phone: profileData?.phone || "",
                      checkin: "",
                      checkout: "",
                      nights: 1,
                    };
                    setGuestInfo(defaultGuestInfo);

                    // 4. Navigate home
                    navigate("/");
                  }}
                  background="primary"
                  className="w-full"
                >
                  Back to Home
                </Button>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass border border-border p-6 rounded-xl sticky top-24">
              <h3 className="text-lg font-bold mb-6 text-primary">
                Booking Summary
              </h3>

              {/* Villa Info */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex gap-3 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={villa.image[0]}
                      alt={villa.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-accent font-bold uppercase">
                      {villa.tag}
                    </p>
                    <p className="font-bold text-sm">{villa.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-xs text-muted-foreground">
                        {villa.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Details */}
              {selectedRoom && (
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                    Room Selected
                  </p>
                  <p className="font-bold mb-2">{selectedRoom.type}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {formatPrice(
                        hasPromo
                          ? Math.round(
                              selectedRoom.price * (1 - discountPercent / 100),
                            )
                          : selectedRoom.price,
                      )}{" "}
                      × {guestInfo.nights} nights
                    </span>
                    <span className="font-bold">{formatPrice(roomTotal)}</span>
                  </div>
                  {hasPromo && (
                    <div className="flex justify-between text-sm text-green-500 mb-2">
                      <span>Discount ({villa.promo.disc})</span>
                      <span>
                        -
                        {formatPrice(
                          selectedRoom.price * guestInfo.nights -
                            roomDiscountedPrice * guestInfo.nights,
                        )}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Services */}
              {selectedServices.length > 0 && (
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                    Extra Services
                  </p>
                  <div className="space-y-2">
                    {selectedServices.map((serviceId) => {
                      const service = villa.detail.extraServices[serviceId];
                      return (
                        <div
                          key={serviceId}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {service.type}
                          </span>
                          <span className="font-bold">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="pt-6 border-t border-border">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      inclusive of taxes
                    </p>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-accent/10 p-3 rounded-lg">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                    Cancellation Policy
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {villa.detail.cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
