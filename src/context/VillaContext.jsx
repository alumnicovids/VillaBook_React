import { createContext, useContext, useEffect, useState } from "react";
import { fetchVilla } from "@/services/VillaService";

const VillaContext = createContext();

const useVillaLogic = () => {
  const [villaList, setVillaList] = useState([]);
  const [toast, setToast] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("villa_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("villa_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    fetchVillasData();
  }, []);

  const fetchVillasData = async () => {
    try {
      const data = await fetchVilla();
      setVillaList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleWishlist = (villa) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === villa.id);
      if (isExist) {
        showToast(`${villa.name} removed`, "error");
        return prev.filter((item) => item.id !== villa.id);
      } else {
        showToast(`${villa.name} added to wishlist`, "success");
        return [...prev, villa];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast("Wishlist cleared", "error");
  };

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("villa_profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Profile Name",
          bio: "Profile Bio",
          email: "ProfileEmail@gmail.com",
          phone: "+62 000 0000 0000",
          address: "Profile Address",
          avatar: "Blank_Profile.jpg",
        };
  });

  useEffect(() => {
    localStorage.setItem("villa_profile", JSON.stringify(profileData));
  }, [profileData]);

  const updateProfile = (newData) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
    showToast("Profile updated successfully", "success");
  };

  const [paymentMethods, setPaymentMethods] = useState(() => {
    const saved = localStorage.getItem("villa_payments");
    return saved ? JSON.parse(saved) : [
      { id: 1, type: "visa", last4: "4242", expiry: "12/26", isDefault: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem("villa_payments", JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const addPaymentMethod = (card) => {
    const newCard = {
      ...card,
      id: Date.now(),
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods((prev) => [...prev, newCard]);
    showToast("Payment method added", "success");
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods((prev) => {
      const filtered = prev.filter((card) => card.id !== id);
      if (filtered.length > 0 && prev.find(c => c.id === id)?.isDefault) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
    showToast("Payment method removed", "error");
  };

  const setDefaultPaymentMethod = (id) => {
    setPaymentMethods((prev) => 
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
    showToast("Default payment method updated", "success");
  };

  return {
    villaList,
    wishlist,
    toggleWishlist,
    toast,
    showToast,
    clearWishlist,
    profileData,
    updateProfile,
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
  };
};

export const VillaProvider = ({ children }) => {
  const logic = useVillaLogic();
  return (
    <VillaContext.Provider value={logic}>{children}</VillaContext.Provider>
  );
};

export const useVilla = () => {
  return useContext(VillaContext);
};
