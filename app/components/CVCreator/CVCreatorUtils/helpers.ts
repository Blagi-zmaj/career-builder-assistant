export async function updateUserRecordInDatabase(
  type: string,
  tableName: string,
  recordToUpdate: string,
  newData: string
) {
  if (type === "update") {
    await fetch(`/pages/api/${tableName}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName, recordToUpdate, newData }),
    });
  }
}

export async function updateTableRecordInDatabase(
  type: string,
  tableName: string,
  newData: string,
  recordToUpdate?: string,
  rate?: number
) {
  const storedLogin = window.localStorage.getItem("login");

  if (type === "create") {
    await fetch(`/pages/api/${tableName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName, newData }),
    });
  }

  if (type === "update") {
    await fetch(`/pages/api/${tableName}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName, newData, rate, recordToUpdate }),
    });
    // }
  }

  if (type === "delete") {
    await fetch(`/pages/api/${tableName}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName, newData }),
    });
  }
}

type UserContact = {
  name: string | undefined;
  surname: string | undefined;
  address: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  github: string | undefined;
  linkedin: string | undefined;
};

export const userContactData: UserContact = {
  name: "Daniel",
  surname: "Konieczny",
  address: "Jaworzno",
  email: "d@debugger.com",
  phone: "111-111-111",
  github: "Blagi-zmaj.github.com",
  linkedin: "daniel.konieczny.linkedin.com",
};

export const isEditingStates = {
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

export const userProfileData = {
  newSkill: { name: "", level: 3, isEditing: false },
  newLanguage: { name: "", level: 3, isEditing: false },
  newHobby: { name: "", isEditing: false },
  skills: [{ name: "AI - Test", level: 2, isEditing: false }],
  languages: [
    { name: "English", level: 2, isEditing: false },
    { name: "French", level: 3, isEditing: false },
  ],
  hobbies: [
    { name: "Nauka", isEditing: false },
    { name: "Gry", isEditing: false },
    { name: "Koty", isEditing: false },
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
};

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

export function hasDuplicates(arr) {
  const localArr = arr.map((el) => el.name.toLowerCase());
  return new Set(localArr).size !== localArr.length;
}

export function getDataFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? `["Machine","AI"]`);
}
