"use client";
import { createContext, useState } from "react";

export const NavAndDrawerContext = createContext({
  showNavAndDrawer: true,
  showButtons: false,
  toggleShowNavAndDrawer: () => {},
  toggleShowButtons: () => {},
});

export const NavAndDrawerProvider = ({ children }) => {
  const [showNavAndDrawer, setNavAndDrawer] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const toggleShowNavAndDrawer = () => {
    setNavAndDrawer((prev) => !prev);
  };

  const toggleShowButtons = () => {
    console.log(`toggleShowButtons`);
    console.log(showButtons);
    setShowButtons((prev) => !prev);
  };

  return (
    <NavAndDrawerContext.Provider
      value={{
        showNavAndDrawer,
        toggleShowNavAndDrawer,
        toggleShowButtons,
        showButtons,
      }}
    >
      {children}
    </NavAndDrawerContext.Provider>
  );
};
