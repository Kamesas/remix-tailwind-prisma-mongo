import { prisma } from "./prisma.server";

export const getExercisesById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: { exercises: true },
  });
};

export const createKudo = async (
  message: string,
  userId: string,
  recipientId: string
) => {
  await prisma.kudo.create({
    data: {
      message,
      author: {
        connect: {
          id: userId,
        },
      },
      recipient: {
        connect: {
          id: recipientId,
        },
      },
    },
  });
};
