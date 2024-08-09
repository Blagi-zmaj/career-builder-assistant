import { useState, useContext, ChangeEvent } from "react";
import { NavAndDrawerContext } from "@/app/util/context";
import { userProfileData } from "../CVCreatorUtils/helpers";
import styles from "./EducationSection.module.css";
import InputForm from "../InputForm/InputForm";
import WorkIcon from "@mui/icons-material/Work";
import DatePicker from "../DatePicker";
import Modal from "../ModalDialog";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function EducationSection() {
  const { showButtons } = useContext(NavAndDrawerContext);
  const [userContact, setUserContact] = useState<UserProfile>(userProfileData);
  const [actualRecordUpdated, setActualRecordUpdated] = useState(-1);
  const [showActualRecordTooltip, setShowActualRecordTooltip] = useState({
    open: false,
    text: "Empty record",
  });

  const handleDeleteListRecord = function (
    event: React.MouseEvent<HTMLButtonElement>,
    listName: string,
    identifier: string
  ) {
    console.log(listName, identifier);
    const filteredData = userContact[listName].filter((record) => {
      return record.institution.value !== identifier;
    });
    console.log(filteredData);

    setUserContact((prevValues) => {
      return { ...prevValues, [listName]: filteredData };
    });
  };

  const handleUpdateDate = function (
    date: string,
    type: string,
    index: number,
    identifier: string
  ) {
    console.log(date, type, index, identifier);

    const updatedRecord = {
      ...userContact[identifier][index],
      [type]: { ...userContact[identifier][index][type], value: date },
    };

    console.log(updatedRecord);

    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [identifier]: [
          ...prevValues[identifier].slice(0, index),
          updatedRecord,
          ...prevValues[identifier].slice(index + 1),
        ],
      };
    });
  };

  const handleBlurUser = function (
    event: React.FocusEvent,
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    const updatedEditState = {
      ...userContact[listName][workIndex],
      [identifier]: {
        ...userContact[listName][workIndex][identifier],
        isEditing: !userContact[listName][workIndex][identifier].isEditing,
      },
    };

    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [listName]: [
          ...prevValues[listName].slice(0, workIndex),
          updatedEditState,
          ...prevValues[listName].slice(workIndex + 1),
        ],
      };
    });
  };

  const handleKeyEnterAndShift = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    console.log(listName, workIndex, identifier); // education 0 startDate

    if (event.shiftKey && event.key === "Enter") {
      console.log(`Shift & Enter`);
    } else if (event.key === "Enter") {
      console.log(`clicked enter`);

      console.log(
        userContact[listName][actualRecordUpdated][identifier].value,
        listName,
        actualRecordUpdated,
        identifier
      );

      if (userContact[listName][actualRecordUpdated][identifier].value === "") {
        setShowActualRecordTooltip({ open: true, text: "Empty record" });
        return;
      }

      const updatedEditState = {
        ...userContact[listName][workIndex],
        [identifier]: {
          ...userContact[listName][workIndex][identifier],
          isEditing: !userContact[listName][workIndex][identifier].isEditing,
        },
      };

      setUserContact((prevValues) => {
        return {
          ...prevValues,
          [listName]: [
            ...prevValues[listName].slice(0, workIndex),
            updatedEditState,
            ...prevValues[listName].slice(workIndex + 1),
          ],
        };
      });
    }
  };

  const handleChangeUserListItem = function (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    // console.log(listName, workIndex, identifier); // experience 0 startDate
    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

    if (!event.target.value) {
      console.log(event.target.value);
      console.log("EMPTY");
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
    }

    const updatedItem = {
      ...userContact[listName][workIndex],
      [identifier]: {
        ...userContact[listName][workIndex][identifier],
        value: event.target.value,
      },
    };

    console.log(updatedItem);

    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [listName]: [
          ...prevValues[listName].slice(0, workIndex),
          updatedItem,
          ...prevValues[listName].slice(workIndex + 1),
        ],
      };
    });
  };

  const handleReplaceTextWithInput = function (
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    setActualRecordUpdated(workIndex);

    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

    if (!userContact[listName][workIndex][identifier].value) {
      console.log(actualRecordUpdated);
      console.log("EMPTY");
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
    }

    console.log(userContact[listName][workIndex][identifier]);
    const updatedListItemStatus = {
      ...userContact[listName][workIndex],
      [identifier]: {
        ...userContact[listName][workIndex][identifier],
        isEditing: !userContact[listName][workIndex][identifier].isEditing,
      },
    };

    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [listName]: [
          ...prevValues[listName].slice(0, workIndex),
          updatedListItemStatus,
          ...prevValues[listName].slice(workIndex + 1),
        ],
      };
    });
  };

  const handleAddNewItemListFromModal = function (data) {
    console.log(data.type);
    console.log(data);

    const objWithIsEditing = {
      institution: { value: data.institution, isEditing: false },
      position: { value: data.position, isEditing: false },
      startDate: { value: data.startDate, isEditing: false },
      endDate: { value: data.endDate, isEditing: false },
      description: {
        value: data.description,
        isEditing: false,
      },
    };
    console.log(objWithIsEditing);

    if (data.type === "work") {
      setUserContact((prevValues) => {
        return {
          ...prevValues,
          experience: [...prevValues.experience, objWithIsEditing],
        };
      });
    } else {
      setUserContact((prevValues) => {
        return {
          ...prevValues,
          education: [...prevValues.education, objWithIsEditing],
        };
      });
    }
  };

  return (
    <div className={(styles.section, styles.education)}>
      <span className={styles.sectionTitle}>
        <SchoolIcon />
        Education
      </span>
      {userContact.education.map((subject, subjectIndex) => {
        return (
          <div key={subjectIndex} className={styles.recordContainer}>
            <button
              className={styles.deleteBtn}
              type="button"
              onClick={(event) =>
                handleDeleteListRecord(
                  event,
                  "education",
                  subject.institution.value
                )
              }
            >
              <DeleteIcon />
            </button>
            {Object.entries(subject).map((el, elIndex) => {
              return el[0] === "startDate" || el[0] === "endDate" ? (
                el[0] === "startDate" ? (
                  <div key={elIndex} className={styles.datesContainer}>
                    <CalendarMonthIcon />
                    <DatePicker
                      date={subject.startDate.value}
                      id={"start" + elIndex}
                      index={subjectIndex}
                      type={"startDate"}
                      listName={"education"}
                      updateDate={handleUpdateDate}
                    />
                    <div>-</div>
                    <DatePicker
                      date={subject.endDate.value}
                      id={"end" + elIndex}
                      index={subjectIndex}
                      type={"endDate"}
                      listName={"education"}
                      updateDate={handleUpdateDate}
                    />
                  </div>
                ) : null
              ) : (
                <span key={elIndex}>
                  {el[1].isEditing ? (
                    <Tooltip
                      title={showActualRecordTooltip.text}
                      open={showActualRecordTooltip.open}
                    >
                      <InputForm
                        key={el[0]}
                        type="text"
                        name={el[0]}
                        value={el[1].value}
                        className={styles.control}
                        autoFocus
                        isTextArea={el[0] === "description" ? true : false}
                        onBlur={() =>
                          handleBlurUser(
                            event,
                            "education",
                            subjectIndex,
                            el[0]
                          )
                        }
                        handleKeyEnterAndShift={(event) =>
                          handleKeyEnterAndShift(
                            event,
                            "education",
                            subjectIndex,
                            el[0]
                          )
                        }
                        onChange={(event) =>
                          handleChangeUserListItem(
                            event,
                            "education",
                            subjectIndex,
                            el[0]
                          )
                        }
                      />
                    </Tooltip>
                  ) : (
                    <div style={{ margin: "0.75rem 0" }}>
                      <div
                        onClick={() =>
                          handleReplaceTextWithInput(
                            "education",
                            subjectIndex,
                            el[0]
                          )
                        }
                        className={styles.record}
                      >
                        {el[1].value ? el[1].value : `Add ${el[0]}`}
                      </div>
                    </div>
                  )}
                </span>
              );
            })}
          </div>
        );
      })}
      <Modal
        hideAllButtons={showButtons}
        type={"education"}
        handleAddNewItemListFromModal={handleAddNewItemListFromModal}
      />
    </div>
  );
}
