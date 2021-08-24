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
      itemsIds: ['item-3', 'item-4', 'item-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Column 2',
      itemsIds: ['item-1', 'item-2'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Column 3',
      itemsIds: ['item-6', 'item-7'],
    },
  },
  columnsOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialBoardData;
