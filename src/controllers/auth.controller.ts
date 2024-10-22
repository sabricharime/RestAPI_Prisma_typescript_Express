import mainController from "../services/mainController.services";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import prisma from "../db/prisma";
import AppError from "../services/application.error";
import { success } from "../utils/success.utils";
import { generateToken } from "../utils/generateToken";

type RegisterData = {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const auth = {
  register: mainController(async (req, res, next) => {
    const { username, name, email, password, confirmPassword } =
      req.body as RegisterData;
    if (!username || !email || !password) {
      throw new AppError("please fill all the feilds  ", {
        cause: "empty fields ",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        username: true,
        email: true,
        name: true,
      },
    });

    if (user) {
      throw new AppError("The User Allrady existe ", {
        cause: new Error(" existe"),
      });
    }
    if (password !== confirmPassword) {
      throw new AppError("Password not match", {});
    }

    const hashPass = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashPass,
      },
    });

    success(res, {
      statusMessage: "success",
      stausCode: 201,
      data: newUser,
    });
  }),
  login: mainController(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("please fill all the fields ", {
        cause: "empty fields ",
      });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError("user not found  ", {
        cause: "invalid incomming data or user not registred yet ",
      });
    }

    const comparePass = comparePassword(user.password, password);
    if (!comparePass) {
      throw new AppError("Invalid credentials ", {
        cause: "invalid password or email ",
      });
    }
    generateToken(res, user.id);
    success(res, {
      data: {
        username: user.username,
        email: user.email,
      },
      stausCode: 200,
      statusMessage: "success",
    });
  }),
  getMyprofile: mainController(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.user.id),
      },
      select: {
        username: true,
        email: true,
        name: true,
      },
    });

    if (!user)
      throw new AppError("Not authorized", {
        cause: "no id from the request ",
      });

    success(res, {
      data: {
        ...user,
      },
      statusMessage: "success",
      stausCode: 200,
    });
  }),
};
