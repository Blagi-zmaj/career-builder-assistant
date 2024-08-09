import { Button, Tooltip } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { userProfileData } from "./CVCreatorUtils/helpers";
import { MouseEvent, useEffect, useReducer, useState } from "react";
import userDetailsListReducer from "../../util/reducers";
// import { UserProfile } from "../../util/types";

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

export default function UserDetailsList({ categoryList, hideAllButtons }) {
  useEffect(() => {
    const userSkillsFromLocalStorage = JSON.parse(
      localStorage.getItem("skills") ?? "[]" //or localStorage.getItem("skills") as string
    );
    console.log(localStorage.getItem("skills"));
    console.log(typeof localStorage.getItem("skills"));
    console.log(userSkillsFromLocalStorage);
    userSkillsFromLocalStorage.forEach((el) => console.log(el));

    //create array with skills objects
    const ownedSkillObjectsArr = userSkillsFromLocalStorage.map((skill) => {
      return {
        name: skill,
        level: 3,
        isEditing: false,
      };
    });

    dispatch({
      type: "fetchFromLocalStorage",
      ownedFromLocalStorage: ownedSkillObjectsArr,
    });
  }, []);

  const listNameCapitalized =
    categoryList !== `hobbies`
      ? `${categoryList[0].toUpperCase()}${categoryList.slice(1, -1)}`
      : `Hobby`;

  const [userData, dispatch] = useReducer(
    userDetailsListReducer,
    userProfileData
  );

  const [isDisabledAddBtn, setIsDisabledAddBtn] = useState(true);
  const [actualRecordUpdated, setActualRecordUpdated] = useState(-1);
  const [showTooltip, setShowTooltip] = useState({
    open: false,
    text: "Empty record",
  });
  const [showActualRecordTooltip, setShowActualRecordTooltip] = useState({
    open: true,
    text: "Empty record",
  });

  console.log(userData);

  const listNameSingular =
    categoryList !== `hobbies` ? `${categoryList.slice(0, -1)}` : `hobby`;
  const newListName = `new${listNameCapitalized}`;
  const addListName = `add${listNameCapitalized}`;
  useEffect(() => {
    if (!userData[newListName].name) {
      setIsDisabledAddBtn(true);
      setShowTooltip((prevValues) => {
        return { open: true, text: "Empty record" };
      });
    }
  }, [userData[newListName].name]);

  useEffect(() => {
    setShowTooltip((prevValues) => {
      return { open: false, text: "Empty record" };
    });
  }, []);

  const handleChangeRatingNewListItem = function (
    rate: number,
    identifier: string,
    index: number = 0
  ) {
    dispatch({
      type: `changeRatingNewListItem`,
      rate: rate,
      identifier: identifier,
    });
  };

  const handleAddNewItemList = function (
    event: MouseEvent<HTMLButtonElement>,
    identifier: string,
    listName: string
  ) {
    dispatch({
      type: `addNewItemList`,
      listName: listName,
      identifier: identifier,
    });
  };

  function hasDuplicates(arr) {
    const localArr = arr.map((el) => el.name.toLowerCase());
    return new Set(localArr).size !== localArr.length;
  }

  const handleBlur = function (categoryList: string, listIndex: number) {
    if (userData[categoryList][actualRecordUpdated]?.name === "") {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });

      dispatch({
        type: `blur`,
        categoryList: categoryList,
        listIndex: listIndex,
      });

      return;
    }

    if (hasDuplicates(userData[categoryList])) {
      setShowActualRecordTooltip({ open: true, text: "Duplicated record" });

      dispatch({
        type: `blur`,
        categoryList: categoryList,
        listIndex: listIndex,
      });

      return;
    }

    dispatch({
      type: `blurCorrectName`,
      categoryList: categoryList,
      listIndex: listIndex,
    });
  };

  const handleUserDetailsKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: string,
    index: number
  ) {
    if (event.key === "Enter") {
      if (userData[inputName][actualRecordUpdated]?.name === "") {
        setShowActualRecordTooltip({ open: true, text: "Empty record" });
        return;
      }

      if (hasDuplicates(userData[inputName])) {
        setShowActualRecordTooltip({ open: true, text: "Duplicated record" });
        return;
      }

      dispatch({
        type: `keyDown`,
        inputName: inputName,
        index: index,
      });
    }
  };

  const handleChangeUserActualInput = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string,
    index: number
  ) {
    if (!event.target.value) {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
    } else {
      setShowActualRecordTooltip({ open: false, text: "Empty record" });
    }

    const isInUserProperty = userData[identifier].filter((el) => {
      return el.name.toLowerCase() === event.target.value.toLowerCase();
    });

    if (isInUserProperty.length > 0 && isInUserProperty[0].name !== "") {
      setShowActualRecordTooltip({ open: true, text: "Duplicated record" });
    }

    const updatedDetail = {
      ...userData[identifier][index],
      name: event.target.value,
    };

    dispatch({
      type: `changeUserActualInput`,
      identifier: identifier,
      index: index,
      updatedDetail: updatedDetail,
    });
  };

  const replaceTextWithInput = function (
    inputName: string,
    listItemIndex: number = 0
  ) {
    setActualRecordUpdated(listItemIndex);

    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

    dispatch({
      type: `replaceTextWithInput`,
      inputName: inputName,
      listItemIndex: listItemIndex,
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

    dispatch({
      type: `delete`,
      identifier: identifier,
      updatedList: updatedList,
    });
  };

  const handleChangeRatingExistingListItem = function (
    rate: number,
    identifier: string,
    index: number
  ) {
    dispatch({
      type: `changeRatingExistingListItem`,
      identifier: identifier,
      index: index,
      rate: rate,
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
      setIsDisabledAddBtn(true);
      setShowTooltip({ open: true, text: "Duplicated record" });
    } else {
      setIsDisabledAddBtn(false);
      setShowTooltip((prevValues) => {
        return { ...prevValues, open: false };
      });
    }

    dispatch({
      type: `changeAddNewListItem`,
      identifier: identifier,
      categoryList: categoryList,
      name: event.target.value,
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
                <Tooltip
                  title={showActualRecordTooltip.text}
                  open={showActualRecordTooltip.open}
                >
                  <InputForm
                    id={listItem.name}
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
                      handleChangeUserActualInput(
                        event,
                        categoryList,
                        listIndex
                      )
                    }
                  />
                </Tooltip>
              ) : (
                <span
                  onClick={() => replaceTextWithInput(categoryList, listIndex)}
                  key={listItem.name + 5}
                  className={styles.wordWrapBreakWord}
                >
                  {listItem.name ? listItem.name : `<empty> ${listIndex}`}
                </span>
              )}
              {categoryList !== "hobbies" ? (
                <RadioGroupRating
                  rate={listItem.level}
                  handleChangeRatingListItem={
                    handleChangeRatingExistingListItem
                  }
                  categoryList={categoryList}
                  index={listIndex}
                />
              ) : (
                <div></div>
              )}
              <Button
                onClick={(event) =>
                  handleDeleteListItem(event, listItem.name, categoryList)
                }
                variant="contained"
                className={
                  hideAllButtons ? styles.hiddenButton : styles.addNewRecordForm
                }
                aria-label={listItem.name}
              >
                <RemoveIcon />
              </Button>
            </div>
          </div>
        );
      })}
      <div className={hideAllButtons ? styles.hideComponent : styles.skillsUI}>
        <InputForm
          id={addListName}
          key={addListName}
          type="text"
          name={addListName}
          value={userData[newListName].name}
          placeholder={`New ${listNameSingular}`}
          className={styles.control}
          onChange={(event) =>
            handleChangeAddNewListItem(event, newListName, categoryList)
          }
        />
        {categoryList !== "hobbies" ? (
          <RadioGroupRating
            rate={userData[newListName].level}
            handleChangeRatingListItem={handleChangeRatingNewListItem}
            categoryList={newListName}
            index={0}
          />
        ) : (
          <div></div>
        )}
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
            aria-label={`AddNew${listNameCapitalized}`}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
