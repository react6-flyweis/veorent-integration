interface ICard {
  _id: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv?: string;
  country: string;
  isDefault: boolean;
  isCarSaved: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ICardCreateData {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  country: string;
  isDefault: boolean;
  isCarSaved: boolean;
}

interface ICardUpdateData extends Partial<ICardCreateData> {
  _id: string;
}
