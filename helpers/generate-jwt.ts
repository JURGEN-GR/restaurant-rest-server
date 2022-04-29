import jwt from 'jsonwebtoken';

export const generateJwt = async (_id: String = ''): Promise<String> => {
  return new Promise((resolve, reject) => {
    const payload = { _id };
    jwt.sign(
      payload,
      process.env.SECRERKEY!,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }
        resolve(token!);
      }
    );
  });
};
