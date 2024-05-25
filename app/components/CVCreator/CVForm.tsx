import styles from "./CVForm.module.css";
import Image from "next/image";
import frog from "../../../public/cv_creator.jpg";
import { useState, useRef, useEffect, useReducer, act } from "react";
import InputForm from "./InputForm/InputForm";
import Button from "@mui/material/Button";
import RadioGroupRating from "../Rating";
import Modal from "./ModalDialog";
import * as React from "react";
import setIsEditingItem, {
  setIsEditingItemInSet,
} from "./CVCreatorUtils/helpers";

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
      return { ...state, isEditingHobbies: !state.isEditingHobbies }; // SHOULD UPDATE THE CHANGING STATE OF ISEDITING OBJECT => isEditingStates
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

    //////////////////////////////////////////// UPDATE UI ON RATING!!!//////////////////////////////////////////////////////////////////
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
    console.log();
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

  ///////////////////// UPDATE RATING UI UPDATES /////////////////////

  const handleChangeRatingExistingSkill = function (rate, index) {
    console.log(`Rating `, rate, index);
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        skills: [
          ...prevValues.skills.slice(0, index),
          { ...prevValues.skills[index], level: rate },
          ...prevValues.skills.slice(index + 1),
        ],
      };
    });
  };

  const handleChangeRatingNewSkill = function (
    rate,
    editNewSkill = false,
    index = 0
  ) {
    console.log(`Rating `, rate);
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        newSkill: { ...prevValues.newSkill, level: rate },
      };
    });
  };

  const handleChangeRatingExistingLanguage = function (rate, index) {
    console.log(`Rating `, rate, index);
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        languages: [
          ...prevValues.languages.slice(0, index),
          { ...prevValues.languages[index], level: rate },
          ...prevValues.languages.slice(index + 1),
        ],
      };
    });
  };

  const handleChangeRatingNewLanguage = function (
    rate,
    editNewSkill = false,
    index = 0
  ) {
    console.log(`Rating `, rate);
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        newLanguage: { ...prevValues.newLanguage, level: rate },
      };
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
          <h3>Skills</h3>
          {/* //////////// SKILLS //////////// */}
          {userProfileValues.skills.map((skill, index) => {
            return (
              <div
                key={index}
                className={styles.skillsUI}
                style={{ backgroundColor: "yellowgreen" }}
              >
                {userProfileValues.skills[index].isEditing ? (
                  <InputForm
                    key={skill.name}
                    type="text"
                    name={skill.name}
                    value={skill.name}
                    className={styles.control}
                    autoFocus
                    onBlur={() =>
                      dispatch({ inputType: "skills", listItemIndex: index })
                    }
                    onKeyDown={(event) =>
                      handleUserDetailsKeyDown(event, "skills", index)
                    }
                    onChange={(event) =>
                      handleChangeUserActualInput(event, "skills", index)
                    }
                  />
                ) : (
                  <span
                    onClick={() => replaceTextWithInput("skills", index)}
                    key={skill.name}
                  >
                    {skill.name}
                  </span>
                )}
                <RadioGroupRating
                  rate={skill.level}
                  handleChangeRatingSkill={handleChangeRatingExistingSkill}
                  index={index}
                />
                <Button
                  onClick={(event) =>
                    handleDeleteListItem(event, skill.name, "skills")
                  }
                  variant="contained"
                >
                  -
                </Button>
              </div>
            );
          })}

          <div className={styles.skillsUI}>
            <InputForm
              key={"addSkill"}
              type="text"
              name={"addSkill"}
              value={userProfileValues.newSkill.name}
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
          </div>
          {/* //////////////////////////////////  LANGUAGES ////////////////////////////////// */}
          <h3>Languages</h3>
          {userProfileValues.languages.map((language, index) => {
            return (
              <div
                key={index}
                className={styles.skillsUI}
                style={{ backgroundColor: "yellowgreen" }}
              >
                {userProfileValues.languages[index].isEditing ? (
                  <InputForm
                    key={language.name}
                    type="text"
                    name={language.name}
                    value={language.name}
                    className={styles.control}
                    autoFocus
                    onBlur={() =>
                      dispatch({ inputType: "languages", listItemIndex: index })
                    }
                    onKeyDown={(event) =>
                      handleUserDetailsKeyDown(event, "languages", index)
                    }
                    onChange={(event) =>
                      handleChangeUserActualInput(event, "languages", index)
                    }
                  />
                ) : (
                  <span
                    onClick={() => replaceTextWithInput("languages", index)}
                    key={language.name}
                  >
                    {language.name}
                  </span>
                )}
                <RadioGroupRating
                  rate={language.level}
                  handleChangeRatingSkill={handleChangeRatingExistingLanguage}
                  index={index}
                />
                <Button
                  onClick={(event) =>
                    handleDeleteListItem(event, language.name, "languages")
                  }
                  variant="contained"
                >
                  -
                </Button>
              </div>
            );
          })}
          <div className={styles.addRecordContainer}>
            <InputForm
              key={"addLanguage"}
              type="text"
              name={"addLanguage"}
              onChange={(event) =>
                handleChangeAddNewListItem(event, "newLanguage")
              }
              placeholder={"Language level"}
              value={userProfileValues.newLanguage.name}
              className={styles.control}
              autoFocus
            />
            <RadioGroupRating
              rate={3}
              handleChangeRatingSkill={handleChangeRatingNewLanguage}
              index={0}
            />

            <Button
              onClick={(event) =>
                handleAddNewItemList(event, "newLanguage", "languages")
              }
              variant="contained"
            >
              +
            </Button>
          </div>
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
