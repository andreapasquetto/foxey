export interface IdAndName {
  id: string;
  name: string;
}

export interface IdAndNameWithParent extends IdAndName {
  parent: IdAndName | null;
}
