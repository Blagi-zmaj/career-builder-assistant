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
