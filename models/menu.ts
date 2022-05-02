import { Schema, model } from 'mongoose';

export interface IMenu {
  name: string;
}

const MenuSchema = new Schema<IMenu>({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

MenuSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export default model<IMenu>('Menu', MenuSchema);
