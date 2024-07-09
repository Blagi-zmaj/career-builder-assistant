import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import UserDetailsList from "../UserDetailsList";
import styles from "./SkillsAndLanguages.module.css";
import { NavAndDrawerContext } from "@/app/util/context";
import { userProfileData } from "../CVCreatorUtils/helpers";
type Skill = {
  name: string;
  level: number;
  isEditing: boolean;
};

type Language = {
  name: string;
  level: number;
  isEditing: boolean;
};

type Hobby = {
  name: string;
  isEditing: boolean;
};

type Summary = {
  description: string;
  isEditing: boolean;
};

type Education = {
  institution: { value: string; isEditing: boolean };
  position: { value: string; isEditing: boolean };
  startDate: { value: string; isEditing: boolean };
  endDate: { value: string; isEditing: boolean };
  description: {
    value: string;
    isEditing: boolean;
  };
};

type Experience = {
  institution: { value: string; isEditing: boolean };
  position: { value: string; isEditing: boolean };
  startDate: { value: string; isEditing: boolean };
  endDate: { value: string; isEditing: boolean };
  description: {
    value: string;
    isEditing: boolean;
  };
};

type UserProfile = {
  newSkill: Skill;
  newLanguage: Language;
  newHobby: Hobby;
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
  summary: Summary;
  education: Education[];
  experience: Experience[];
};

export default function SkillsAndLanguagesSection() {
  const { showButtons } = useContext(NavAndDrawerContext);
  const [userContact, setUserContact] = useState<UserProfile>(userProfileData);

  const handleBlur = function (categoryList: string, listIndex: number) {
    console.log(`handleBlur`);
    console.log(categoryList, listIndex);
    setUserContact((prevValues) => {
      const newData = {
        ...prevValues,
        [categoryList]: [
          ...prevValues[categoryList].slice(0, listIndex),
          {
            ...prevValues[categoryList][listIndex],
            isEditing: !prevValues[categoryList][listIndex].isEditing,
          },
          ...prevValues[categoryList].slice(listIndex + 1),
        ],
      };
      console.log(newData);
      return newData;
    });
  };

  const handleUserDetailsKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: string,
    index: number
  ) {
    if (event.key === "Enter") {
      setUserContact((prevValues) => {
        const newData = {
          ...prevValues,
          [inputName]: [
            ...prevValues[inputName].slice(0, index),
            {
              ...prevValues[inputName][index],
              isEditing: !prevValues[inputName][index].isEditing,
            },
            ...prevValues[inputName].slice(index + 1),
          ],
        };
        console.log(newData);
        return newData;
      });
    }
  };

  const handleChangeUserActualInput = function (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string,
    index: number
  ) {
    const updatedDetail = {
      ...userContact[identifier][index],
      name: event.target.value,
    };

    setUserContact((prevValues) => {
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

  const replaceTextWithInput = function (
    inputName: string,
    listItemIndex: number = 0
  ) {
    setUserContact((prevValues) => {
      const newData = {
        ...prevValues,
        [inputName]: [
          ...prevValues[inputName].slice(0, listItemIndex),
          {
            ...prevValues[inputName][listItemIndex],
            isEditing: !prevValues[inputName][listItemIndex].isEditing,
          },
          ...prevValues[inputName].slice(listItemIndex + 1),
        ],
      };
      console.log(newData);
      return newData;
    });
  };

  const handleDeleteListItem = function (
    event: MouseEvent<HTMLButtonElement>,
    skillName: string,
    identifier: string
  ) {
    const updatedList = userContact[identifier].filter((el) => {
      return el.name !== skillName;
    });

    setUserContact((prevValues) => {
      return { ...prevValues, [identifier]: updatedList };
    });
  };

  const handleChangeRatingExistingListItem = function (
    rate: number,
    identifier: string,
    index: number
  ) {
    // console.log(typeof rate, typeof identifier, typeof index);
    setUserContact((prevValues) => {
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

  const handleChangeAddNewListItem = function (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string
  ) {
    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [identifier]: {
          ...prevValues[identifier],
          name: event.target.value,
        },
      };
    });
  };

  const handleChangeRatingNewListItem = function (
    rate: number,
    identifier: string,
    index: number = 0
  ) {
    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [identifier]: { ...prevValues[identifier], level: rate },
      };
    });
  };

  const handleAddNewItemList = function (
    event: MouseEvent<HTMLButtonElement>,
    identifier: string,
    listName: string
  ) {
    setUserContact((prevValues) => {
      return {
        ...prevValues,
        [listName]: [...prevValues[listName], prevValues[identifier]],
        [identifier]: { ...prevValues[identifier], name: "" },
      };
    });
  };

  return (
    <>
      {["skills", "languages"].map((categoryList, indexCategory) => {
        return (
          <div key={categoryList} className={styles.asideDataRowBox}>
            <h3>{`${categoryList.slice(0, 1).toUpperCase()}${categoryList.slice(
              1
            )}`}</h3>
            <UserDetailsList
              categoryList={categoryList}
              userData={userContact}
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
              hideAllButtons={showButtons}
            />
          </div>
        );
      })}
    </>
  );
}
