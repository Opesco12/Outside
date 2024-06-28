import React, { useState, createContext, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("appData");
      if (storedData !== null) {
        setFavorites(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading Data: ", error);
    }
  };

  const saveData = async (data) => {
    if (favorites.includes(data)) {
      const newFavorites = favorites.filter(
        (listing, index) => listing !== data
      );
      setFavorites(newFavorites);
      await AsyncStorage.setItem("appData", JSON.stringify(newFavorites));
    } else {
      try {
        await setFavorites((prev) => [...prev, data]);

        await AsyncStorage.setItem("appData", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving data: ", error);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ saveData, favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
export { FavoritesContext };
