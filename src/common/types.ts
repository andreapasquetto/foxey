export interface IdName {
  id: string;
  name: string;
}

export interface IdNameParent extends IdName {
  parent: IdName | null;
}

export interface IdNameParentUsages extends IdNameParent {
  usages: number;
}
