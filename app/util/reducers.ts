import { UserProfile } from "../util/types";

export default function userDetailsListReducer(state, action) {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case "changeRatingNewListItem": {
      // console.log(`changeRatingNewListItem`);
      // console.log(action.rate);
      // console.log(action.identifier);
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
      // console.log(newData);
      return newData;

      // const newData = {
      //   ...state,
      //   [categoryList]: [
      //     ...state[categoryList].slice(0, listIndex),
      //     {
      //       ...state[categoryList][listIndex],
      //       isEditing: !state[categoryList][listIndex].isEditing,
      //       name: "ADD OR DELETE!",
      //     },
      //     ...state[categoryList].slice(listIndex + 1),
      //   ],
      // };
      // // console.log(newData);
      // return newData;
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
      // console.log(newData);
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
      console.log(newData);
      return newData;
    }

    case "changeUserActualInput": {
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
      // console.log(newData);
      return newData;
    }

    case "delete": {
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

    case "": {
    }

    case "": {
    }
  }
}
