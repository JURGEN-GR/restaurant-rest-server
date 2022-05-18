import { Schema, model } from 'mongoose';

export interface IDish {
  name: string;
  description: string;
  menu: Schema.Types.ObjectId;
  price: number;
  media_library: String[];
  specialty: boolean;
  favorite: boolean;
}

const DishSchema = new Schema<IDish>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    required: [true, 'El menú al que pertenece es requerido'],
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
  },
  specialty: {
    type: Boolean,
    default: false,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
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
