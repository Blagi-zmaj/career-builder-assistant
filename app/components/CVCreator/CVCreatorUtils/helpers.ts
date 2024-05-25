export default function setIsEditingItem(state, inputType) {
  switch (inputType) {
    case "name":
      return { ...state, isEditingName: !state.isEditingName };
    case "surname":
      return { ...state, isEditingSurname: !state.isEditingSurname };
    case "address":
      return { ...state, isEditingAddress: !state.isEditingAddress };
    case "email":
      return { ...state, isEditingEmail: !state.isEditingEmail };
    case "phone":
      return { ...state, isEditingPhone: !state.isEditingPhone };
    case "github":
      return { ...state, isEditingGithub: !state.isEditingGithub };
    case "linkedin":
      return { ...state, isEditingLinkedin: !state.isEditingLinkedin };
  }
}

// export function setIsEditingItemInSet(userProfileValues, index) {
//   console.log(userProfileValues);
//   const updatedOneSkill = {
//     ...userProfileValues.skills[index],
//     isEditing: !userProfileValues.skills[index].isEditing,
//   };
//   const updatedSkills = [
//     ...userProfileValues.skills.slice(0, index),
//     updatedOneSkill,
//     ...userProfileValues.skills.slice(index + 1),
//   ];

//   return { ...userProfileValues, skills: updatedSkills };
// }

export function setIsEditingItemInSet(userProfileValues, index, list) {
  console.log(userProfileValues);
  const updatedOneSkill = {
    ...userProfileValues[list][index],
    isEditing: !userProfileValues[list][index].isEditing,
  };
  const updatedSkills = [
    ...userProfileValues[list].slice(0, index),
    updatedOneSkill,
    ...userProfileValues[list].slice(index + 1),
  ];

  return { ...userProfileValues, [list]: updatedSkills };
}

// export function handleChangeUserActualInput(event, identifier, index) {
//   console.log(userProfileValues[identifier]);
//   console.log(identifier);
//   const updatedDetail = {
//     ...userProfileValues[identifier][index],
//     name: event.target.value,
//   };
//   console.log(updatedDetail);

//   setUserProfileValues((prevValues) => {
//     return {
//       ...prevValues,
//       [identifier]: [
//         ...prevValues[identifier].slice(0, index),
//         updatedDetail,
//         ...prevValues[identifier].slice(index + 1),
//       ],
//     };
//   });
// }
