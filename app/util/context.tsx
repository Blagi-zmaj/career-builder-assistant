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
  userLoggingData: { login: "", password: "" },
  updateUserLoggingData: (userData: { login: string; password: string }) => {},
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
    console.log(userLogData);
    setUserLoggingData(userLogData);
    console.log(userLogData);
  };

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

  console.log(userLoggingData);

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
