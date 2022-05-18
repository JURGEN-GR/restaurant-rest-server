import { Schema, model } from 'mongoose';

export interface IRestaurant {
  location: string;
  lat: number;
  lng: number;
  active: boolean;
}

const RestaurantSchema = new Schema<IRestaurant>({
  location: {
    type: String,
    required: [true, 'La dirección es requerida'],
    unique: true,
    lowercase: true,
  },
  lng: {
    type: Number,
    required: [true, 'La longitud es requerida'],
  },
  lat: {
    type: Number,
    required: [true, 'La latitud es requerida'],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

RestaurantSchema.methods.toJSON = function () {
  const { __v, active, ...data } = this.toObject();
  return data;
};

export default model<IRestaurant>('Restaurant', RestaurantSchema);
