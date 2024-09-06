import { useEffect, useState } from "react";
import { userContactData, isEditingStates } from "../CVCreatorUtils/helpers";
import InputForm from "../InputForm/InputForm";
import styles from "./UserContactDataSection.module.css";
import { Tooltip } from "@mui/material";

type IsEditingStates = {
  [key: string]: boolean;
};

type UserContact = {
  name: string | undefined;
  surname: string | undefined;
  address: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  github: string | undefined;
  linkedin: string | undefined;
};

function Loading() {
  return (
    <div className={styles.centerComponent}>
      <h2>🌀 Loading...</h2>
    </div>
  );
}

export default function UserContactDataSection() {
  const [userContact, setUserContact] = useState<UserContact>({
    name: undefined,
    surname: undefined,
    address: undefined,
    email: undefined,
    phone: undefined,
    github: undefined,
    linkedin: undefined,
  });

  useEffect(() => {
    async function fetchDataFromDatabase() {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setUserContact(data);
    }

    fetchDataFromDatabase();
  }, []);

  const [isEditingInput, setIsEditingInput] =
    useState<IsEditingStates>(isEditingStates);
  const [showTooltip, setShowTooltip] = useState({
    open: false,
    text: "Empty record",
  });

  const handleInputChange = function (
    identifier: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setShowTooltip((prevValues) => {
      return { ...prevValues, open: false };
    });
    if (!event.target.value) {
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
        setUserContact((prevValues) => {
          return {
            ...prevValues,
            [inputName]: `Add ${inputName}`,
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
      setUserContact((prevValues) => {
        return {
          ...prevValues,
          [inputName]: `Add ${inputName}`,
        };
      });
    }
  };

  console.log(userContact?.name);

  return userContact?.name !== undefined ? (
    Object.entries(userContact).map(([key, value], index) => {
      if (key === "hobbies" || key === "languages" || key === "skills") return;
      return isEditingInput[
        `isEditing${key[0].toUpperCase()}${key.slice(1)}`
      ] ? (
        <div className={styles.detailsBox} key={key}>
          <label htmlFor={key} style={{ alignSelf: "center" }}>
            {`${key[0].toUpperCase()}${key.slice(1)}`}
          </label>
          <Tooltip title={showTooltip.text} open={showTooltip.open}>
            <InputForm
              key={key}
              id={key}
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
                event: React.KeyboardEvent<
                  HTMLInputElement | HTMLTextAreaElement
                >
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
    })
  ) : (
    <Loading />
  );
}
