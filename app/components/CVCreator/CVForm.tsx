import styles from "./CVForm.module.css";
import Image from "next/image";
import frog from "../../../public/cv_creator.jpg";
import { useState, useRef, useEffect, useReducer } from "react";
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

  const [showSlider, setShowSlider] = useState(false);

  const isEditingStates = {
    isEditingName: false,
    isEditingSurname: false,
    isEditingAddress: false,
    isEditingEmail: false,
    isEditingPhone: false,
    isEditingGithub: false,
    isEditingLinkedin: false,
  };

  const reducer = function (state, action) {
    // console.log(state);
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
  };

  const [isEditingInput, dispatch] = useReducer(reducer, isEditingStates);
  console.log(`CVForm rendered`);
  console.log(inputValues);
  const handleSubmit = function (e) {
    console.log(`Handle submit`);
    console.log(inputValues);

    const fd = new FormData(e.target);
    const inputData = Object.fromEntries(fd.entries());
    console.log(inputData);

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

  const replaceTextWithInput = function (inputName: string) {
    dispatch({ inputType: inputName });
  };

  return (
    <>
      <form action="" className={styles.form}>
        <div className={(styles.section, styles.aside)}>
          <div className={(styles.section, styles.aboutDetails)}>
            <Image
              alt="person"
              src={frog}
              sizes="100vw"
              style={{
                width: "50%",
                height: "auto",
                margin: "1rem auto",
              }}
            />
            {Object.entries(inputValues).map(([key, value]) => {
              // return isEditingInput.isEditingName ? ( // <====== poprawić żeby było dynamicznie np tworzy liste isEditing + key z pierwsza litera uppercase
              return isEditingInput[
                `isEditing${key[0].toUpperCase()}${key.slice(1)}`
              ] ? (
                <>
                  <div className={styles.detailsBox}>
                    <label htmlFor={key}>
                      {`${key[0].toUpperCase()}${key.slice(1)}`}
                    </label>
                    <InputForm
                      key={key}
                      type="text"
                      name={key}
                      id="inputName"
                      onChange={(event) => handleInputChange(key, event)}
                      value={inputValues[key]}
                      className={styles.control}
                      onBlur={() => dispatch({ inputType: key })}
                      autoFocus
                      onKeyDown={(event) => handleKeyDown(event, key)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.detailsBox}>
                    <label style={{ marginRight: "1rem" }} htmlFor={key}>
                      {`${key[0].toUpperCase()}${key.slice(1)}`}
                    </label>
                    <span onClick={() => replaceTextWithInput(key)}>
                      {inputValues[key]}
                    </span>
                  </div>
                </>
              );
            })}
            <h3>Skills</h3>
            <div className={styles.skillsUI}>
              <span>English</span> <span>B2</span>
              <TextField
                id="outlined-basic"
                label="Language"
                variant="outlined"
                size="small"
              />
              {/* {showSlider ? <InputSlider /> : <h4>Progress bar</h4>} */}
              {showSlider ? <InputSlider /> : <RadioGroupRating />}
            </div>

            <h3>Languages</h3>
            <div className={styles.languageUI}>
              <span>English</span> <span>B2</span>
            </div>
            <div className={styles.addLanguageContainer}>
              <TextField
                id="outlined-basic"
                label="Language"
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Language"
                variant="outlined"
                size="small"
              />

              <Button variant="contained">+</Button>
            </div>

            <h3>Hobbies</h3>
            <div className={styles.hobbiesUI}>
              <span>Wypasanie owiec</span>
            </div>
            <div className={styles.hobbiesBox}>
              <TextField
                id="outlined-basic"
                label="Language"
                variant="outlined"
                size="small"
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
    </>
  );
}
