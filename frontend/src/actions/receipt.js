export const initialize = (receiptData, columnsData) => ({
  type: 'INITIALIZE',
  payload: { receiptData, columnsData },
});
export const update = (key, value) => ({
  type: 'UPDATE',
  payload: { key, value },
});
export const updateColumn = (columnsData) => ({
  type: 'UPDATE_COLUMN',
  payload: { columnsData },
});
export const updateColumnKey = (columnId, key, value) => ({
  type: 'UPDATE_COLUMN_KEY',
  payload: { columnId, key, value },
});
export const updateImageData = (imageSrc, imageFile, fromUrl) => ({
  type: 'UPDATE_IMAGE_DATA',
  payload: { imageSrc, imageFile, fromUrl },
});
export const updateImageUri = (uri) => ({
  type: 'UPDATE_IMAGE_URI',
  payload: { uri },
});
export const addPerson = (newPerson, columnId) => ({
  type: 'ADD_PERSON',
  payload: { newPerson, columnId },
});
export const addColumnPerson = (personName, columnId) => ({
  type: 'ADD_COLUMN_PERSON',
  payload: { personName, columnId },
});
export const clear = () => ({
  type: 'CLEAR',
});
export const clearImage = () => ({
  type: 'CLEAR_IMAGE',
});
