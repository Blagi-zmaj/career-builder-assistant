import styles from "./CVForm.module.css";
import Image from "next/image";
import frog from "../../../public/cv_creator.jpg";
import { useState, useRef, useEffect, useReducer, act } from "react";
import InputForm from "./InputForm/InputForm";
import Button from "@mui/material/Button";
import Modal from "./ModalDialog";
import * as React from "react";
import setIsEditingItem, {
  setIsEditingItemInSet,
} from "./CVCreatorUtils/helpers";
import UserDetailsList from "./UserDetailsList";

///////////////////////////////////////////

export default function CVForm() {
  const [inputValues, setInputValues] = useState({
    name: "Daniel",
    surname: "Konieczny",
    address: "Jaworzno",
    email: "d@debugger.com",
    phone: "111-111-111",
    github: "Blagi-zmaj.github.com",
    linkedin: "daniel.konieczny.linkedin.com",
  });

  const [userProfileValues, setUserProfileValues] = useState({
    newSkill: { name: "", level: 3, isEditing: false },
    newLanguage: { name: "", level: 3, isEditing: false },
    newHobby: { name: "", isEditing: false },
    skills: [
      { name: "Machine", level: 1, isEditing: false },
      { name: "Deep", level: 2, isEditing: false },
      { name: "Data", level: 4, isEditing: false },
    ],
    languages: [
      { name: "English", level: 2, isEditing: false },
      { name: "French", level: 3, isEditing: false },
    ],
    hobbies: [
      { name: "Googlowanie", isEditing: false },
      { name: "Wypasanie owiec", isEditing: false },
    ],
    education: [{ title: "", startDate: "", endDate: "", description: "" }],
    experience: [{ title: "", startDate: "", endDate: "", description: "" }],
  });

  const isEditingStates = {
    isEditingName: false,
    isEditingSurname: false,
    isEditingAddress: false,
    isEditingEmail: false,
    isEditingPhone: false,
    isEditingGithub: false,
    isEditingLinkedin: false,
    isEditingSkills: false,
    isEditingLanguages: false,
    isEditingHobbies: false,
  };

  // console.log(
  //   `=====================================================================`
  // );
  console.table(inputValues);
  console.table(userProfileValues.skills);
  console.table(userProfileValues.languages);
  console.table(userProfileValues.hobbies);
  // console.log(
  //   userProfileValues.newSkill,
  //   userProfileValues.newLanguage,
  //   userProfileValues.newHobby
  // );
  // console.log(
  //   `=====================================================================`
  // );

  const reducer = function (state, action) {
    if (action.inputType === "skills") {
      setUserProfileValues(
        setIsEditingItemInSet(userProfileValues, action.listItemIndex, "skills")
      );
      return { ...state, isEditingSkills: !state.isEditingSkills };
    }

    if (action.inputType === "languages") {
      setUserProfileValues(
        setIsEditingItemInSet(
          userProfileValues,
          action.listItemIndex,
          "languages"
        )
      );
      return { ...state, isEditingLanguages: !state.isEditingLanguages };
    }

    if (action.inputType === "hobbies") {
      setUserProfileValues(
        setIsEditingItemInSet(
          userProfileValues,
          action.listItemIndex,
          "hobbies"
        )
      );
      return { ...state, isEditingHobbies: !state.isEditingHobbies };
    }
    return setIsEditingItem(state, action.inputType);
  };

  const [isEditingInput, dispatch] = useReducer(reducer, isEditingStates);

  const handleInputChange = function (identifier, event) {
    setInputValues((prevValues) => {
      return { ...prevValues, [identifier]: event.target.value };
    });
  };

  const handleKeyDown = function (event, inputName) {
    if (event.key === "Enter") {
      dispatch({ inputType: inputName });
    }
  };

  const handleUserDetailsKeyDown = function (event, inputName, index) {
    if (event.key === "Enter") {
      dispatch({ inputType: inputName, listItemIndex: index });
    }
  };

  const replaceTextWithInput = function (
    inputName: string,
    listItemIndex: number = 0
  ) {
    dispatch({ inputType: inputName, listItemIndex: listItemIndex });
  };

  const handleChangeUserActualInput = function (event, identifier, index) {
    console.log(userProfileValues.skills);
    console.log(identifier);
    const updatedDetail = {
      ...userProfileValues[identifier][index],
      name: event.target.value,
    };
    console.log(updatedDetail);

    setUserProfileValues((prevValues) => {
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

  const handleDeleteListItem = function (event, skillName, identifier) {
    console.log(`Delete item ${skillName}`);
    console.log(skillName);

    const updatedList = userProfileValues[identifier].filter((el) => {
      return el.name !== skillName;
    });

    console.log(updatedList);

    setUserProfileValues((prevValues) => {
      return { ...prevValues, [identifier]: updatedList };
    });
  };

  const handleAddNewItemList = function (event, identifier, listName) {
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [listName]: [...prevValues[listName], prevValues[identifier]],
      };
    });
  };

  const handleChangeAddNewListItem = function (event, identifier) {
    console.log(identifier);
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [identifier]: {
          ...prevValues[identifier],
          name: event.target.value,
        },
      };
    });
  };

  const handleChangeRatingExistingListItem = function (
    rate,
    identifier,
    index
  ) {
    console.log(`Rating `, rate, index, identifier);
    setUserProfileValues((prevValues) => {
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

  const handleChangeRatingNewListItem = function (rate, identifier, index = 0) {
    console.log(`Rating `, rate, identifier);
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [identifier]: { ...prevValues[identifier], level: rate },
      };
    });
  };

  const handleBlur = function (categoryList, listIndex) {
    dispatch({
      inputType: categoryList,
      listItemIndex: listIndex,
    });
  };

  return (
    <form action="" className={styles.form}>
      <div className={(styles.section, styles.aside)}>
        <div className={(styles.section, styles.aboutDetails)}>
          <Image
            key="image"
            alt="person"
            src={frog}
            sizes="100vw"
            style={{
              width: "50%",
              height: "auto",
              margin: "1rem auto",
            }}
          />
          {Object.entries(inputValues).map(([key, value], index) => {
            if (key === "hobbies" || key === "languages" || key === "skills")
              return;

            return isEditingInput[
              `isEditing${key[0].toUpperCase()}${key.slice(1)}`
            ] ? (
              <div className={styles.detailsBox} key={key}>
                <label htmlFor={key}>
                  {`${key[0].toUpperCase()}${key.slice(1)}`}
                </label>
                <InputForm
                  key={key}
                  type="text"
                  name={key}
                  onChange={(event) => handleInputChange(key, event)}
                  value={inputValues[key]}
                  className={styles.control}
                  onBlur={() => dispatch({ inputType: key })}
                  autoFocus
                  onKeyDown={(event) => handleKeyDown(event, key)}
                />
              </div>
            ) : (
              <div className={styles.detailsBox} key={key}>
                <label style={{ marginRight: "1rem" }} htmlFor={key}>
                  {`${key[0].toUpperCase()}${key.slice(1)}`}
                </label>
                <span onClick={() => replaceTextWithInput(key, index)}>
                  {inputValues[key]}
                </span>
              </div>
            );
          })}

          {["skills", "languages"].map((categoryList, indexCategory) => {
            return (
              <div key={categoryList}>
                <h3>{categoryList}</h3>
                <UserDetailsList
                  categoryList={categoryList}
                  userData={userProfileValues}
                  handleBlur={handleBlur}
                  handleUserDetailsKeyDown={handleUserDetailsKeyDown}
                  handleChangeUserActualInput={handleChangeUserActualInput}
                  replaceTextWithInput={replaceTextWithInput}
                  handleDeleteListItem={handleDeleteListItem}
                  handleChangeRatingExistingListItem={
                    handleChangeRatingExistingListItem
                  }
                  handleChangeAddNewListItem={handleChangeAddNewListItem}
                  handleChangeRatingNewListItem={handleChangeRatingNewListItem}
                  handleAddNewItemList={handleAddNewItemList}
                />
              </div>
            );
          })}

          {/* //////////////////////////////////  HOBBIES ////////////////////////////////// */}

          <h3>Hobbies</h3>
          {userProfileValues.hobbies.map((hobby, index) => {
            return (
              <div
                key={index}
                className={styles.skillsUI}
                style={{ backgroundColor: "yellowgreen" }}
              >
                {userProfileValues.hobbies[index].isEditing ? (
                  <InputForm
                    key={hobby.name}
                    type="text"
                    name={hobby.name}
                    value={hobby.name}
                    className={styles.control}
                    placeholder={"New hobby"}
                    autoFocus
                    onBlur={() =>
                      dispatch({ inputType: "hobbies", listItemIndex: index })
                    }
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
                  >
                    {hobby.name}
                  </span>
                )}
                <Button
                  onClick={(event) =>
                    handleDeleteListItem(event, hobby.name, "hobbies")
                  }
                  variant="contained"
                >
                  -
                </Button>
              </div>
            );
          })}
          <div className={styles.hobbiesBox}>
            <InputForm
              key={"addHobby"}
              type="text"
              name={"addHobby"}
              value={userProfileValues.newHobby.name}
              className={styles.control}
              onChange={(event) =>
                handleChangeAddNewListItem(event, "newHobby")
              }
            />

            <Button
              onClick={(event) =>
                handleAddNewItemList(event, "newHobby", "hobbies")
              }
              variant="contained"
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className={(styles.section, styles.education)}>
        Education
        <br />
        <br />
        <Modal />
      </div>
      <div className={(styles.section, styles.experience)}>Experience</div>
    </form>
  );
}
