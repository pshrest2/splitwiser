const initialState = {
  receiptData: {
    items: [],
  },
  columnsData: {
    columnOrder: [],
    columns: {},
  },
  imageData: {
    imageFile: null,
    imageSrc: null,
    fromUrl: false,
  },
  people: [
    { label: 'Rahul', value: 'rahul@gmail.com' },
    { label: 'Ram', value: 'ram@gmail.com' },
    { label: 'Sita', value: 'sita@gmail.com' },
  ],
  personName: '',
};

const updateColumnKey = (state, payload) => {
  return {
    columnsData: {
      ...state.columnsData,
      columns: {
        ...state.columnsData.columns,
        [payload.columnId]: {
          ...state.columnsData.columns[payload.columnId],
          [payload.key]: payload.value,
        },
      },
    },
  };
};

const receipt = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE':
      return {
        ...state,
        receiptData: payload.receiptData,
        columnsData: payload.columnsData,
      };
    case 'UPDATE':
      return {
        ...state,
        [payload.key]: payload.value,
      };
    case 'UPDATE_COLUMN':
      return {
        ...state,
        columnsData: payload.columnsData,
      };
    case 'UPDATE_COLUMN_KEY':
      return {
        ...state,
        ...updateColumnKey(state, payload),
      };
    case 'UPDATE_IMAGE_URI':
      return {
        ...state,
        imageData: {
          ...state.imageData,
          imageSrc: payload.uri,
          fromUrl: true,
        },
      };
    case 'UPDATE_IMAGE_DATA':
      return {
        ...state,
        imageData: {
          ...state.imageData,
          imageSrc: payload.imageSrc,
          imageFile: payload.imageFile,
          fromUrl: payload.fromUrl,
        },
      };
    case 'ADD_PERSON': {
      const newPeople = [
        ...state.columnsData.columns[payload.columnId].splitBetween,
        payload.newPerson,
      ];
      return {
        ...state,
        people: [...state.people, payload.newPerson],
        ...updateColumnKey(state, {
          key: 'splitBetween',
          value: newPeople,
          columnId: payload.columnId,
        }),
      };
    }
    case 'ADD_COLUMN_PERSON':
      return {
        ...state,
        personName: payload.personName,
        columnId: payload.columnId,
      };
    case 'CLEAR':
      return initialState;
    case 'CLEAR_IMAGE':
      return {
        ...state,
        imageData: initialState.imageData,
      };
    default:
      return state;
  }
};

export default receipt;
