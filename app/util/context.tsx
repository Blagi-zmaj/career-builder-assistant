"use client";
import { createContext, useState } from "react";
import { userProfileData } from "../components/CVCreator/CVCreatorUtils/helpers";

export const NavAndDrawerContext = createContext({
  showNavAndDrawer: true,
  showButtons: false,
  toggleShowNavAndDrawer: () => {},
  toggleShowButtons: () => {},
  showPhoto: true,
  toggleShowPhoto: () => {},
});

export const NavAndDrawerProvider = ({ children }) => {
  const [showNavAndDrawer, setNavAndDrawer] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showPhoto, setShowPhoto] = useState(true);

  const toggleShowNavAndDrawer = () => {
    setNavAndDrawer((prev) => !prev);
  };

  const toggleShowButtons = () => {
    console.log(`toggleShowButtons`);
    console.log(showButtons);
    setShowButtons((prev) => !prev);
  };

  const toggleShowPhoto = () => {
    setShowPhoto((prev) => !prev);
  };

  return (
    <NavAndDrawerContext.Provider
      value={{
        showNavAndDrawer,
        toggleShowNavAndDrawer,
        toggleShowButtons,
        showButtons,
        showPhoto,
        toggleShowPhoto,
      }}
    >
      {children}
    </NavAndDrawerContext.Provider>
  );
};

///////////////////////////////////////////////////////////////////////////

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
