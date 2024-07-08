import { useState, useContext, ChangeEvent } from "react";
import { NavAndDrawerContext } from "@/app/util/context";
import { userProfileData } from "../CVCreatorUtils/helpers";
import styles from "./HobbiesSection.module.css";
import InputForm from "../InputForm/InputForm";
import { Button } from "@mui/material";

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
  const [userContact, setUserContact] = useState<UserProfile>(userProfileData);
  const [hideAllButtons, setHideButtons] = useState(false);
  const { showNavAndDrawer, toggleShowNavAndDrawer } =
    useContext(NavAndDrawerContext);

  const handleUserDetailsKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: string,
    index: number
  ) {
    if (event.key === "Enter") {
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
  };

  const handleChangeUserActualInput = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string,
    index: number
  ) {
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
      console.log(newData);
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
  };

  const handleChangeAddNewListItem = function (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string
  ) {
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
      <h3>Hobbies TEST</h3>
      {userContact.hobbies.map((hobby, index) => {
        return (
          <div
            key={index}
            className={styles.hobbiesUI}
            // style={{ backgroundColor: "yellowgreen" }}
          >
            {hobby.isEditing ? (
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
              className={
                hideAllButtons ? styles.hiddenButton : styles.hobbiesBtn
              }
            >
              -
            </Button>
          </div>
        );
      })}
      <div
        className={hideAllButtons ? styles.hideComponent : styles.hobbiesBox}
      >
        <InputForm
          key={"addHobby"}
          type="text"
          name={"addHobby"}
          placeholder="Hobby"
          value={userContact.newHobby.name}
          className={styles.control}
          onChange={(event) => handleChangeAddNewListItem(event, "newHobby")}
        />

        <Button
          onClick={(event) =>
            handleAddNewItemList(event, "newHobby", "hobbies")
          }
          className={
            hideAllButtons ? styles.hiddenButton : styles.addNewRecordForm
          }
          variant="contained"
        >
          +
        </Button>
      </div>
      <button
        type="button"
        onClick={handleToggleButtons}
        style={{ fontSize: "2rem" }}
      >
        {hideAllButtons ? "Show" : "Hide"} all buttons
      </button>
    </>
  );
}
