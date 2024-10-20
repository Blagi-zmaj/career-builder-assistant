import { useState, useContext, useEffect } from "react";
import { NavAndDrawerContext } from "@/app/util/context";
import {
  updateDataRecordInDatabase,
  userProfileData,
} from "../CVCreatorUtils/helpers";
import styles from "./JobExperienceSection.module.css";
import InputForm from "../InputForm/InputForm";
import WorkIcon from "@mui/icons-material/Work";
import DatePicker from "../DatePicker";
import Modal from "../ModalDialog";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Experience } from "../../../util/types";
import { useAddNewItemListFromModal } from "../CVCreatorUtils/customHooks/customHooks";

export default function JobExperienceSection() {
  const { showButtons } = useContext(NavAndDrawerContext);
  const [actualRecord, setActualRecord] = useState("actualRecordTEST");
  const [userContact, setUserContact] = useState<Experience>({
    experience: [],
  });
  const [state, updateState, synchronizeState] =
    useAddNewItemListFromModal(userProfileData);
  const [actualRecordUpdated, setActualRecordUpdated] = useState(-1);
  const [showActualRecordTooltip, setShowActualRecordTooltip] = useState({
    open: false,
    text: "Empty record",
  });

  useEffect(() => {
    setUserContact(state);
  }, [state]);

  useEffect(() => {
    const storedLogin = window.localStorage.getItem("login");
    async function fetchDataFromDatabase() {
      const response = await fetch(
        `/pages/api/experience?login=${storedLogin}`
      );
      const data = await response.json();

      const newDataFormat = data.map((el) => {
        return {
          institution: { value: el.institution_name, isEditing: false },
          position: { value: el.position_name, isEditing: false },
          startDate: { value: el.start_date, isEditing: false },
          endDate: { value: el.end_date, isEditing: false },
          description: {
            value: el.description,
            isEditing: false,
          },
        };
      });

      setUserContact({ experience: newDataFormat });
      synchronizeState({ experience: newDataFormat });
    }

    fetchDataFromDatabase();
  }, []);

  const handleReplaceTextWithInput = function (
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    setActualRecord(userContact[listName][workIndex][identifier].value);

    setActualRecordUpdated(workIndex);

    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

    if (!userContact[listName][workIndex][identifier].value) {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
    }

    const updatedListItemStatus = {
      ...userContact[listName][workIndex],
      [identifier]: {
        ...userContact[listName][workIndex][identifier],
        isEditing: !userContact[listName][workIndex][identifier].isEditing,
      },
    };

    const updatedObj = {
      ...userContact,
      [listName]: [
        ...userContact[listName].slice(0, workIndex),
        updatedListItemStatus,
        ...userContact[listName].slice(workIndex + 1),
      ],
    };

    setUserContact(updatedObj);
    synchronizeState(updatedObj);
  };

  const handleChangeUserListItem = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

    if (!event.target.value) {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
    }

    const updatedItem = {
      ...userContact[listName][workIndex],
      [identifier]: {
        ...userContact[listName][workIndex][identifier],
        value: event.target.value,
      },
    };

    const updatedUserObj = {
      ...userContact,
      [listName]: [
        ...userContact[listName].slice(0, workIndex),
        updatedItem,
        ...userContact[listName].slice(workIndex + 1),
      ],
    };

    setUserContact(updatedUserObj);
    synchronizeState(updatedUserObj);
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
      updateDataRecordInDatabase(
        "update",
        listName,

        {
          prevValue: actualRecord,
          newValue: userContact[listName][workIndex][identifier].value,
          oldRecord: {
            ...userContact[listName][workIndex],
            [identifier]: { value: actualRecord, isEditing: false },
          },
        },
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

      const updatedUserObj = {
        ...userContact,
        [listName]: [
          ...userContact[listName].slice(0, workIndex),
          updatedEditState,
          ...userContact[listName].slice(workIndex + 1),
        ],
      };

      setUserContact(updatedUserObj);
      synchronizeState(updatedUserObj);
    }
  };

  const handleBlurUser = function (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    listName: string,
    workIndex: number,
    identifier: string
  ) {
    updateDataRecordInDatabase(
      "update",
      listName,
      // userContact[listName][workIndex],
      {
        prevValue: actualRecord,
        newValue: userContact[listName][workIndex][identifier].value,
        oldRecord: {
          ...userContact[listName][workIndex],
          [identifier]: { value: actualRecord, isEditing: false },
        },
      },
      identifier
    );

    const updatedEditState = {
      ...userContact[listName][workIndex],
      [identifier]: {
        ...userContact[listName][workIndex][identifier],
        isEditing: !userContact[listName][workIndex][identifier].isEditing,
      },
    };

    const updatedUserObj = {
      ...userContact,
      [listName]: [
        ...userContact[listName].slice(0, workIndex),
        updatedEditState,
        ...userContact[listName].slice(workIndex + 1),
      ],
    };

    setUserContact(updatedUserObj);
    synchronizeState(updatedUserObj);
  };

  const handleUpdateDate = function (
    date: string,
    type: string,
    index: number,
    identifier: string
  ) {
    updateDataRecordInDatabase(
      "update",
      identifier,
      {
        prevValue: userContact[identifier][index][type],
        newValue: date,
        oldRecord: {
          ...userContact[identifier][index],
          [identifier]: { value: actualRecord, isEditing: false },
        },
      },
      type
    );

    const updatedRecord = {
      ...userContact[identifier][index],
      [type]: { ...userContact[identifier][index][type], value: date },
    };

    const updatedUserObj = {
      ...userContact,
      [identifier]: [
        ...userContact[identifier].slice(0, index),
        updatedRecord,
        ...userContact[identifier].slice(index + 1),
      ],
    };

    setUserContact(updatedUserObj);
    synchronizeState(updatedUserObj);
  };

  const handleDeleteListRecord = function (
    event: React.MouseEvent<HTMLButtonElement>,
    listName: string,
    identifier: string,
    position: string
  ) {
    const filteredData = userContact[listName].filter((record) => {
      return (
        record.institution.value != identifier ||
        record.position.value != position
      );
    });

    setUserContact((prevValues) => {
      return { ...prevValues, [listName]: filteredData };
    });

    synchronizeState({ ...userContact, [listName]: filteredData });

    updateDataRecordInDatabase("delete", listName, {
      institution: identifier,
      position,
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
                  work.institution.value,
                  work.position.value
                )
              }
            >
              <DeleteIcon />
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
                    </Tooltip>
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
        type={"work"}
        handleAddNewItemListFromModal={updateState}
      />
    </div>
  );
}
