import styles from "./CVForm.module.css";
import Image from "next/image";
import frog from "../../../public/cv_creator.jpg";
import { useState, useEffect, useReducer, useContext } from "react";
import InputForm from "./InputForm/InputForm";
import Button from "@mui/material/Button";
import Modal from "./ModalDialog";
import * as React from "react";
import setIsEditingItem, {
  setIsEditingItemInSet,
  userContactData,
  userProfileData,
} from "./CVCreatorUtils/helpers";
import UserDetailsList from "./UserDetailsList";
import DatePicker from "./DatePicker";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import { NavAndDrawerContext } from "@/app/util/context";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import UserContactDataSection from "./UserContactSection/UserContactDataSection";
import HobbiesSection from "./HobbiesSection/HobbiesSection";
import SkillsAndLanguagesSection from "./SkillsAndLanguages/SkillsAndLanguagesSection";
import SummarySection from "./SummarySection/SummarySection";
import JobExperienceSection from "./JobExperienceSection/JobExperienceSection";
import EducationSection from "./EducationSection/EducationSection";

export default function CVForm() {
  const {
    showNavAndDrawer,
    toggleShowNavAndDrawer,
    toggleShowButtons,
    showButtons,
  } = useContext(NavAndDrawerContext);
  // console.log(`CV Form ${showButtons}`);
  const [inputValues, setInputValues] = useState(userContactData);
  const [hideAllButtons, setHideButtons] = useState(false);
  const [userProfileValues, setUserProfileValues] = useState(userProfileData);
  // console.log(`CV Form hideAllButtons: ${hideAllButtons}`);
  useEffect(() => {
    if (hideAllButtons) {
      window.print();
      toggleShowButtons();
      toggleShowNavAndDrawer();
    }
  }, [hideAllButtons, toggleShowButtons, toggleShowNavAndDrawer]);

  // console.log(
  //   `
  //   name ${inputValues.name}
  //   surname ${inputValues.surname}
  //   address ${inputValues.address}
  //   email ${inputValues.email}
  //   phone ${inputValues.phone}
  //   github ${inputValues.github}
  //   linkedin ${inputValues.linkedin}
  //   `
  // );
  // console.log(userProfileValues);
  // console.log(
  //   `
  //   ${inputValues.name} ${inputValues.surname}
  //   ${inputValues.address} ${inputValues.email} ${inputValues.phone}
  //    ${inputValues.github} ${inputValues.linkedin}
  //   `
  // );
  // console.log("==================Skills================");
  // userProfileValues.skills.forEach((el) => {
  //   console.log(`${el.name} ${el.level}`);
  // });
  // console.log("==================Languages================");
  // userProfileValues.languages.forEach((el) => {
  //   console.log(`${el.name} ${el.level}`);
  // });
  // console.log("==================Hobbies================");
  // userProfileValues.hobbies.forEach((el) => {
  //   console.log(`${el.name}`);
  // });
  // console.log("Summary: " + userProfileValues.summary.description);
  // console.log("==================Experience================");
  // userProfileValues.experience.map((element, index) => {
  //   const experienceEntries = Object.entries(element);
  //   experienceEntries.map((record) => {
  //     console.log(`${record[0]}: ${record[1].value}`);
  //   });
  // });

  // console.log("==================Education================");
  // userProfileValues.education.map((element, index) => {
  //   const experienceEntries = Object.entries(element);
  //   experienceEntries.map((record) => {
  //     console.log(`${record[0]}: ${record[1].value}`);
  //   });
  // });

  // console.log(
  //   userProfileValues.experience[0].startDate,
  //   userProfileValues.experience[0].endDate
  // );
  // console.log(userProfileValues.experience);
  // console.log(userProfileValues.education);
  // console.log(userProfileValues);
  // console.table(userProfileValues.skills);
  // console.table(userProfileValues.languages);
  // console.table(userProfileValues.hobbies);
  // console.log(
  //   userProfileValues.newSkill,
  //   userProfileValues.newLanguage,
  //   userProfileValues.newHobby
  // );
  // console.log(
  //   `=====================================================================`
  // );

  console.log("Render: CVForm");

  return (
    <div className={styles.form} id="form">
      <div className={(styles.section, styles.aside)}>
        <div className={(styles.section, styles.aboutDetails)}>
          <PhotoUpload />
          <UserContactDataSection />
          <SkillsAndLanguagesSection />
          <HobbiesSection />
        </div>
      </div>
      <SummarySection />
      <JobExperienceSection />
      <EducationSection />
    </div>
  );
}
