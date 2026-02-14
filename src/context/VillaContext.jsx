import { createContext, useContext, useEffect, useState } from "react";
import { fetchVilla } from "@/api/VillaGecko";

const VillaContext = createContext();

// VillaContext.jsx
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

  return { villaList, wishlist, toggleWishlist, toast };
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
