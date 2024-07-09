import { useState, useContext, ChangeEvent } from "react";
import { NavAndDrawerContext } from "@/app/util/context";
import { userProfileData } from "../CVCreatorUtils/helpers";
import styles from "./JobExperienceSection.module.css";
import InputForm from "../InputForm/InputForm";
import WorkIcon from "@mui/icons-material/Work";
import DatePicker from "../DatePicker";
import Modal from "../ModalDialog";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

export default function JobExperienceSection() {
  const { showButtons } = useContext(NavAndDrawerContext);
  const [userContact, setUserContact] = useState<UserProfile>(userProfileData);

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

  const handleReplaceTextWithInput = function (
    listName: string,
    workIndex: number,
    identifier: string
  ) {
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

  const handleChangeUserListItem = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    const updatedItem = {
      ...userContact[listName][workIndex],
      [identifier]: {
        ...userContact[listName][workIndex][identifier],
        value: event.target.value,
      },
    };

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

  const handleKeyEnterAndShift = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    if (event.shiftKey && event.key === "Enter") {
      console.log(`Shift & Enter`);
    } else if (event.key === "Enter") {
      console.log(`clicked enter`);
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

  const handleBlurUser = function (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleUpdateDate = function (
    date: string,
    type: string,
    index: number,
    identifier: string
  ) {
    console.log(typeof date, typeof type, index, identifier);

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

  return (
    <div className={(styles.section, styles.experience)}>
      <span className={styles.sectionTitle}>
        <WorkIcon />
        Experience
      </span>
      {userContact.experience.map((work, workIndex) => {
        return (
          <div key={workIndex} className={styles.recordContainer}>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={(event) =>
                handleDeleteListRecord(
                  event,
                  "experience",
                  work.institution.value
                )
              }
            >
              X
            </button>
            {Object.entries(work).map((el, elIndex) => {
              return el[0] === "startDate" || el[0] === "endDate" ? (
                el[0] === "startDate" ? (
                  <div key={elIndex} className={styles.datesContainer}>
                    <CalendarMonthIcon />
                    <DatePicker
                      date={work.startDate.value}
                      id={"start" + elIndex}
                      index={workIndex}
                      type={"startDate"}
                      //   isEditing={work.startDate.isEditing}
                      updateDate={handleUpdateDate}
                      listName={"experience"}
                    />
                    <div>-</div>
                    <DatePicker
                      date={work.endDate.value}
                      id={"end" + elIndex}
                      index={workIndex}
                      type={"endDate"}
                      updateDate={handleUpdateDate}
                      listName={"experience"}
                    />
                  </div>
                ) : null
              ) : (
                <span key={elIndex}>
                  {el[1].isEditing ? (
                    <InputForm
                      key={el[0]}
                      type="text"
                      name={el[0]}
                      value={el[1].value}
                      className={styles.control}
                      autoFocus
                      isTextArea={el[0] === "description" ? true : false}
                      onBlur={() =>
                        handleBlurUser(event, "experience", workIndex, el[0])
                      }
                      onKeyDown={(event) =>
                        handleKeyEnterAndShift(
                          event,
                          "experience",
                          workIndex,
                          el[0]
                        )
                      }
                      onChange={(event) =>
                        handleChangeUserListItem(
                          event,
                          "experience",
                          workIndex,
                          el[0]
                        )
                      }
                    />
                  ) : (
                    <div style={{ margin: "0.75rem 0" }}>
                      <div
                        onClick={() =>
                          handleReplaceTextWithInput(
                            "experience",
                            workIndex,
                            el[0]
                          )
                        }
                        className={styles.record}
                      >
                        {el[1].value ? el[1].value : `<empty>`}
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
        type={"work"}
        handleAddNewItemListFromModal={handleAddNewItemListFromModal}
      />
    </div>
  );
}
