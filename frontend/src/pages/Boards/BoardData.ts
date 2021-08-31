const initialBoardData = {
  items: {
    'item-1': { id: 'item-1', content: 'CNN Philippines' },
    'item-2': { id: 'item-2', content: 'Inquirer' },
    'item-3': { id: 'item-3', content: 'ABS-CBN News' },
    'item-4': { id: 'item-4', content: 'GMA News' },
    'item-5': { id: 'item-5', content: 'Rappler' },
    'item-6': { id: 'item-6', content: 'Manila Bulletin' },
    'item-7': { id: 'item-7', content: 'Manila Times' },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Column 1',
      itemsIds: [
        'item-3',
        'item-4',
        'item-5',
        'item-1',
        'item-2',
        'item-6',
        'item-7',
      ],
    },
  },
  columnsOrder: ['column-1'],
};

export default initialBoardData;
