import type { Rep, Training } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";
import type { FC } from "react";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

type tExerciseListProps = {
  [key: string]: any;
};

export const ExerciseList: FC<tExerciseListProps> = () => {
  const training = useLoaderData()?.training as Training & { set: Rep[] };

  if (!training?.set?.length) return <h2>no reps yet</h2>;
  const total = 65;
  return (
    <>
      <div className="flex gap-2 items-center  mb-4">
        <h2 className="text-xl font-semibold">
          Push ups: <span className="text-secondary">{total}</span>
        </h2>
      </div>

      <ul className="flex gap-2 flex-wrap">
        {training?.set?.map((item) => {
          return (
            <div key={item?.id} className="stats shadow">
              <div className="stat">
                <div className={`stat-figure text-accent`}>
                  <Form method="post" action="/workout">
                    <input type={"hidden"} value={item?.id} name="id" />
                    <button
                      aria-label="delete"
                      type="submit"
                      name="_action"
                      value={"deleteRep"}
                    >
                      <TrashIcon className="w-8 h-8" />
                    </button>
                  </Form>
                </div>

                {/* <div className="stat-title">{item?.name}</div> */}
                <div className={`stat-value text-accent`}>{item?.value}</div>
                <div className="stat-desc">{"item?.time"}</div>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};
