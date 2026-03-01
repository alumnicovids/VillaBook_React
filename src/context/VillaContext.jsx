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

  const profileData = {
    name: "Asmara Kusuma",
    bio: "Junior Traveler",
    email: "iasmarakusuma@gmail.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Merdeka No. 123, Jakarta",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  return {
    villaList,
    wishlist,
    toggleWishlist,
    toast,
    showToast,
    clearWishlist,
    profileData,
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
