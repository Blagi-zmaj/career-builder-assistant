import { useState } from "react";
import { userContactData, isEditingStates } from "../CVCreatorUtils/helpers";
import InputForm from "../InputForm/InputForm";
import styles from "./UserContactDataSection.module.css";
import { Tooltip } from "@mui/material";

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
  const [showTooltip, setShowTooltip] = useState({
    open: false,
    text: "Empty record",
  });
  // name: "ADD OR DELETE!",
  const handleInputChange = function (
    identifier: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setShowTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });
    console.log(identifier);
    // if (!userContact[identifier]) {
    if (!event.target.value) {
      console.log(event.target.value);
      console.log("EMPTY");
      setShowTooltip({ open: true, text: "Empty record" });
    }

    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [identifier]: event.target.value,
      };
    });
  };

  const handleKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: string
  ) {
    if (event.key === "Enter") {
      setIsEditingInput((prevValues) => {
        return {
          ...prevValues,
          [`isEditing${inputName[0].toUpperCase()}${inputName.slice(1)}`]:
            false,
        };
      });

      if (!userContact[inputName]) {
        console.log(userContact[inputName], inputName);
        setUserContact((prevValues) => {
          return {
            ...prevValues,
            [inputName]: `Add ${inputName}`,
            // name: `Add ${inputName}`,
          };
        });
      }
    }
  };

  const replaceTextWithInput = function (inputName: string) {
    setShowTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });

    setIsEditingInput((prevValues) => {
      return {
        ...prevValues,
        [`isEditing${inputName[0].toUpperCase()}${inputName.slice(1)}`]: true,
      };
    });
  };

  const handleOnBlur = function (inputName: string, event) {
    setIsEditingInput((prevValues) => {
      return {
        ...prevValues,
        [`isEditing${inputName[0].toUpperCase()}${inputName.slice(1)}`]: false,
      };
    });

    if (!userContact[inputName]) {
      console.log(userContact[inputName], inputName);
      setUserContact((prevValues) => {
        return {
          ...prevValues,
          [inputName]: `Add ${inputName}`,
        };
      });
    }
  };

  return Object.entries(userContact).map(([key, value], index) => {
    if (key === "hobbies" || key === "languages" || key === "skills") return;
    return isEditingInput[`isEditing${key[0].toUpperCase()}${key.slice(1)}`] ? (
      <div className={styles.detailsBox} key={key}>
        <label htmlFor={key} style={{ alignSelf: "center" }}>
          {`${key[0].toUpperCase()}${key.slice(1)}`}
        </label>
        <Tooltip title={showTooltip.text} open={showTooltip.open}>
          <InputForm
            key={key}
            type="text"
            name={key}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleInputChange(key, event)}
            value={value}
            className={styles.control}
            onBlur={(event) => handleOnBlur(key, event)}
            autoFocus
            onKeyDown={(
              event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleKeyDown(event, key)}
          />
        </Tooltip>
      </div>
    ) : (
      <div className={styles.detailsBox} key={key}>
        <label htmlFor={key} style={{ margin: "8px" }}>
          {`${key[0].toUpperCase()}${key.slice(1)}`}
        </label>
        <span
          onClick={() => replaceTextWithInput(key)}
          className={styles.wordWrapBreakWord}
        >
          {value}
        </span>
      </div>
    );
  });
}
