import styles from "./CVForm.module.css";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import { NavAndDrawerContext } from "@/app/util/context";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import UserContactDataSection from "./UserContactSection/UserContactDataSection";
import MeasureAttribute from "./MeasureAttributes/MeasureAttribute";
import SummarySection from "./SummarySection/SummarySection";
import JobExperienceSection from "./JobExperienceSection/JobExperienceSection";
import EducationSection from "./EducationSection/EducationSection";

export default function CVForm() {
  const {
    toggleShowNavAndDrawer,
    toggleShowButtons,

    showPhoto,
    toggleShowPhoto,
  } = useContext(NavAndDrawerContext);
  const [hideAllButtons, setHideButtons] = useState(false);
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
          <MeasureAttribute />
        </div>
      </div>
      <SummarySection />
      <JobExperienceSection />
      <EducationSection />
    </div>
  );
}
