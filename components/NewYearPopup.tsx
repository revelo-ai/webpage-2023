"use client";

import Image from "next/image";
import React from "react";
import NYCard from "@images/revelo-christmas-2023.webp";

export function useLocalStorage(key: string) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem(key) === null) {
      setTimeout(() => {
        setShow(true);
      }, 3000);
    }
  }, [key]);

  const markAsShown = React.useCallback(() => {
    setShow(false);
    localStorage.setItem(key, "true");
  }, [key]);

  return { show, markAsShown };
}

const NewYearPopup = () => {
  const { show, markAsShown } = useLocalStorage("NYCard2024");

  return (
    <div className={`overlay ${show ? "" : "hidden-overlay"} `}>
      <div className="popup">
        <Image {...NYCard} alt="" />

        <span onClick={() => markAsShown()} className="close">
          &times;
        </span>
      </div>
    </div>
  );
};

export default NewYearPopup;
