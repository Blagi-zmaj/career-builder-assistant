import InputForm from "../InputForm/InputForm";
import styles from "./SummarySection.module.css";
import { useState, useContext } from "react";
import { NavAndDrawerContext } from "@/app/util/context";
import { userContactData, userProfileData } from "../CVCreatorUtils/helpers";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

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
  const {
    showNavAndDrawer,
    toggleShowNavAndDrawer,
    toggleShowButtons,
    showButtons,
  } = useContext(NavAndDrawerContext);
  const [userContact, setUserContact] = useState<UserProfile>(userProfileData);
  const [hideAllButtons, setHideButtons] = useState(showButtons);
  const [showActualRecordTooltip, setShowActualRecordTooltip] = useState({
    open: false,
    text: "Empty record",
  });

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

    if (!userContact.summary.description) {
      setUserContact((prevValues) => {
        return {
          ...prevValues,
          summary: { ...prevValues.summary, description: `Add summary` },
        };
      });
    }
  };

  const handleOnChangeSummary = function (event) {
    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });
    if (!event.target.value) {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
    }

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
      handleSummaryEditingStatus();

      if (!userContact.summary.description) {
        setUserContact((prevValues) => {
          return {
            ...prevValues,
            summary: { ...prevValues.summary, description: `Add summary` },
          };
        });
      }
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
          <Tooltip
            title={showActualRecordTooltip.text}
            open={showActualRecordTooltip.open}
          >
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
          </Tooltip>
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
