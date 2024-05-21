import styles from "./CVForm.module.css";
import Image from "next/image";
import frog from "../../../public/cv_creator.jpg";
import { useState, useRef, useEffect, useReducer, act } from "react";
import InputForm from "./InputForm/InputForm";
import FormPropsTextFields from "../InputTextField";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Select from "../Select";
import InputSlider from "../InputSlider";
import LinearProgressWithLabel from "../ProgressBar";
import RadioGroupRating from "../Rating";

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
    newSkill: { name: "Python", level: 1, isEditing: false },
    newLanguage: { name: "English", level: "B2", isEditing: false },
    newHobby: { name: "Googlowanie" },
    skills: [
      { name: "Machine", level: 1, isEditing: false },
      { name: "Deep", level: 2, isEditing: false },
      { name: "Data", level: 4, isEditing: false },
    ],
    languages: [{ name: "English", level: "B2", isEditing: false }],
    hobbies: [{ name: "Googlowanie" }],
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
    // add status for languages, hobbies and skills
  };

  const reducer = function (state, action) {
    if (action.inputType === "name") {
      return { ...state, isEditingName: !state.isEditingName };
    }

    if (action.inputType === "surname") {
      return { ...state, isEditingSurname: !state.isEditingSurname };
    }

    if (action.inputType === "address") {
      return { ...state, isEditingAddress: !state.isEditingAddress };
    }

    if (action.inputType === "email") {
      return { ...state, isEditingEmail: !state.isEditingEmail };
    }

    if (action.inputType === "phone") {
      return { ...state, isEditingPhone: !state.isEditingPhone };
    }

    if (action.inputType === "github") {
      return { ...state, isEditingGithub: !state.isEditingGithub };
    }

    if (action.inputType === "linkedin") {
      return { ...state, isEditingLinkedin: !state.isEditingLinkedin };
    }

    if (action.inputType === "skills") {
      // console.log(userProfileValues.skills[action.listItemIndex]);
      // console.log(`Editing skill ${action.listItemIndex}`);
      console.log(userProfileValues.skills);
      console.log(action.listItemIndex);
      console.log(userProfileValues.skills[action.listItemIndex]);

      const updatedOneSkill = {
        ...userProfileValues.skills[action.listItemIndex],
        isEditing: !userProfileValues.skills[action.listItemIndex].isEditing,
      };
      const updatedSkills = [
        ...userProfileValues.skills.slice(0, action.listItemIndex),
        updatedOneSkill,
        ...userProfileValues.skills.slice(action.listItemIndex + 1),
      ];

      // console.log(updatedSkills);
      setUserProfileValues((prevValues) => {
        return { ...prevValues, skills: updatedSkills };
      });

      return state;
    }

    if (action.inputType === "languages") {
      console.log(`Editing languages`);
      return state;
    }

    if (action.inputType === "hobbies") {
      console.log(`Editing skills`);
      return state;
    }
  };

  const [isEditingInput, dispatch] = useReducer(reducer, isEditingStates);
  const handleSubmit = function (e) {
    const fd = new FormData(e.target);
    const inputData = Object.fromEntries(fd.entries());
    e.preventDefault();
  };

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

  // const handleUserSkills = function (event, identifier, index) {
  //   console.log(userProfileValues.skills);
  //   console.log(identifier);
  //   const updatedDetail = {
  //     ...userProfileValues.skills[index],
  //     name: event.target.value,
  //   };
  //   console.log(updatedDetail);

  //   setUserProfileValues((prevValues) => {
  //     return {
  //       ...prevValues,
  //       skills: [
  //         ...prevValues.skills.slice(0, index),
  //         updatedDetail,
  //         ...prevValues.skills.slice(index + 1),
  //       ],
  //     };
  //   });
  // };

  const handleUserDetails = function (event, identifier, index) {
    console.log(userProfileValues.skills);
    console.log(identifier);
    const updatedDetail = {
      ...userProfileValues.skills[index],
      name: event.target.value,
    };
    console.log(updatedDetail);

    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [identifier]: [
          ...prevValues.skills.slice(0, index),
          updatedDetail,
          ...prevValues.skills.slice(index + 1),
        ],
      };
    });
  };

  const handleDeleteSkill = function (event, skillName) {
    console.log(`Delete item `);
    console.log(skillName);

    const updatedList = userProfileValues.skills.filter((el) => {
      return el.name !== skillName;
    });

    console.log(updatedList);

    setUserProfileValues((prevValues) => {
      return { ...prevValues, skills: updatedList };
    });
  };

  const handleAddSkill = function (event, identifier) {
    console.log(`Handle add skill`);

    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        skills: [...prevValues.skills, prevValues.newSkill],
      };
    });
  };

  const handleChangeAddSkill = function (event) {
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        newSkill: {
          ...prevValues.newSkill,
          name: event.target.value,
        },
      };
    });
  };

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

  console.log(
    `=========================================================================================`
  );
  // console.table(userProfileValues.skills);
  // console.table(userProfileValues.languages);
  // console.table(userProfileValues.hobbies);
  // console.log(userProfileValues.newSkill);
  //
  console.table(userProfileValues.skills);

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
                    // onChange={(event) =>
                    //   handleUserSkills(event, skill.name, index)
                    // }
                    onChange={(event) =>
                      handleUserDetails(event, "skills", index)
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
                  onClick={(event) => handleDeleteSkill(event, skill.name)}
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
              className={styles.control}
              onChange={(event) => handleChangeAddSkill(event)}
            />
            <RadioGroupRating
              rate={3}
              handleChangeRatingSkill={handleChangeRatingNewSkill}
              index={0}
            />
            <Button
              onClick={(event) => handleAddSkill(event, "newSkill")}
              variant="contained"
            >
              +
            </Button>
          </div>
          <h3>Languages</h3>
          <div className={styles.languageUI}>
            <span>English</span> <span>B2</span>
          </div>
          <div className={styles.addRecordContainer}>
            <InputForm
              key={"addLanguage"}
              type="text"
              name={"addLanguage"}
              onChange={() => {}}
              value=""
              className={styles.control}
              onBlur={() => {}}
              autoFocus
              onKeyDown={() => {}}
            />
            <InputForm
              key={"addLanguageLevel"}
              type="text"
              name={"addLanguageLevel"}
              value=""
              className={styles.control}
              onChange={() => {}}
              onBlur={() => {}}
              autoFocus
              onKeyDown={() => {}}
            />

            <Button variant="contained">+</Button>
          </div>
          <h3>Hobbies</h3>
          <div className={styles.hobbiesUI}>
            <span>Wypasanie owiec</span>
          </div>
          <div className={styles.hobbiesBox}>
            {/* <TextField
              id="outlined-basic"
              label="Language"
              variant="outlined"
              size="small"
            /> */}
            <InputForm
              key={"addHobby"}
              type="text"
              name={"addHobby"}
              // onChange={(event) => handleInputChange("addSkill", event)}
              value="hobby"
              className={styles.control}
              onChange={() => {}}
              // onBlur={() => dispatch({ inputType: "addSkill" })}
              // autoFocus
              // onKeyDown={(event) => handleKeyDown(event, "addSkill")}
            />

            <Button variant="contained">+</Button>
          </div>
        </div>
      </div>

      <div className={(styles.section, styles.summary)}>Summary</div>
      <div className={(styles.section, styles.education)}>Education</div>
      <div className={(styles.section, styles.experience)}>Experience</div>
      <div className={(styles.section, styles.projects)}>Projects</div>
    </form>
  );
}
