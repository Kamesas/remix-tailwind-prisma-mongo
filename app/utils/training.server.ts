import { prisma } from "./prisma.server";

export const getExercisesByUserId = async (userId: string) => {
  return await prisma.exercises.findMany({
    where: {
      userId,
    },
  });
};

export const getExercisesByUserIdAndDate = async (
  userId: string,
  date: string
) => {
  return await prisma.exercises.findMany({
    where: {
      userId,
      // name: {
      //   equals: "push ups",
      // },
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

export const deleteExercise = async ({
  exerciseId,
}: {
  exerciseId: string;
}) => {
  await prisma.exercises.delete({
    where: {
      id: exerciseId,
    },
  });
};
