import { prisma } from "./prisma.server";

export const getExercisesByUserId = async (userId: string) => {
  return await prisma.exercises.findMany({
    where: {
      id: userId,
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
        gte: new Date("2022-12-26"),
        lt: new Date("2022-12-27"),
      },
    },
  });
};

export const createTraining = async ({ userId }: { userId: string }) => {
  return await prisma.training.create({
    data: {
      userId,
    },
  });
};

export const createTrainingRep = async ({
  trainingId,
  name,
  value,
}: {
  trainingId: string;
  name: string;
  value: string;
}) => {
  return await prisma.rep.create({
    data: {
      trainingId,
      name,
      value,
    },
  });
};

export const getTrainingByUserIdAndDate = async (
  userId: string,
  date: string
) => {
  return await prisma.training.findMany({
    where: {
      userId,
      // name: {
      //   equals: "push ups",
      // },
      createdAt: {
        gte: new Date("2022-12-26"),
        lt: new Date("2022-12-27"),
      },
    },
    include: {
      training: true,
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
  return await prisma.exercises.create({
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
  if (!exerciseId) return null;
  return await prisma.exercises.delete({
    where: {
      id: exerciseId,
    },
  });
};
