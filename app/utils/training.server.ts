import { dateFormat } from "~/helpers/dates";
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

export const getTodaysTraining = async (userId: string) => {
  const { allFormats } = dateFormat({
    initDate: new Date(),
    format: "currDay",
  });

  return await prisma.training.findFirst({
    where: {
      userId,
      // name: {
      //   equals: "push ups",
      // },
      createdAt: {
        gte: new Date(allFormats?.currDay),
        lt: new Date(allFormats?.nextDay),
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
