import { prisma } from "./prisma.server";

export const getExercisesById = async (userId: string) => {
  return await prisma.exercises.findMany({
    where: {
      userId,
      name: {
        equals: "push ups",
      },
      createdAt: {
        gte: new Date("2022-12-25"),
        lt: new Date("2022-12-26"),
      },
    },
  });
};

export const createExercise = async ({
  name,
  userId,
  value,
}: {
  name: string;
  userId: string;
  value: string;
}) => {
  await prisma.exercises.create({
    data: {
      name,
      value,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
