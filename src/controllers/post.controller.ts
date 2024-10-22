import prisma from "../db/prisma";
import AppError from "../services/application.error";
import mainController from "../services/mainController.services";
import { success } from "../utils/success.utils";

export const postHandler = {
  create: mainController(async (req, res) => {
    const id = req.user.id;
    console.log("checking id ", id);
    if (!id) {
      throw new AppError("Not Autorized ", {
        cause: "there is no id from the token ",
      });
    }

    const post = await prisma.post.create({
      data: {
        title: "test post",
        content: "Test content ",
        author: {
          connect: {
            id: id as number,
          },
        },
      },
    });

    const resPost = await prisma.post.findUnique({
      where: {
        id: post.id,
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    success(res, {
      stausCode: 201,
      statusMessage: "success",
      data: {
        ...resPost,
      },
    });
  }),

  getPostByID: mainController(async (req, res) => {
    const { postID } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postID),
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    success(res, {
      data: { ...post },
      stausCode: 200,
      statusMessage: "success",
    });
  }),

  getPostsByAuthor: mainController(async (req, res) => {
    const { authorID } = req.params;

    const posts = await prisma.post.findMany({
      where: {
        authorId: Number(authorID),
      },
      include: {
        author: {
          select: {
            email: true,
            username: true,
          },
        },
      },
    });

    success(res, {
      data: {
        posts: [...posts],
      },
      statusMessage: "success",
      stausCode: 200,
    });
  }),

  updatePost: mainController(async (req, res) => {
    const { postID } = req.params;
    const { content, title } = req.body;

    const newPost = await prisma.post.update({
      where: {
        id: Number(postID),
      },
      data: {
        content,
        title,
      },
    });

    success(res, {
      statusMessage: "success",
      stausCode: 201,
      data: {
        ...newPost,
      },
    });
  }),

  getAllPosts: mainController(async (req, res) => {
    const allPosts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true,
            email: true,
            name: true,
          },
        },
      },
    });

    success(res, {
      statusMessage: "success",
      stausCode: 200,
      data: { ...allPosts },
    });
  }),

  deletePost: mainController(async (req, res) => {
    const { postID } = req.params;

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postID),
      },
    });

    success(res, {
      stausCode: 200,
      statusMessage: "success",
      data: {
        message: "successfully deleted .!",
        post: { ...deletedPost },
      },
    });
  }),
};
