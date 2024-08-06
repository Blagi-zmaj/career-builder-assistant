"use client";
import { createContext, useState } from "react";
import { userProfileData } from "../components/CVCreator/CVCreatorUtils/helpers";

export const NavAndDrawerContext = createContext({
  showNavAndDrawer: true,
  showButtons: false,
  toggleShowNavAndDrawer: () => {},
  toggleShowButtons: () => {},
});

// create context and import data

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

export const UserDataContext = createContext({
  updateCandidateSkills: () => {},
});

// create context provider for components with userdata
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(userProfileData);

  const updateCandidateSkills = (newSkills) => {
    console.log(newSkills);
    setUserData((prevState) => {
      return { ...prevState, skills: newSkills };
    });
  };

  return (
    <UserDataContext.Provider value={{ userData, updateCandidateSkills }}>
      {children}
    </UserDataContext.Provider>
  );
};
