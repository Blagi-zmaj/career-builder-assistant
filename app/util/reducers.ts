import { UserProfile } from "../util/types";

export default function userDetailsListReducer(state, action) {
  switch (action.type) {
    case "fetchFromDatabase": {
      // console.log(action.ownedFromDatabase);
      const [skills, languages, hobbies] = action.ownedFromDatabase;

      return {
        ...state,
        skills: skills,
        languages: languages,
        hobbies: hobbies,
      };
    }

    case "fetchFromLocalStorage": {
      return {
        ...state,
        skills: action.ownedFromLocalStorage,
      };
    }

    case "changeRatingNewListItem": {
      return {
        ...state,
        [action.identifier]: {
          ...state[action.identifier],
          level: action.rate,
        },
      };
    }

    case "addNewItemList": {
      return {
        ...state,
        [action.listName]: [
          ...state[action.listName],
          state[action.identifier],
        ],
        [action.identifier]: { ...state[action.identifier], name: "" },
      };
    }

    case "blur": {
      const newData = {
        ...state,
        [action.categoryList]: [
          ...state[action.categoryList].slice(0, action.listIndex),
          {
            ...state[action.categoryList][action.listIndex],
            isEditing: !state[action.categoryList][action.listIndex].isEditing,
            name: "CHANGE OR DELETE!",
          },
          ...state[action.categoryList].slice(action.listIndex + 1),
        ],
      };

      return newData;
    }

    case "blurCorrectName": {
      const newData = {
        ...state,
        [action.categoryList]: [
          ...state[action.categoryList].slice(0, action.listIndex),
          {
            ...state[action.categoryList][action.listIndex],
            isEditing: !state[action.categoryList][action.listIndex].isEditing,
          },
          ...state[action.categoryList].slice(action.listIndex + 1),
        ],
      };

      return newData;
    }

    case "keyDown": {
      const newData = {
        ...state,
        [action.inputName]: [
          ...state[action.inputName].slice(0, action.index),
          {
            ...state[action.inputName][action.index],
            isEditing: !state[action.inputName][action.index].isEditing,
          },
          ...state[action.inputName].slice(action.index + 1),
        ],
      };

      return newData;
    }

    case "changeUserActualInput": {
      if (action.identifier === "skills") {
        const skillObjectsArr = [
          ...state[action.identifier].slice(0, action.index),
          action.updatedDetail,
          ...state[action.identifier].slice(action.index + 1),
        ];

        const skillsStringList = skillObjectsArr.map((skill) => skill.name);

        window.localStorage.setItem("skills", JSON.stringify(skillsStringList));
      }

      return {
        ...state,
        [action.identifier]: [
          ...state[action.identifier].slice(0, action.index),
          action.updatedDetail,
          ...state[action.identifier].slice(action.index + 1),
        ],
      };
    }

    case "replaceTextWithInput": {
      const newData = {
        ...state,
        [action.inputName]: [
          ...state[action.inputName].slice(0, action.listItemIndex),
          {
            ...state[action.inputName][action.listItemIndex],
            isEditing: !state[action.inputName][action.listItemIndex].isEditing,
          },
          ...state[action.inputName].slice(action.listItemIndex + 1),
        ],
      };

      return newData;
    }

    case "delete": {
      if (action.identifier === "skills") {
        const skillsStringList = action.updatedList.map((el) => {
          return el.name;
        });

        window.localStorage.setItem("skills", JSON.stringify(skillsStringList));
      }

      return { ...state, [action.identifier]: action.updatedList };
    }

    case "changeRatingExistingListItem": {
      return {
        ...state,
        [action.identifier]: [
          ...state[action.identifier].slice(0, action.index),
          { ...state[action.identifier][action.index], level: action.rate },
          ...state[action.identifier].slice(action.index + 1),
        ],
      };
    }

    case "changeAddNewListItem": {
      return {
        ...state,
        [action.identifier]: {
          ...state[action.identifier],
          name: action.name,
        },
      };
    }
  }
}
