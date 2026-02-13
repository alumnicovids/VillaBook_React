import { useEffect, useState } from "react";
import { fetchVilla } from "@/api/VillaGecko";

export const useVilla = () => {
  const [villaList, setVillaList] = useState([]);
  const [whislist, setWhislist] = useState([]);

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

  const addToWhistlist = () => {};

  return { villaList };
};
