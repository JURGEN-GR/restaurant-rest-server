import { Schema, model } from 'mongoose';

// Definicion del esquema de los tipos de mensajes
export interface ITypeMessage {
  name: string;
}

const TypeMessageSchema = new Schema<ITypeMessage>({
  name: {
    type: String,
    required: true,
  },
});

TypeMessageSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export const TypeMessage = model<ITypeMessage>(
  'TypeMessage',
  TypeMessageSchema
);

// Definicion del esquema de los mensajes
export interface IMessage {
  name: string;
  email: string;
  typeMessage: Schema.Types.ObjectId;
  message: string;
}

const MessageSchema = new Schema<IMessage>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    lowercase: true,
  },
  typeMessage: {
    type: Schema.Types.ObjectId,
    ref: 'TypeMessage',
    required: [true, 'El tipo de mensaje es requerido'],
  },
  message: {
    type: String,
    required: [true, 'El mensaje es requerido'],
  },
});

MessageSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export const Message = model<IMessage>('Message', MessageSchema);
