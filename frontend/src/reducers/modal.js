import { Modals } from '../Enums/Modals';

const initialState = {
  [Modals.UploadImageModal]: false,
  [Modals.QRCodeModal]: false,
  [Modals.AddPersonModal]: false,
  [Modals.CollectMoneyModal]: false,
};

const modal = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'DISPLAY':
      return {
        ...state,
        [payload.modal]: payload.display,
      };
    default:
      return state;
  }
};

export default modal;
