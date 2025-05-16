import { createContext, useContext, useState } from "react";

export const CartContext = createContext([[], function () {}]);

//buat translate

const LangContext = createContext();

const translations = {
  id: {
    order: "Buat Order",
    type: "Jenis Pizza",
    size: "Ukuran Pizza",
    addToCart: "Tambahkan ke keranjang",
    chefChoice: "Pizza pilihan chef hari ini",
    cart: "Keranjang",
    bill: "Total Tagihan",
    start: "Dimulai dari harga",
    home: "Pizza terbaik se-Jakarta barat",
  },
  en: {
    order: "Make Order",
    type: "Pizza Type",
    size: "Pizza Size",
    addToCart: "Add to cart",
    chefChoice: "Chef's special pizza today",
    cart: "Cart",
    bill: "Total Bill",
    start: "Start from",
    home: "The Best Pizza in West Jakarta",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("id");

  const t = (key) => translations[lang][key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLanguage = () => useContext(LangContext);
