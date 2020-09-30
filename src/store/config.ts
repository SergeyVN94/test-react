const config = {
  filters: {
    sortedBy: [
      { text: 'имя', value: 'name', name: 'sort-by' },
      { text: 'дата рождения', value: 'date-of-birth', name: 'sort-by' },
    ],
    statuses: [{ text: 'в архиве', value: 'in-archive' }],
    dropdowns: [
      {
        title: 'Должность',
        name: 'role',
        items: [
          { text: 'Повар', value: 'cook' },
          { text: 'Официант', value: 'waiter' },
          { text: 'Водитель', value: 'driver' },
        ],
      },
    ],
  },
  rolesTranslate: {
    cook: 'Повар',
    waiter: 'Официант',
    driver: 'Водитель',
  },
  defaultRole: 'cook',
  stateKeys: [
    'employees',
    'filteredEmployee',
    'filtersState',
  ],
};

export default config;