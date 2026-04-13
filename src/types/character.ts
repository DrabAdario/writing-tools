export type CharacterDraft = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  traits: {
    temperament: string;
    virtue: string;
    flaw: string;
    drive: string;
    bond: string;
  };
  backstory: string;
  createdAt: string;
};
