import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  picture: string;
  password: string;
  dateStart: Date;
  birthday: Date;
  restaurant: Schema.Types.ObjectId;
  role: Schema.Types.ObjectId;
  department: Schema.Types.ObjectId;
  active: Boolean;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'El correo es requerido'],
    lowercase: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
  dateStart: {
    type: Date,
    required: [true, 'La fecha de inicio es requerida'],
  },
  birthday: {
    type: Date,
    required: [true, 'La fecha de cumple años es requerida'],
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'El rol es requerido'],
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'El departamento es requerido'],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, active, password, ...data } = this.toObject();
  return data;
};

export default model<IUser>('User', UserSchema);
