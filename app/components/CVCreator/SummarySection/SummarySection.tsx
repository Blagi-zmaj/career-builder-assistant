import InputForm from "../InputForm/InputForm";
import styles from "./SummarySection.module.css";
import { useState, useContext, ChangeEvent } from "react";
import { NavAndDrawerContext } from "@/app/util/context";
import { userProfileData } from "../CVCreatorUtils/helpers";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
type Skill = {
  name: string;
  level: number;
  isEditing: boolean;
};

type Language = {
  name: string;
  level: number;
  isEditing: boolean;
};

type Hobby = {
  name: string;
  isEditing: boolean;
};

type Summary = {
  description: string;
  isEditing: boolean;
};

type Education = {
  institution: { value: string; isEditing: boolean };
  position: { value: string; isEditing: boolean };
  startDate: { value: string; isEditing: boolean };
  endDate: { value: string; isEditing: boolean };
  description: {
    value: string;
    isEditing: boolean;
  };
};

type Experience = {
  institution: { value: string; isEditing: boolean };
  position: { value: string; isEditing: boolean };
  startDate: { value: string; isEditing: boolean };
  endDate: { value: string; isEditing: boolean };
  description: {
    value: string;
    isEditing: boolean;
  };
};

type UserProfile = {
  newSkill: Skill;
  newLanguage: Language;
  newHobby: Hobby;
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
  summary: Summary;
  education: Education[];
  experience: Experience[];
};

export default function SummarySection() {
  // return <h1>Summary SECTION Component</h1>;
  const {
    showNavAndDrawer,
    toggleShowNavAndDrawer,
    toggleShowButtons,
    showButtons,
  } = useContext(NavAndDrawerContext);
  const [userContact, setUserContact] = useState<UserProfile>(userProfileData);
  const [hideAllButtons, setHideButtons] = useState(showButtons);

  const handleSummaryEditingStatus = function () {
    setUserContact((prevValues) => {
      return {
        ...prevValues,
        summary: {
          ...prevValues.summary,
          isEditing: !prevValues.summary.isEditing,
        },
      };
    });
  };

  const handleOnChangeSummary = function (event) {
    setUserContact((prevValues) => {
      return {
        ...prevValues,
        summary: { ...prevValues.summary, description: event.target.value },
      };
    });
  };

  const handleSummaryKeyDown = function (event) {
    if (event.shiftKey && event.key === "Enter") {
      console.log(`Shift & Enter`);
    } else if (event.key === "Enter") {
      console.log(`Enter`);
      handleSummaryEditingStatus();
    }
  };

  return (
    <div className={(styles.section, styles.summary)}>
      <div className={styles.recordContainer}>
        <span className={styles.sectionTitle}>
          <InfoIcon fontSize="large" />
          Summary
        </span>

        {userContact.summary.isEditing ? (
          <InputForm
            key="summaryInput"
            type="text"
            name="summary"
            value={userContact.summary.description}
            className={styles.control}
            autoFocus
            onBlur={handleSummaryEditingStatus}
            onChange={handleOnChangeSummary}
            handleKeyEnterAndShift={handleSummaryKeyDown}
            isTextArea={true}
          />
        ) : (
          <div
            onClick={handleSummaryEditingStatus}
            key="summary"
            className={styles.record}
          >
            {userContact.summary.description
              ? userContact.summary.description
              : `Write something about yourself!`}
          </div>
        )}
      </div>
    </div>
  );
}
