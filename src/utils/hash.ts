import { hash, compare } from "bcrypt";

const saltRound = 10;

export async function generateHash(text: string) {
  try {
    return await hash(text, saltRound);
  } catch (err) {
    console.log("err", err);
    return "generate error";
  }
}
export async function validateHash(text: string, hash: string) {
  try {
    const a = await compare(text, hash);
    return a;
  } catch (err) {
    console.log("err", err);
    return false;
  }
}
