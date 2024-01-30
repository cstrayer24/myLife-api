export type baseUser = {
  age: string | number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  birthday: string | Date;
  sex: "male" | "female";
};

export type mentalBaseData = {
  hasMentalIllness: string | boolean;
  happinessLevel: string | boolean;
  mental_illnesses: string[];
  isReligious: boolean | string;
  current_religion:
    | "christianity"
    | "judaism"
    | "islam"
    | "hinduism"
    | "buddhism"
    | "none";
  relationship_status:
    | "employed"
    | "self-employed"
    | "looking"
    | "schooling"
    | "unemployed";
};

export type dietBaseData = {
  hasAllergies: boolean | string;
  allergies: string[];
  existingDiet:
    | "vegan"
    | "vegetarian"
    | "paleo"
    | "Mediterranean"
    | "keto"
    | "none";
  religiousDiet: "none" | "kosher" | "Ahimsa";
  hasDisease: boolean | string;
  diseases: string[];
  AMR: number | string;
  BMR: number | string;
};

export type physicalBaseData = {
  weight: number;
  hasDisabilities: boolean | string;
  strength: 1 | 2 | 3 | 4 | 5;
  endurance: 1 | 2 | 3 | 4 | string;
  disabilities: string[];
  height_inches: number | string;
  height_string: string;
  bmi: string | number;
};

type baseData = {
  info: baseUser;
  physical: physicalBaseData;
  diet: dietBaseData;
  mental: mentalBaseData;
};

export default baseData;
