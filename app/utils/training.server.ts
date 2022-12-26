import { prisma } from "./prisma.server";

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
  return await prisma.training.findFirst({
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
      set: true,
    },
  });
};

export const deleteRep = async ({ repId }: { repId: string }) => {
  if (!repId) return null;
  return await prisma.rep.delete({
    where: {
      id: repId,
    },
  });
};
