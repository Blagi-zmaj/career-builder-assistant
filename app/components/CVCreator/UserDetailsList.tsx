import { Button, Tooltip } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { userProfileData } from "./CVCreatorUtils/helpers";
import { MouseEvent, useEffect, useReducer, useState } from "react";
import userDetailsListReducer from "@/app/util/reducers";

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
  const listNameCapitalized =
    categoryList !== `hobbies`
      ? `${categoryList[0].toUpperCase()}${categoryList.slice(1, -1)}`
      : `Hobby`;

  // const [localUserData, dispatch] = useReducer(
  //   userDetailsListReducer,
  //   userProfileData
  // );
  const [userData, setUserData] = useState<UserProfile>(userProfileData);
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
    // dispatch({
    //   type: `changeRatingNewListItem`,
    //   rate: rate,              // check if i works with rate instead of rate:rate
    //   identifier: identifier
    // })

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

  function hasDuplicates(arr) {
    const localArr = arr.map((el) => el.name.toLowerCase());
    return new Set(localArr).size !== localArr.length;
  }

  const handleBlur = function (categoryList: string, listIndex: number) {
    if (userData[categoryList][actualRecordUpdated]?.name === "") {
      setShowActualRecordTooltip({ open: true, text: "Empty record" });
      setUserData((prevValues) => {
        const newData = {
          ...prevValues,
          [categoryList]: [
            ...prevValues[categoryList].slice(0, listIndex),
            {
              ...prevValues[categoryList][listIndex],
              isEditing: !prevValues[categoryList][listIndex].isEditing,
              name: "ADD OR DELETE!",
            },
            ...prevValues[categoryList].slice(listIndex + 1),
          ],
        };
        // console.log(newData);
        return newData;
      });

      return;
    }

    // console.log(hasDuplicates(userData[categoryList]));
    if (hasDuplicates(userData[categoryList])) {
      setShowActualRecordTooltip({ open: true, text: "Duplicated record" });
      setUserData((prevValues) => {
        const newData = {
          ...prevValues,
          [categoryList]: [
            ...prevValues[categoryList].slice(0, listIndex),
            {
              ...prevValues[categoryList][listIndex],
              isEditing: !prevValues[categoryList][listIndex].isEditing,
              name: "CHANGE OR DELETE!",
            },
            ...prevValues[categoryList].slice(listIndex + 1),
          ],
        };
        // console.log(newData);
        return newData;
      });
      return;
    }

    // console.log(`handleBlur`);
    // console.log(categoryList, listIndex);
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
      // console.log(newData);
      return newData;
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
    setActualRecordUpdated(listItemIndex);

    setShowActualRecordTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

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
      // console.log(newData);
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
      // console.log(`userData[identifier] !== ""`);
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

  // console.log(`==================${categoryList}================`);
  // userData[categoryList].forEach((el) => {
  //   console.log(`${el.name} ${el.level ?? 0}`);
  // });

  console.table(userData[categoryList]);

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
            handleChangeAddNewListItem(
              event,
              // `new${categoryList[0].toUpperCase()}${categoryList.slice(1, -1)}`,
              newListName,
              categoryList
            )
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
