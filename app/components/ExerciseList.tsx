import { Form, useLoaderData } from "@remix-run/react";
import type { FC } from "react";

type tExerciseListProps = {
  [key: string]: any;
};

export const ExerciseList: FC<tExerciseListProps> = () => {
  const { exercises } = useLoaderData();

  // console.log("exercises", exercises);

  return (
    <ul className="flex gap-2">
      {exercises?.map((item: any) => {
        return (
          <li key={item?.id}>
            <span className="">{item?.value}</span>
            <Form method="post" action="/workout">
              <input type={"hidden"} value={item?.id} name="id" />
              <button
                aria-label="delete"
                type="submit"
                name="_action"
                value={"delete"}
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
