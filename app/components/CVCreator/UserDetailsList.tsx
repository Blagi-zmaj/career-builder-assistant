import { Button, Tooltip } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import {
  userProfileData,
  getDataFromLocalStorage,
} from "./CVCreatorUtils/helpers";
import { MouseEvent, useEffect, useReducer, useState } from "react";
import userDetailsListReducer from "../../util/reducers";
import ProfileDetails from "./ProfileDetails";

export default function UserDetailsList({ categoryList, hideAllButtons }) {
  useEffect(() => {
    const userSkillsFromLocalStorage = getDataFromLocalStorage("skills");
    console.log(userSkillsFromLocalStorage);
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
