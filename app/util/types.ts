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

export type UserProfile = {
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

export interface ChipData {
  key: number;
  label: string;
}

export interface ChipsArrayProps {
  data: readonly ChipData[];
  type: string;
}
