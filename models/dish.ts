import { Schema, model } from 'mongoose';

export interface IDish {
  name: string;
  description: string;
  menu: Schema.Types.ObjectId;
  price: number;
  media_library: String[];
}

const DishSchema = new Schema<IDish>({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  media_library: {
    type: [String],
    maxlength: 4,
  },
});

DishSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export default model<IDish>('Dish', DishSchema);
