import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJWT(payload: Object, options?: jwt.SignOptions) {
   console.log({payload})
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJWT<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    console.log(e);
    return null;
  }
}
