import { useState, useContext, ChangeEvent, useEffect } from "react";
import { NavAndDrawerContext } from "../../../util/context";
import { userProfileData } from "../CVCreatorUtils/helpers";
import styles from "./HobbiesSection.module.css";
import InputForm from "../InputForm/InputForm";
import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

export default function HobbiesSection() {
  const {
    showNavAndDrawer,
    toggleShowNavAndDrawer,
    toggleShowButtons,
    showButtons,
  } = useContext(NavAndDrawerContext);
  const [userContact, setUserContact] = useState<UserProfile>(userProfileData);
  const [hideAllButtons, setHideButtons] = useState(showButtons);
  const [isDisabledAddBtn, setIsDisabledAddBtn] = useState(true);
  const [actualRecordUpdated, setActualRecordUpdated] = useState(-1); //name
  const [showTooltip, setShowTooltip] = useState({
    open: false,
    text: "Empty record",
  });
  const [showActualRecordTooltip, setShowActualRecordTooltip] = useState({
    open: false,
    text: "Empty record",
  });

  useEffect(() => {
    if (!userContact.newHobby.name) {
      setIsDisabledAddBtn(true);
      setShowTooltip((prevValues) => {
        return { open: true, text: "Empty record" };
      });
    }

    if (userContact.hobbies[actualRecordUpdated]?.name === "") {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
    }
  }, [userContact.newHobby.name, userContact.hobbies, actualRecordUpdated]);

  useEffect(() => {
    setShowTooltip((prevValues) => {
      return { open: false, text: "Empty record" };
    });
  }, []);

  function hasDuplicates(arr) {
    const localArr = arr.map((el) => el.name.toLowerCase());
    return new Set(localArr).size !== localArr.length;
  }

  const handleUserDetailsKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: string,
    index: number
  ) {
    // if (event.key === "Enter") {
    //   setUserContact((prevValues) => {
    //     const newData = {
    //       ...prevValues,
    //       [inputName]: [
    //         ...prevValues[inputName].slice(0, index),
    //         {
    //           ...prevValues[inputName][index],
    //           isEditing: !prevValues[inputName][index].isEditing,
    //         },
    //         ...prevValues[inputName].slice(index + 1),
    //       ],
    //     };
    //     console.log(newData);
    //     return newData;
    //   });
    // }

    if (event.key === "Enter") {
      if (userContact.hobbies[actualRecordUpdated]?.name === "") {
        setShowActualRecordTooltip({ open: true, text: "Empty record" });
        return;
      }

      if (hasDuplicates(userContact.hobbies)) {
        setShowActualRecordTooltip({ open: true, text: "Duplicated record" });
        return;
      }

      console.log(`UPDATE keyenTER`);
      setUserContact((prevValues) => {
        const newData = {
          ...prevValues,
          [inputName]: [
            ...prevValues[inputName].slice(0, index),
            {
              ...prevValues[inputName][index],
              isEditing: !prevValues[inputName][index].isEditing,
            },
            ...prevValues[inputName].slice(index + 1),
          ],
        };
        console.log(newData);
        return newData;
      });
    }
  };

  const handleOnBlur = function (
    event: React.FocusEvent<HTMLInputElement>,
    inputName: string,
    index: number
  ) {
    if (userContact.hobbies[actualRecordUpdated]?.name === "") {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
      setUserContact((prevValues) => {
        const newData = {
          ...prevValues,
          [inputName]: [
            ...prevValues[inputName].slice(0, index),
            {
              ...prevValues[inputName][index],
              isEditing: !prevValues[inputName][index].isEditing,
              name: "ADD OR DELETE!",
            },
            ...prevValues[inputName].slice(index + 1),
          ],
        };
        console.log(newData);
        return newData;
      });

      return;
    }

    // console.log(hasDuplicates(userContact.hobbies));
    if (hasDuplicates(userContact.hobbies)) {
      setShowActualRecordTooltip({ open: true, text: "Duplicated record" });
      setUserContact((prevValues) => {
        const newData = {
          ...prevValues,
          [inputName]: [
            ...prevValues[inputName].slice(0, index),
            {
              ...prevValues[inputName][index],
              isEditing: !prevValues[inputName][index].isEditing,
              name: "CHANGE OR DELETE!",
            },
            ...prevValues[inputName].slice(index + 1),
          ],
        };
        console.log(newData);
        return newData;
      });
      return;
    }

    // console.log(`UPDATE onBlur`);

    setUserContact((prevValues) => {
      const newData = {
        ...prevValues,
        [inputName]: [
          ...prevValues[inputName].slice(0, index),
          {
            ...prevValues[inputName][index],
            isEditing: !prevValues[inputName][index].isEditing,
          },
          ...prevValues[inputName].slice(index + 1),
        ],
      };
      // console.log(newData);
      return newData;
    });
  };

  const handleChangeUserActualInput = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string,
    index: number
  ) {
    setActualRecordUpdated(index);

    const isInUserProperty = userContact.hobbies.filter((el) => {
      return el.name.toLowerCase() === event.target.value.toLowerCase();
    });

    if (isInUserProperty.length > 0 && isInUserProperty[0].name !== "") {
      console.log(`userContact[identifier] !== ""`);
      setIsDisabledAddBtn(true);
      setShowActualRecordTooltip({ open: true, text: "Duplicated record" });
    } else {
      setIsDisabledAddBtn(false);
      setShowActualRecordTooltip((prevValues) => {
        return { ...prevValues, open: false };
      });
    }

    const updatedDetail = {
      ...userContact[identifier][index],
      name: event.target.value,
    };

    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [identifier]: [
          ...prevValues[identifier].slice(0, index),
          updatedDetail,
          ...prevValues[identifier].slice(index + 1),
        ],
      };
    });
  };

  const replaceTextWithInput = function (
    inputName: string,
    listItemIndex: number = 0
  ) {
    //hide Tooltips on start
    setShowTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });
    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

    setUserContact((prevValues) => {
      const newData = {
        ...prevValues,
        [inputName]: [
          ...prevValues[inputName].slice(0, listItemIndex),
          {
            ...prevValues[inputName][listItemIndex],
            isEditing: !prevValues[inputName][listItemIndex].isEditing,
          },
          ...prevValues[inputName].slice(listItemIndex + 1),
        ],
      };
      // console.log(newData);
      return newData;
    });
  };

  const handleDeleteListItem = function (
    event: React.MouseEvent<HTMLButtonElement>,
    skillName: string,
    identifier: string
  ) {
    const updatedList = userContact[identifier].filter((el: Hobby) => {
      return el.name !== skillName;
    });

    setUserContact((prevValues) => {
      return { ...prevValues, [identifier]: updatedList };
    });
  };

  const handleAddNewItemList = function (
    event: React.MouseEvent<HTMLButtonElement>,
    identifier: string,
    listName: string
  ) {
    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [listName]: [...prevValues[listName], prevValues[identifier]],
        [identifier]: { ...prevValues[identifier], name: "" },
      };
    });
  };

  const handleToggleButtons = () => {
    setHideButtons((prev) => {
      return !prev;
    });
    toggleShowNavAndDrawer();
    toggleShowButtons();
  };

  const handleChangeAddNewListItem = function (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string
  ) {
    const isInUserProperty = userContact.hobbies.filter((el) => {
      return el.name.toLowerCase() === event.target.value.toLowerCase();
    });

    if (isInUserProperty.length > 0 && userContact[identifier] !== "") {
      console.log(`userContact[identifier] !== ""`);
      setIsDisabledAddBtn(true);
      setShowTooltip({ open: true, text: "Duplicated record" });
    } else {
      setIsDisabledAddBtn(false);
      setShowTooltip((prevValues) => {
        return { ...prevValues, open: false };
      });
    }

    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [identifier]: {
          ...prevValues[identifier],
          name: event.target.value,
        },
      };
    });
  };

  return (
    <>
      <h3>Hobbies</h3>
      {userContact.hobbies.map((hobby, index) => {
        return (
          <div key={index} className={styles.hobbiesUI}>
            {hobby.isEditing ? (
              <Tooltip
                title={showActualRecordTooltip.text}
                open={showActualRecordTooltip.open}
              >
                <InputForm
                  key={hobby.name}
                  type="text"
                  name={hobby.name}
                  value={hobby.name}
                  className={styles.control}
                  placeholder={"New hobby"}
                  autoFocus
                  onBlur={(event) => handleOnBlur(event, "hobbies", index)}
                  onKeyDown={(event) =>
                    handleUserDetailsKeyDown(event, "hobbies", index)
                  }
                  onChange={(event) =>
                    handleChangeUserActualInput(event, "hobbies", index)
                  }
                />
              </Tooltip>
            ) : (
              <span
                onClick={() => replaceTextWithInput("hobbies", index)}
                key={hobby.name}
                className={styles.wordWrapBreakWord}
              >
                {hobby.name ? hobby.name : `<empty> ${index}`}
              </span>
            )}
            <Button
              onClick={(event) =>
                handleDeleteListItem(event, hobby.name, "hobbies")
              }
              variant="contained"
              className={showButtons ? styles.hiddenButton : styles.hobbiesBtn}
              aria-label={hobby.name}
            >
              <RemoveIcon />
            </Button>
          </div>
        );
      })}
      <div className={showButtons ? styles.hideComponent : styles.hobbiesBox}>
        <InputForm
          key={"addHobby"}
          type="text"
          name={"addHobby"}
          placeholder="New hobby"
          value={userContact.newHobby.name}
          className={styles.control}
          onChange={(event) => handleChangeAddNewListItem(event, "newHobby")}
        />
        <Tooltip title={showTooltip.text} open={showTooltip.open}>
          <Button
            onClick={(event) =>
              handleAddNewItemList(event, "newHobby", "hobbies")
            }
            className={
              showButtons ? styles.hiddenButton : styles.addNewRecordForm
            }
            variant="contained"
            disabled={isDisabledAddBtn}
            aria-label={`AddNewHobby`}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <button
        type="button"
        onClick={handleToggleButtons}
        style={{ fontSize: "2rem" }}
      >
        {showButtons ? "Show" : "Hide"} all buttons
      </button>
    </>
  );
}
