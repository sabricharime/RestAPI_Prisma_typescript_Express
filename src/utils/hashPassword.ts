import bcrypt from "bcrypt";

const genSlat = async () => await bcrypt.genSalt(12);

const hashPassword = async (password: string) =>
  await bcrypt.hash(password, await genSlat());

const comparePassword = async (hashedPassword: string, bodyPassword: string) =>
  bcrypt.compare(bodyPassword, hashedPassword);

export { hashPassword, comparePassword };
