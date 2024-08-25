import styles from "./CVForm.module.css";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import { userContactData, userProfileData } from "./CVCreatorUtils/helpers";
import { NavAndDrawerContext } from "@/app/util/context";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import UserContactDataSection from "./UserContactSection/UserContactDataSection";
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
    showPhoto,
    toggleShowPhoto,
  } = useContext(NavAndDrawerContext);
  const [inputValues, setInputValues] = useState(userContactData);
  const [hideAllButtons, setHideButtons] = useState(false);
  const [userProfileValues, setUserProfileValues] = useState(userProfileData);
  useEffect(() => {
    if (hideAllButtons) {
      window.print();
      toggleShowButtons();
      toggleShowNavAndDrawer();
    }
  }, [hideAllButtons, toggleShowButtons, toggleShowNavAndDrawer]);

  return (
    <div className={styles.form} id="form">
      <div className={(styles.section, styles.aside)}>
        <div className={(styles.section, styles.aboutDetails)}>
          {showPhoto && <PhotoUpload />}
          {!showPhoto && (
            <button onClick={toggleShowPhoto} className={styles.addPhotoBtn}>
              Add photo
            </button>
          )}
          <UserContactDataSection />
          <SkillsAndLanguagesSection />
        </div>
      </div>
      <SummarySection />
      <JobExperienceSection />
      <EducationSection />
    </div>
  );
}
