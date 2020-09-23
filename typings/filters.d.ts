interface IFiltersState {
  [index: string]: boolean | string;
}

type ChangeEventCallback = (state: IFiltersState) => void;
