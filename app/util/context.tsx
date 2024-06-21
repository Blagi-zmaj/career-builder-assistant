"use client";
import { createContext, useState } from "react";

// export const ThemeContext = createContext({
//   theme: "light",
//   toggleTheme: () => {},
// });

// export const ThemeProvider = ({
//   children,
// }: Readonly<{ children: React.ReactNode }>) => {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "black" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

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
