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

// export default function setIsEditingItem(userProfileValues, index) {
//     console.log(userProfileValues);
//     const updatedOneSkill = {
//       ...userProfileValues.skills[index],
//       isEditing: !userProfileValues.skills[index].isEditing,
//     };
//     const updatedSkills = [
//       ...userProfileValues.skills.slice(0, index),
//       updatedOneSkill,
//       ...userProfileValues.skills.slice(index + 1),
//     ];

//     return { ...userProfileValues, skills: updatedSkills };
//   }
