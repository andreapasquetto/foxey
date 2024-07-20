// TODO: add missing properties when necessary
export interface ContactRead {
  id: string;
  isArchived: boolean;
  isBusiness: boolean;
  fullName: string;
  subtitle: string | null;
  dob: string | null;
}
