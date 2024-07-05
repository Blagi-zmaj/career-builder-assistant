"use client";
import { createContext, useState } from "react";

export const NavAndDrawerContext = createContext({
  showNavAndDrawer: true,
  toggleShowNavAndDrawer: () => {},
});

export const NavAndDrawerProvider = ({ children }) => {
  const [showNavAndDrawer, setNavAndDrawer] = useState(false);

  const toggleShowNavAndDrawer = () => {
    setNavAndDrawer((prev) => !prev);
  };
  return (
    <NavAndDrawerContext.Provider
      value={{ showNavAndDrawer, toggleShowNavAndDrawer }}
    >
      {children}
    </NavAndDrawerContext.Provider>
  );
};
