import { Button, Tooltip } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import {
  userProfileData,
  getDataFromLocalStorage,
  updateTableRecordInDatabase,
} from "./CVCreatorUtils/helpers";
import { MouseEvent, useEffect, useReducer, useState } from "react";
import userDetailsListReducer from "../../util/reducers";
import ProfileDetails from "./ProfileDetails";

export default function UserDetailsList({ categoryList, hideAllButtons }) {
  useEffect(() => {
    async function fetchDataFromDatabase() {
      try {
        const responses = await Promise.all([
          await fetch("pages/api/skills", {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }),
          await fetch("pages/api/languages", {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }),
          await fetch("pages/api/hobbies", {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }),
        ]);

        const dataArr = await Promise.all(
          responses.map((response) => response.json())
        );

        const [skills, languages, hobbies] = dataArr;
        console.log(skills, languages, hobbies);

        const updatedHobbies = hobbies.map((hobby) => {
          return {
            name: hobby.name,
            isEditing: false,
          };
        });

        const recordsForSite = [skills, languages].map((data) => {
          return data.map((attr) => {
            return { name: attr.name, level: attr.rate, isEditing: false };
          });
        });

        dispatch({
          type: "fetchFromDatabase",
          ownedFromDatabase: [...recordsForSite, updatedHobbies],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataFromDatabase();
  }, []);

  const listNameCapitalized =
    categoryList !== `hobbies`
      ? `${categoryList[0].toUpperCase()}${categoryList.slice(1, -1)}`
      : `Hobby`;

  const [userData, dispatch] = useReducer(userDetailsListReducer, {
    newSkill: userProfileData.newSkill,
    newLanguage: userProfileData.newLanguage,
    newHobby: userProfileData.newHobby,
    skills: userProfileData.skills,
    languages: userProfileData.languages,
    hobbies: userProfileData.hobbies,
  });
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
      setShowTooltip(() => {
        return { open: true, text: "Empty record" };
      });
    }
  }, [userData[newListName].name]);

  useEffect(() => {
    setShowTooltip(() => {
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

    console.log(userData[identifier]);
    updateTableRecordInDatabase("create", listName, userData[identifier]);
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
            <ProfileDetails
              hideAllButtons={hideAllButtons}
              listItem={listItem}
              showActualRecordTooltip={showActualRecordTooltip}
              categoryList={categoryList}
              listIndex={listIndex}
              actualRecordUpdated={actualRecordUpdated}
              setShowActualRecordTooltip={setShowActualRecordTooltip}
              replaceTextWithInput={replaceTextWithInput}
              userData={userData}
              dispatch={dispatch}
            />
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
