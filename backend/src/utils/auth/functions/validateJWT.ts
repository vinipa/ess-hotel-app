import * as jwt from 'jsonwebtoken';

const API_KEY = process.env.API_KEY || 'API_KEY';

interface DecodedToken {
  idUser: string;
}

export async function validateJWT(token: string): Promise<string | null> {
  try {
    const decodedToken = (await jwt.verify(token, API_KEY)) as DecodedToken;
    return decodedToken.idUser;
  } catch (err) {
    return null;
  }
}
