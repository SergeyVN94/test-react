const actionFiltersUpdate = (filtersState: IFiltersState): IStoreAction => ({
  type: 'CHANGE_FILTERS',
  filtersState,
});

export default actionFiltersUpdate;
