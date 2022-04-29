import { Schema, model } from 'mongoose';

export interface IScreen {
  name: String;
  active: Boolean;
}

const ScreenSchema = new Schema<IScreen>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true,
    lowercase: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
});

ScreenSchema.methods.toJSON = function () {
  const { __v, active, ...data } = this.toObject();
  return data;
};

export default model<IScreen>('Screen', ScreenSchema);
