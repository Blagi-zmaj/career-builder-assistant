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
  userLoggingData: { login: "", password: "", isLogged: "" },
  updateUserLoggingData: (userData: {
    login: string;
    password: string;
    isLogged: string;
  }) => {},
});

export const NavAndDrawerProvider = ({ children }) => {
  const [showNavAndDrawer, setNavAndDrawer] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showPhoto, setShowPhoto] = useState(true);
  const [userLoggingData, setUserLoggingData] = useState({
    login: "",
    password: "",
    isLogged: "",
  });

  const updateUserLoggingData = (userLogData) => {
    setUserLoggingData(userLogData);
  };

  const toggleShowNavAndDrawer = () => {
    setNavAndDrawer((prev) => !prev);
  };

  const toggleShowButtons = () => {
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
        userLoggingData,
        updateUserLoggingData,
      }}
    >
      {children}
    </NavAndDrawerContext.Provider>
  );
};

export const UserDataContext = createContext({
  updateCandidateSkills: () => {},
});

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(userProfileData);

  const updateCandidateSkills = (newSkills) => {
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
