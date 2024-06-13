import { Button } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";
import { alignProperty } from "@mui/material/styles/cssUtils";

export default function UserDetailsList({
  categoryList,
  userData,
  handleBlur,
  handleUserDetailsKeyDown,
  handleChangeUserActualInput,
  replaceTextWithInput,
  handleDeleteListItem,
  handleChangeRatingExistingListItem,
  handleChangeAddNewListItem,
  handleChangeRatingNewListItem,
  handleAddNewItemList,
  hideAllButtons,
}) {
  const listNameCapitalized = `${categoryList[0].toUpperCase()}${categoryList.slice(
    1,
    -1
  )}`;
  const listNameSingular = `${categoryList.slice(0, -1)}`;
  const newListName = `new${listNameCapitalized}`;
  const addListName = `add${listNameCapitalized}`;

  return (
    <>
      {userData[categoryList].map((listItem, listIndex) => {
        return (
          <div key={categoryList + listIndex}>
            <div
              className={
                hideAllButtons ? styles.skillsUIWithoutBtns : styles.skillsUI
              }
              style={{ backgroundColor: "yellowgreen" }}
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
                className={hideAllButtons ? styles.hiddenButton : null}
              >
                -
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
              `new${categoryList[0].toUpperCase()}${categoryList.slice(1, -1)}`
            )
          }
        />
        <RadioGroupRating
          rate={userData[newListName].level}
          handleChangeRatingListItem={handleChangeRatingNewListItem}
          categoryList={newListName}
          index={0}
        />
        <Button
          onClick={(event) =>
            handleAddNewItemList(event, newListName, categoryList)
          }
          variant="contained"
          className={hideAllButtons ? styles.hiddenButton : null}
        >
          +
        </Button>
      </div>
    </>
  );
}
