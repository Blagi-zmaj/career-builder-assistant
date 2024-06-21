import styles from "./CVForm.module.css";
import Image from "next/image";
import frog from "../../../public/cv_creator.jpg";
import {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
  act,
} from "react";
import InputForm from "./InputForm/InputForm";
import Button from "@mui/material/Button";
import Modal from "./ModalDialog";
import * as React from "react";
import setIsEditingItem, {
  setIsEditingItemInSet,
} from "./CVCreatorUtils/helpers";
import UserDetailsList from "./UserDetailsList";
import DatePicker from "./DatePicker";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import ImageUpload from "../ImageUpload";
import html2pdf from "html2pdf.js";
import { NavAndDrawerContext } from "@/app/util/context";

export default function CVForm() {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(frog);

  const [inputValues, setInputValues] = useState({
    name: "Daniel",
    surname: "Konieczny",
    address: "Jaworzno",
    email: "d@debugger.com",
    phone: "111-111-111",
    github: "Blagi-zmaj.github.com",
    linkedin: "daniel.konieczny.linkedin.com",
  });
  const [hideAllButtons, setHideButtons] = useState(false);
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
    summary: { description: "Quick summary about user", isEditing: false },
    education: [
      {
        institution: { value: "Uniwersytet Sląski", isEditing: false },
        position: { value: "History", isEditing: false },
        startDate: { value: "2022-09-22", isEditing: false },
        endDate: { value: "2023-03-30", isEditing: false },
        description: {
          value: "Bachelor Degree",
          isEditing: false,
        },
      },
      {
        institution: { value: "Liceum ogólnokształcące", isEditing: false },
        position: { value: "Dziennikarstwo", isEditing: false },
        startDate: { value: "2012-03-12", isEditing: false },
        endDate: { value: "2014-05-20", isEditing: false },
        description: {
          value: "Brak",
          isEditing: false,
        },
      },
    ],
    experience: [
      {
        institution: { value: "Billennium", isEditing: false },
        position: { value: "Frontend developer", isEditing: false },
        startDate: { value: "2021-09-22", isEditing: false },
        endDate: { value: "2025-03-30", isEditing: false },
        description: {
          value: "Manage code, code refactor etc.",
          isEditing: false,
        },
      },
      {
        institution: { value: "Google", isEditing: false },
        position: { value: "Python developer", isEditing: false },
        startDate: { value: "2021-02-14", isEditing: false },
        endDate: { value: "2028-05-15", isEditing: false },
        description: {
          value: "Process AI!",
          isEditing: false,
        },
      },
      {
        institution: { value: "Amazon", isEditing: false },
        position: { value: "AI developer", isEditing: false },
        startDate: { value: "2024-04-23", isEditing: false },
        endDate: { value: "2026-11-03", isEditing: false },
        description: {
          value: "Project AI!",
          isEditing: false,
        },
      },
    ],
  });

  const { showNavAndDrawer, toggleShowNavAndDrawer } =
    useContext(NavAndDrawerContext);

  useEffect(() => {
    if (hideAllButtons) {
      window.print();
    }
  }, [hideAllButtons]);

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
    isEditingExperience: false,
    isEditingEducation: false,
  };

  // console.log(
  //   `
  //   name ${inputValues.name}
  //   surname ${inputValues.surname}
  //   address ${inputValues.address}
  //   email ${inputValues.email}
  //   phone ${inputValues.phone}
  //   github ${inputValues.github}
  //   linkedin ${inputValues.linkedin}
  //   `
  // );

  // console.log(
  //   `
  //   ${inputValues.name} ${inputValues.surname}
  //   ${inputValues.address} ${inputValues.email} ${inputValues.phone}
  //    ${inputValues.github} ${inputValues.linkedin}
  //   `
  // );
  // console.log("==================Skills================");
  // userProfileValues.skills.forEach((el) => {
  //   console.log(`${el.name} ${el.level}`);
  // });
  // console.log("==================Languages================");
  // userProfileValues.languages.forEach((el) => {
  //   console.log(`${el.name} ${el.level}`);
  // });
  // console.log("==================Hobbies================");
  // userProfileValues.hobbies.forEach((el) => {
  //   console.log(`${el.name}`);
  // });
  // console.log("Summary: " + userProfileValues.summary.description);
  // console.log("==================Experience================");
  // userProfileValues.experience.map((element, index) => {
  //   const experienceEntries = Object.entries(element);
  //   experienceEntries.map((record) => {
  //     console.log(`${record[0]}: ${record[1].value}`);
  //   });
  // });

  // console.log("==================Education================");
  // userProfileValues.education.map((element, index) => {
  //   const experienceEntries = Object.entries(element);
  //   experienceEntries.map((record) => {
  //     console.log(`${record[0]}: ${record[1].value}`);
  //   });
  // });

  // console.log(
  //   userProfileValues.experience[0].startDate,
  //   userProfileValues.experience[0].endDate
  // );
  // console.log(userProfileValues.experience);
  // console.log(userProfileValues.education);
  // console.log(userProfileValues);
  // console.table(userProfileValues.skills);
  // console.table(userProfileValues.languages);
  // console.table(userProfileValues.hobbies);
  // console.log(
  //   userProfileValues.newSkill,
  //   userProfileValues.newLanguage,
  //   userProfileValues.newHobby
  // );
  // console.log(
  //   `=====================================================================`
  // );

  const reducer = function (state, action) {
    if (action.inputType === "experience") {
      console.log(`You are in ${action.inputType} action.inputType`);
      setUserProfileValues(
        setIsEditingItemInSet(
          userProfileValues,
          action.listItemIndex,
          "experience"
        )
      );
      return { ...state, isEditingExperience: !state.isEditingExperience };
    }

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
    const updatedDetail = {
      ...userProfileValues[identifier][index],
      name: event.target.value,
    };

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
    const updatedList = userProfileValues[identifier].filter((el) => {
      return el.name !== skillName;
    });

    setUserProfileValues((prevValues) => {
      return { ...prevValues, [identifier]: updatedList };
    });
  };

  const handleAddNewItemList = function (event, identifier, listName) {
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [listName]: [...prevValues[listName], prevValues[identifier]],
        [identifier]: { ...prevValues[identifier], name: "" },
      };
    });
  };

  const handleDeleteListRecord = function (event, listName, identifier) {
    console.log(listName, identifier);
    const filteredData = userProfileValues[listName].filter((record) => {
      return record.institution.value !== identifier;
    });
    console.log(filteredData);

    setUserProfileValues((prevValues) => {
      return { ...prevValues, [listName]: filteredData };
    });
  };

  const handleChangeAddNewListItem = function (event, identifier) {
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

  const handleSummaryEditingStatus = function () {
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        summary: {
          ...prevValues.summary,
          isEditing: !prevValues.summary.isEditing,
        },
      };
    });
  };

  const handleOnChangeSummary = function (event) {
    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        summary: { ...prevValues.summary, description: event.target.value },
      };
    });
  };

  const handleSummaryKeyDown = function (event) {
    if (event.shiftKey && event.key === "Enter") {
      console.log(`Shift & Enter`);
    } else if (event.key === "Enter") {
      console.log(`Enter`);
      handleSummaryEditingStatus();
    }
  };

  const handleAddNewItemListFromModal = function (data) {
    console.log(data.type);
    console.log(data);

    const objWithIsEditing = {
      institution: { value: data.institution, isEditing: false },
      position: { value: data.position, isEditing: false },
      startDate: { value: data.startDate, isEditing: false },
      endDate: { value: data.endDate, isEditing: false },
      description: {
        value: data.description,
        isEditing: false,
      },
    };
    console.log(objWithIsEditing);

    if (data.type === "work") {
      setUserProfileValues((prevValues) => {
        return {
          ...prevValues,
          experience: [...prevValues.experience, objWithIsEditing],
        };
      });
    } else {
      setUserProfileValues((prevValues) => {
        return {
          ...prevValues,
          education: [...prevValues.education, objWithIsEditing],
        };
      });
    }
  };

  const handleReplaceTextWithInput = function (
    listName,
    workIndex,
    identifier
  ) {
    console.log(userProfileValues[listName][workIndex][identifier]);
    const updatedListItemStatus = {
      ...userProfileValues[listName][workIndex],
      [identifier]: {
        ...userProfileValues[listName][workIndex][identifier],
        isEditing:
          !userProfileValues[listName][workIndex][identifier].isEditing,
      },
    };

    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [listName]: [
          ...prevValues[listName].slice(0, workIndex),
          updatedListItemStatus,
          ...prevValues[listName].slice(workIndex + 1),
        ],
      };
    });
  };

  const handleChangeUserListItem = function (
    event,
    listName,
    workIndex,
    identifier
  ) {
    // console.log(listName, workIndex, identifier); // experience 0 startDate

    const updatedItem = {
      ...userProfileValues[listName][workIndex],
      [identifier]: {
        ...userProfileValues[listName][workIndex][identifier],
        value: event.target.value,
      },
    };

    console.log(updatedItem);

    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [listName]: [
          ...prevValues[listName].slice(0, workIndex),
          updatedItem,
          ...prevValues[listName].slice(workIndex + 1),
        ],
      };
    });
  };

  const handleKeyDownUser = function (event, listName, workIndex, identifier) {
    // console.log(listName, workIndex, identifier); // experience 0 startDate
    if (event.key === "Enter") {
      console.log(`clicked enter`);
      const updatedEditState = {
        ...userProfileValues[listName][workIndex],
        [identifier]: {
          ...userProfileValues[listName][workIndex][identifier],
          isEditing:
            !userProfileValues[listName][workIndex][identifier].isEditing,
        },
      };

      setUserProfileValues((prevValues) => {
        return {
          ...prevValues,
          [listName]: [
            ...prevValues[listName].slice(0, workIndex),
            updatedEditState,
            ...prevValues[listName].slice(workIndex + 1),
          ],
        };
      });
    }
  };

  const handleKeyEnterAndShift = function (
    event,
    listName,
    workIndex,
    identifier
  ) {
    console.log(listName, workIndex, identifier); // education 0 startDate

    if (event.shiftKey && event.key === "Enter") {
      console.log(`Shift & Enter`);
    } else if (event.key === "Enter") {
      console.log(`clicked enter`);
      const updatedEditState = {
        ...userProfileValues[listName][workIndex],
        [identifier]: {
          ...userProfileValues[listName][workIndex][identifier],
          isEditing:
            !userProfileValues[listName][workIndex][identifier].isEditing,
        },
      };

      setUserProfileValues((prevValues) => {
        return {
          ...prevValues,
          [listName]: [
            ...prevValues[listName].slice(0, workIndex),
            updatedEditState,
            ...prevValues[listName].slice(workIndex + 1),
          ],
        };
      });
    }
  };

  const handleBlurUser = function (event, listName, workIndex, identifier) {
    const updatedEditState = {
      ...userProfileValues[listName][workIndex],
      [identifier]: {
        ...userProfileValues[listName][workIndex][identifier],
        isEditing:
          !userProfileValues[listName][workIndex][identifier].isEditing,
      },
    };

    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [listName]: [
          ...prevValues[listName].slice(0, workIndex),
          updatedEditState,
          ...prevValues[listName].slice(workIndex + 1),
        ],
      };
    });
  };

  const handleUpdateDate = function (date, type, index, identifier) {
    console.log(date, type, index, identifier);

    const updatedRecord = {
      ...userProfileValues[identifier][index],
      [type]: { ...userProfileValues[identifier][index][type], value: date },
    };

    console.log(updatedRecord);

    setUserProfileValues((prevValues) => {
      return {
        ...prevValues,
        [identifier]: [
          ...prevValues[identifier].slice(0, index),
          updatedRecord,
          ...prevValues[identifier].slice(index + 1),
        ],
      };
    });
  };

  const [showFileInput, setShowFileInput] = useState(false);

  const handleFileChange = (e) => {
    console.log(`handleFileChange `);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile).slice(5);
      console.log(fileURL);
      setFileURL(fileURL);
    }
  };

  /////////////////////////////////////////////////////

  const [imageSrc, setImageSrc] = useState(frog);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleToggleButtons = () => {
    setHideButtons((prev) => {
      return !prev;
    });
    toggleShowNavAndDrawer();
    // var element = document.getElementById("form");
    // var opt = {
    //   margin: 1,
    //   filename: "myfile.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 1 },
    //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    // };

    // New Promise-based usage:
    // html2pdf().set(opt).from(element).save();
    // html2pdf().from(element).save();

    // Old monolithic-style usage:
    // html2pdf(element, opt);
  };

  return (
    <div action="" className={styles.form} id="form">
      <div className={(styles.section, styles.aside)}>
        <div className={(styles.section, styles.aboutDetails)}>
          {showFileInput ? (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={() => {
                setShowFileInput(true);
              }}
              onMouseLeave={() => setShowFileInput(false)}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ position: "absolute" }}
              />

              <div>
                <Image
                  alt="visible"
                  src={imageSrc}
                  width={500}
                  height={300}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "1rem",
                  }}
                />
              </div>
            </div>
          ) : (
            <Image
              key="image_2"
              alt="person_2"
              src={imageSrc}
              width={500}
              height={300}
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "1rem",
              }}
              onMouseEnter={() => {
                setShowFileInput(true);
              }}
              onMouseLeave={() => setShowFileInput(false)}
            />
          )}

          {Object.entries(inputValues).map(([key, value], index) => {
            if (key === "hobbies" || key === "languages" || key === "skills")
              return;

            return isEditingInput[
              `isEditing${key[0].toUpperCase()}${key.slice(1)}`
            ] ? (
              // return true ? (
              <div className={styles.detailsBox} key={key}>
                <label htmlFor={key} style={{ alignSelf: "center" }}>
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
                <label htmlFor={key} style={{ margin: "8px" }}>
                  {`${key[0].toUpperCase()}${key.slice(1)}`}
                </label>
                <span
                  onClick={() => replaceTextWithInput(key, index)}
                  className={styles.wordWrapBreakWord}
                >
                  {inputValues[key]}
                </span>
              </div>
            );
          })}

          {["skills", "languages"].map((categoryList, indexCategory) => {
            return (
              <div key={categoryList} className={styles.asideDataRowBox}>
                <h3>{`${categoryList
                  .slice(0, 1)
                  .toUpperCase()}${categoryList.slice(1)}`}</h3>
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
                  hideAllButtons={hideAllButtons}
                />
              </div>
            );
          })}
          <h3>Hobbies</h3>
          {userProfileValues.hobbies.map((hobby, index) => {
            return (
              <div
                key={index}
                className={styles.hobbiesUI}
                // style={{ backgroundColor: "yellowgreen" }}
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
                    className={styles.wordWrapBreakWord}
                  >
                    {hobby.name ? hobby.name : `<empty> ${index}`}
                  </span>
                )}
                <Button
                  onClick={(event) =>
                    handleDeleteListItem(event, hobby.name, "hobbies")
                  }
                  variant="contained"
                  className={
                    hideAllButtons ? styles.hiddenButton : styles.hobbiesBtn
                  }
                >
                  -
                </Button>
              </div>
            );
          })}
          <div
            className={
              hideAllButtons ? styles.hideComponent : styles.hobbiesBox
            }
          >
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
              className={
                hideAllButtons ? styles.hiddenButton : styles.addNewRecordForm
              }
              variant="contained"
            >
              +
            </Button>
          </div>
          <button
            type="button"
            onClick={handleToggleButtons}
            style={{ fontSize: "2rem" }}
          >
            {hideAllButtons ? "Show" : "Hide"} all buttons
          </button>
        </div>
      </div>

      <div className={(styles.section, styles.summary)}>
        <div className={styles.recordContainer}>
          <span className={styles.sectionTitle}>
            <InfoIcon fontSize="large" />
            Summary
          </span>

          {userProfileValues.summary.isEditing ? (
            <InputForm
              key="summaryInput"
              type="text"
              name="summary"
              value={userProfileValues.summary.description}
              className={styles.control}
              autoFocus
              onBlur={handleSummaryEditingStatus}
              onChange={handleOnChangeSummary}
              handleKeyEnterAndShift={handleSummaryKeyDown}
              isTextArea={true}
            />
          ) : (
            <div
              onClick={handleSummaryEditingStatus}
              key="summary"
              className={styles.record}
            >
              {userProfileValues.summary.description
                ? userProfileValues.summary.description
                : `Write somethin about yourself!`}
            </div>
          )}
        </div>
      </div>
      <div className={(styles.section, styles.experience)}>
        <span className={styles.sectionTitle}>
          <WorkIcon />
          Experience
        </span>
        {userProfileValues.experience.map((work, workIndex) => {
          return (
            <div key={workIndex} className={styles.recordContainer}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={(event) =>
                  handleDeleteListRecord(
                    event,
                    "experience",
                    work.institution.value
                  )
                }
              >
                X
              </button>
              {Object.entries(work).map((el, elIndex) => {
                return el[0] === "startDate" || el[0] === "endDate" ? (
                  el[0] === "startDate" ? (
                    <div key={elIndex} className={styles.datesContainer}>
                      <CalendarMonthIcon />
                      <DatePicker
                        date={work.startDate.value}
                        id={"start" + elIndex}
                        index={workIndex}
                        type={"startDate"}
                        isEditing={work.startDate.isEditing}
                        updateDate={handleUpdateDate}
                        listName={"experience"}
                      />
                      <div>-</div>
                      <DatePicker
                        date={work.endDate.value}
                        id={"end" + elIndex}
                        index={workIndex}
                        type={"endDate"}
                        updateDate={handleUpdateDate}
                        listName={"experience"}
                      />
                    </div>
                  ) : null
                ) : (
                  <span key={elIndex}>
                    {el[1].isEditing ? (
                      <InputForm
                        key={el[0]}
                        type="text"
                        name={el[0]}
                        value={el[1].value}
                        className={styles.control}
                        autoFocus
                        isTextArea={el[0] === "description" ? true : false}
                        onBlur={() =>
                          handleBlurUser(event, "experience", workIndex, el[0])
                        }
                        onKeyDown={(event) =>
                          handleKeyEnterAndShift(
                            event,
                            "experience",
                            workIndex,
                            el[0]
                          )
                        }
                        onChange={() =>
                          handleChangeUserListItem(
                            event,
                            "experience",
                            workIndex,
                            el[0]
                          )
                        }
                      />
                    ) : (
                      <div style={{ margin: "0.75rem 0" }}>
                        <div
                          onClick={() =>
                            handleReplaceTextWithInput(
                              "experience",
                              workIndex,
                              el[0]
                            )
                          }
                          className={styles.record}
                        >
                          {el[1].value ? el[1].value : `<empty>`}
                        </div>
                      </div>
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
        <Modal
          hideAllButtons={hideAllButtons}
          type={"work"}
          handleAddNewItemListFromModal={handleAddNewItemListFromModal}
        />
      </div>
      <div className={(styles.section, styles.education)}>
        <span className={styles.sectionTitle}>
          <SchoolIcon />
          Education
        </span>
        {userProfileValues.education.map((subject, subjectIndex) => {
          return (
            <div key={subjectIndex} className={styles.recordContainer}>
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={(event) =>
                  handleDeleteListRecord(
                    event,
                    "education",
                    subject.institution.value
                  )
                }
              >
                X
              </button>
              {Object.entries(subject).map((el, elIndex) => {
                return el[0] === "startDate" || el[0] === "endDate" ? (
                  el[0] === "startDate" ? (
                    <div key={elIndex} className={styles.datesContainer}>
                      <CalendarMonthIcon />
                      <DatePicker
                        date={subject.startDate.value}
                        id={"start" + elIndex}
                        index={subjectIndex}
                        type={"startDate"}
                        listName={"education"}
                        updateDate={handleUpdateDate}
                      />
                      <div>-</div>
                      <DatePicker
                        date={subject.endDate.value}
                        id={"end" + elIndex}
                        index={subjectIndex}
                        type={"endDate"}
                        listName={"education"}
                        updateDate={handleUpdateDate}
                      />
                    </div>
                  ) : null
                ) : (
                  <span key={elIndex}>
                    {el[1].isEditing ? (
                      <InputForm
                        key={el[0]}
                        type="text"
                        name={el[0]}
                        value={el[1].value}
                        className={styles.control}
                        autoFocus
                        isTextArea={el[0] === "description" ? true : false}
                        onBlur={() =>
                          handleBlurUser(
                            event,
                            "education",
                            subjectIndex,
                            el[0]
                          )
                        }
                        handleKeyEnterAndShift={(event) =>
                          handleKeyEnterAndShift(
                            event,
                            "education",
                            subjectIndex,
                            el[0]
                          )
                        }
                        onChange={() =>
                          handleChangeUserListItem(
                            event,
                            "education",
                            subjectIndex,
                            el[0]
                          )
                        }
                      />
                    ) : (
                      <div style={{ margin: "0.75rem 0" }}>
                        <div
                          onClick={() =>
                            handleReplaceTextWithInput(
                              "education",
                              subjectIndex,
                              el[0]
                            )
                          }
                          className={styles.record}
                        >
                          {el[1].value ? el[1].value : `<empty>`}
                        </div>
                      </div>
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
        <Modal
          hideAllButtons={hideAllButtons}
          type={"education"}
          handleAddNewItemListFromModal={handleAddNewItemListFromModal}
        />
      </div>
    </div>
  );
}
