import { Button } from "@mui/material";
import InputForm from "./InputForm/InputForm";
import RadioGroupRating from "../Rating";
import styles from "./CVForm.module.css";

export default function UserDetailsList({
  categoryList,
  userData,
  handleBlur,
  handleUserDetailsKeyDown,
  handleChangeUserActualInput,
  replaceTextWithInput,
  handleDeleteListItem,
  handleChangeRatingExistingSkill,
  handleChangeAddNewListItem,
  handleChangeRatingNewSkill,
  handleAddNewItemList,
}) {
  const listNameCapitalized = `${categoryList[0].toUpperCase()}${categoryList.slice(
    1,
    -1
  )}`;
  const listNameSingular = `${categoryList.slice(0, -1)}`;
  const newListName = `new${listNameCapitalized}`;
  const addListName = `add${listNameCapitalized}`;

  // console.log(listNameCapitalized, listNameSingular, newListName, addListName);

  return (
    <>
      {userData[categoryList].map((listItem, listIndex) => {
        return (
          <div key={categoryList + listIndex}>
            <div
              className={styles.skillsUI}
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
                  {listItem.name}
                </span>
              )}
              <RadioGroupRating
                rate={listItem.level}
                handleChangeRatingSkill={handleChangeRatingExistingSkill}
                index={listIndex}
              />
              <Button
                onClick={(event) =>
                  handleDeleteListItem(event, listItem.name, categoryList)
                }
                variant="contained"
              >
                -
              </Button>
            </div>
            {/* <div className={styles.skillsUI}>
              <InputForm
                key={"addSkill"}
                type="text"
                name={"addSkill"}
                value={userData.newSkill.name}
                placeholder={"New skill"}
                className={styles.control}
                onChange={(event) =>
                  handleChangeAddNewListItem(event, "newSkill")
                }
              />
              <RadioGroupRating
                rate={3}
                handleChangeRatingSkill={handleChangeRatingNewSkill}
                index={0}
              />
              <Button
                onClick={(event) =>
                  handleAddNewItemList(event, "newSkill", "skills")
                }
                variant="contained"
              >
                +
              </Button>
            </div> */}
          </div>
        );
      })}

      {/* listNameCapitalized, listNameSingular, newListName, addListName */}

      {/* categoryList */}
      <div className={styles.skillsUI}>
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
          rate={3}
          handleChangeRatingSkill={handleChangeRatingNewSkill}
          index={0}
        />
        <Button
          onClick={(event) =>
            handleAddNewItemList(event, newListName, categoryList)
          }
          variant="contained"
        >
          +
        </Button>
      </div>
    </>
  );
}
