import { ChangeEvent, useState } from "react";
import { userContactData, isEditingStates } from "../CVCreatorUtils/helpers";
import InputForm from "../InputForm/InputForm";
import styles from "./UserContactDataSection.module.css";

// type editingStatusArr = {
//   isEditingName: boolean,
//   isEditingSurname: boolean,
//   isEditingAddress: boolean,
//   isEditingEmail: boolean,
//   isEditingPhone: boolean,
//   isEditingGithub: boolean,
//   isEditingLinkedin: boolean,
//   isEditingSkills: boolean,
//   isEditingLanguages: boolean,
//   isEditingHobbies: boolean,
//   isEditingExperience: boolean,
//   isEditingEducation: boolean,
// }

type IsEditingStates = {
  [key: string]: boolean;
};

type UserContact = {
  name: string;
  surname: string;
  address: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
};

export default function UserContactDataSection() {
  const [userContact, setUserContact] = useState<UserContact>(userContactData);
  const [isEditingInput, setIsEditingInput] =
    useState<IsEditingStates>(isEditingStates);
  console.log(userContact);

  const handleInputChange = function (
    identifier: string,
    event: React.MouseEvent
  ) {
    // setUserContact((prevValues) => {
    //   return { ...prevValues, [identifier]: event.target.value };
    // });
  };

  const handleKeyDown = function (event, inputName) {
    if (event.key === "Enter") {
      dispatch({ inputType: inputName });
    }
  };

  const replaceTextWithInput = function (
    inputName: string,
    listItemIndex: number = 0
  ) {
    dispatch({ inputType: inputName, listItemIndex: listItemIndex });
  };

  return Object.entries(userContact).map(([key, value], index) => {
    if (key === "hobbies" || key === "languages" || key === "skills") return;

    return isEditingInput[`isEditing${key[0].toUpperCase()}${key.slice(1)}`] ? (
      <div className={styles.detailsBox} key={key}>
        <label htmlFor={key} style={{ alignSelf: "center" }}>
          {`${key[0].toUpperCase()}${key.slice(1)}`}
        </label>
        <InputForm
          key={key}
          type="text"
          name={key}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(key, event)
          }
          value={value}
          className={styles.control}
          onBlur={() => dispatch({ inputType: key })}
          autoFocus
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(event, key)
          }
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
          {value}
        </span>
      </div>
    );
  });
}
