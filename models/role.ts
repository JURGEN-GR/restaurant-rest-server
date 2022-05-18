import { Schema, model } from 'mongoose';

export interface IRole {
  name: string;
  screens: Schema.Types.ObjectId[];
  active: boolean;
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    lowercase: true,
  },
  screens: {
    type: [Schema.Types.ObjectId],
    ref: 'Screen',
    required: [true, 'Las pantallas son requeridas'],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

RoleSchema.methods.toJSON = function () {
  const { __v, active, ...data } = this.toObject();
  return data;
};

export default model<IRole>('Role', RoleSchema);
