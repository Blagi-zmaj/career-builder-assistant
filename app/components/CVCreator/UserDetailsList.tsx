import { Button, Tooltip } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { userProfileData } from "./CVCreatorUtils/helpers";
import { MouseEvent, useEffect, useState } from "react";

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

export default function UserDetailsList({
  categoryList,
  // // userData,
  // handleBlur,
  // handleUserDetailsKeyDown,
  // handleChangeUserActualInput,
  // replaceTextWithInput,
  // handleDeleteListItem,
  // handleChangeRatingExistingListItem,
  // // handleChangeAddNewListItem,
  // handleChangeRatingNewListItem,
  // handleAddNewItemList,
  hideAllButtons,
  // isDisabledAddBtn,
  // showTooltip,
}) {
  const listNameCapitalized = `${categoryList[0].toUpperCase()}${categoryList.slice(
    1,
    -1
  )}`;
  const [userData, setUserData] = useState<UserProfile>(userProfileData);
  const [isDisabledAddBtn, setIsDisabledAddBtn] = useState(true);
  // const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip, setShowTooltip] = useState({
    open: false,
    text: "Empty record",
  });
  const listNameSingular = `${categoryList.slice(0, -1)}`;
  const newListName = `new${listNameCapitalized}`;
  const addListName = `add${listNameCapitalized}`;
  // console.log(`Render UserDetailsList`);

  useEffect(() => {
    // console.log(`Value of new skill: ${userData[newListName].name}`);
    if (!userData[newListName].name) {
      // console.log(userData[newListName].name ? "Has value" : "Empty");

      setIsDisabledAddBtn(true);
      setShowTooltip((prevValues) => {
        return { open: true, text: "Empty record" };
      });
    }
  }, [userData[newListName].name]);

  const handleChangeRatingNewListItem = function (
    rate: number,
    identifier: string,
    index: number = 0
  ) {
    setUserData((prevValues) => {
      return {
        ...prevValues,
        [identifier]: { ...prevValues[identifier], level: rate },
      };
    });
  };

  const handleAddNewItemList = function (
    event: MouseEvent<HTMLButtonElement>,
    identifier: string,
    listName: string
  ) {
    setUserData((prevValues) => {
      return {
        ...prevValues,
        [listName]: [...prevValues[listName], prevValues[identifier]],
        [identifier]: { ...prevValues[identifier], name: "" },
      };
    });
  };

  const handleBlur = function (categoryList: string, listIndex: number) {
    console.log(`handleBlur`);
    console.log(categoryList, listIndex);
    setUserData((prevValues) => {
      const newData = {
        ...prevValues,
        [categoryList]: [
          ...prevValues[categoryList].slice(0, listIndex),
          {
            ...prevValues[categoryList][listIndex],
            isEditing: !prevValues[categoryList][listIndex].isEditing,
          },
          ...prevValues[categoryList].slice(listIndex + 1),
        ],
      };
      console.log(newData);
      return newData;
    });
  };

  const handleUserDetailsKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: string,
    index: number
  ) {
    if (event.key === "Enter") {
      setUserData((prevValues) => {
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

  const handleChangeUserActualInput = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string,
    index: number
  ) {
    const updatedDetail = {
      ...userData[identifier][index],
      name: event.target.value,
    };

    setUserData((prevValues) => {
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
    setUserData((prevValues) => {
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
    event: MouseEvent<HTMLButtonElement>,
    skillName: string,
    identifier: string
  ) {
    const updatedList = userData[identifier].filter((el) => {
      return el.name !== skillName;
    });

    setUserData((prevValues) => {
      return { ...prevValues, [identifier]: updatedList };
    });
  };

  const handleChangeRatingExistingListItem = function (
    rate: number,
    identifier: string,
    index: number
  ) {
    // console.log(typeof rate, typeof identifier, typeof index);
    setUserData((prevValues) => {
      return {
        ...prevValues,
        [identifier]: [
          ...prevValues[identifier].slice(0, index),
          { ...prevValues[identifier][index], level: rate },
          ...prevValues[identifier].slice(index + 1),
        ],
      };
    });
  };

  const handleChangeAddNewListItem = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string,
    categoryList: string
  ) {
    const isInUserProperty = userData[categoryList].filter((el) => {
      return el.name.toLowerCase() === event.target.value.toLowerCase();
    });

    if (isInUserProperty.length > 0 && userData[identifier] !== "") {
      console.log(`userData[identifier] !== ""`);
      setIsDisabledAddBtn(true);
      setShowTooltip({ open: true, text: "Duplicated record" });
    } else {
      setIsDisabledAddBtn(false);
      setShowTooltip((prevValues) => {
        return { ...prevValues, open: false };
      });
    }

    setUserData((prevValues) => {
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
      {userData[categoryList].map((listItem, listIndex) => {
        return (
          <div key={categoryList + listIndex}>
            <div
              className={
                hideAllButtons ? styles.skillsUIWithoutBtns : styles.skillsUI
              }
            >
              {listItem.isEditing ? (
                <InputForm
                  key={listItem.name}
                  type="text"
                  name={listItem.name}
                  value={listItem.name}
                  className={styles.control}
                  autoFocus
                  onBlur={() => handleBlur(categoryList, listIndex)}
                  onKeyDown={(event) =>
                    handleUserDetailsKeyDown(event, categoryList, listIndex)
                  }
                  onChange={(event) =>
                    handleChangeUserActualInput(event, categoryList, listIndex)
                  }
                />
              ) : (
                <span
                  onClick={() => replaceTextWithInput(categoryList, listIndex)}
                  key={listItem.name + 5}
                  className={styles.wordWrapBreakWord}
                >
                  {listItem.name ? listItem.name : `<empty> ${listIndex}`}
                </span>
              )}
              <RadioGroupRating
                rate={listItem.level}
                handleChangeRatingListItem={handleChangeRatingExistingListItem}
                categoryList={categoryList}
                index={listIndex}
              />
              <Button
                onClick={(event) =>
                  handleDeleteListItem(event, listItem.name, categoryList)
                }
                variant="contained"
                className={
                  hideAllButtons ? styles.hiddenButton : styles.addNewRecordForm
                }
              >
                <RemoveIcon />
              </Button>
            </div>
          </div>
        );
      })}
      <div className={hideAllButtons ? styles.hideComponent : styles.skillsUI}>
        <InputForm
          key={addListName}
          type="text"
          name={addListName}
          value={userData[newListName].name}
          placeholder={`New ${listNameSingular}`}
          className={styles.control}
          onChange={(event) =>
            handleChangeAddNewListItem(
              event,
              `new${categoryList[0].toUpperCase()}${categoryList.slice(1, -1)}`,
              categoryList
            )
          }
        />
        <RadioGroupRating
          rate={userData[newListName].level}
          handleChangeRatingListItem={handleChangeRatingNewListItem}
          categoryList={newListName}
          index={0}
        />
        <Tooltip title={showTooltip.text} open={showTooltip.open}>
          <Button
            disabled={isDisabledAddBtn}
            onClick={(event) =>
              handleAddNewItemList(event, newListName, categoryList)
            }
            variant="contained"
            className={
              hideAllButtons ? styles.hiddenButton : styles.addNewRecordForm
            }
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
