import type { Rep, Training } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";
import type { FC } from "react";

type tExerciseListProps = {
  [key: string]: any;
};

export const ExerciseList: FC<tExerciseListProps> = () => {
  const training = useLoaderData()?.training as Training & { set: Rep[] };

  if (!training?.set?.length) return <h2>no reps yet</h2>;
  return (
    <ul className="flex gap-2 flex-wrap">
      {training?.set?.map((item) => {
        return (
          <li key={item?.id} className="flex gap-2 border-2 p-2 ">
            <span className="">
              {item?.name} {`-->`} {item?.value}
            </span>
            <Form method="post" action="/workout">
              <input type={"hidden"} value={item?.id} name="id" />
              <button
                aria-label="delete"
                type="submit"
                name="_action"
                value={"deleteRep"}
              >
                x
              </button>
            </Form>
          </li>
        );
      })}
    </ul>
  );
};
