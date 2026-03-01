import { useState, useEffect } from "react";

export const useBookingManager = (id, villaList, profileData) => {
  const [stage, setStage] = useState(() => (id ? 1 : 1));
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    name: profileData?.name || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    checkin: "",
    checkout: "",
    nights: 1,
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingReference, setBookingReference] = useState("");

  useEffect(() => {
    if (!id) {
      const bookings = JSON.parse(
        localStorage.getItem("booking_history") || "[]",
      );
      if (bookings.length > 0 && villaList && villaList.length > 0) {
        const activeBooking = bookings[bookings.length - 1];
        const found = villaList.find((v) => v.id === activeBooking.id);
        if (found) {
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
      if (found?.rooms?.length > 0) {
        setSelectedRoom(found.rooms[0]);
      }
      const bookings = JSON.parse(
        localStorage.getItem("booking_history") || "[]",
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

  useEffect(() => {
    if (stage >= 6) {
      localStorage.setItem("booking_stage_active", stage.toString());
    }
  }, [stage]);

  const confirmPayment = (
    villa,
    roomDiscountedPrice,
    roomTotal,
    servicesTotal,
    totalPrice,
    hasPromo,
    discountPercent,
    nextStage,
  ) => {
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
      localStorage.getItem("booking_history") || "[]",
    );
    const updatedBookings = existingBookings.filter((b) => b.id !== villa.id);
    updatedBookings.push(bookingData);
    localStorage.setItem("booking_history", JSON.stringify(updatedBookings));

    nextStage();
  };

  return {
    stage,
    setStage,
    selectedRoom,
    setSelectedRoom,
    guestInfo,
    setGuestInfo,
    selectedServices,
    setSelectedServices,
    bookingReference,
    setBookingReference,
    confirmPayment,
  };
};
