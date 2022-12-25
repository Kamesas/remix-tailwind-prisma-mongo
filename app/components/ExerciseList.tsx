import { useLoaderData } from "@remix-run/react";
import type { FC } from "react";

type tExerciseListProps = {
  [key: string]: any;
};

export const ExerciseList: FC<tExerciseListProps> = () => {
  const { exercises } = useLoaderData();
  return (
    <ul className="flex gap-2">
      {exercises?.map((item: any) => {
        return <li key={item?.id}>{item?.value}</li>;
      })}
    </ul>
  );
};
