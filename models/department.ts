import { Schema, model } from 'mongoose';

export interface IDepartment {
  name: string;
}

const DepartmentSchema = new Schema<IDepartment>({
  name: {
    type: String,
    unique: true,
    required: [true, 'El nombre es requerido'],
  },
});

DepartmentSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export default model<IDepartment>('Department', DepartmentSchema);
