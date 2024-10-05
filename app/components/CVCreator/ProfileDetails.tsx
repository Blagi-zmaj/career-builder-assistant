import { Button, Tooltip } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import { hasDuplicates } from "./CVCreatorUtils/helpers";
import { MouseEvent, useState } from "react";
import {
  // userProfileData,
  // getDataFromLocalStorage,
  updateTableRecordInDatabase,
} from "./CVCreatorUtils/helpers";

export default function ProfileDetails({
  hideAllButtons,
  listItem,
  showActualRecordTooltip,
  categoryList,
  listIndex,
  actualRecordUpdated,
  setShowActualRecordTooltip,
  replaceTextWithInput,
  userData,
  dispatch,
  actualRecord,
  setRecordToChange,
}) {
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

    updateTableRecordInDatabase("delete", identifier, skillName);
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
    updateTableRecordInDatabase(
      "update",
      identifier,
      userData[identifier][index],
      "rate",
      rate
    );
  };

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

    updateTableRecordInDatabase(
      "update",
      categoryList,
      {
        ...userData[categoryList][listIndex],
        oldName: actualRecord,
      },
      "custom_skill_name"
    );
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

      updateTableRecordInDatabase(
        "update",
        inputName,
        {
          ...userData[inputName][index],
          oldName: actualRecord,
        },
        "custom_skill_name"
      );
    }
  };

  return (
    <div
      className={hideAllButtons ? styles.skillsUIWithoutBtns : styles.skillsUI}
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
              handleChangeUserActualInput(event, categoryList, listIndex)
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
          handleChangeRatingListItem={handleChangeRatingExistingListItem}
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
  );
}
