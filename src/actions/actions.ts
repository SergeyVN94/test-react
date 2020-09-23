const actionFiltersUpdate: ActionCreatorChangeFilters = (filtersState: IFiltersState) => ({
  type: 'change-filters',
  filtersState,
});

export default actionFiltersUpdate;
