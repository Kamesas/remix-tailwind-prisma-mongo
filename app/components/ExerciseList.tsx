import type { FC } from "react";
import type { Rep, Training } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import type { tExercises } from "~/CONSTANTS/workout";

type tExerciseListProps = {
  [key: string]: any;
};

export const ExerciseList: FC<tExerciseListProps> = () => {
  const training = useLoaderData()?.training as Training & { set: Rep[] };

  const filterExc = () => {
    let exercises: Partial<Record<tExercises, any>> = {};
    const list = training?.set;

    list?.forEach((item) => {
      const currItem = item?.name as tExercises;
      if (item?.name in exercises) {
        exercises[currItem] = [...exercises[currItem], item];
      } else {
        exercises[currItem] = [item];
      }
    });

    return exercises;
  };

  if (!training?.set?.length) return <h2>no reps yet</h2>;
  return (
    <>
      {Object.entries(filterExc())?.map(
        ([key, reps]: [key: string, reps: Rep[]]) => {
          const total = reps?.reduce(
            (accumulator, { value }) => accumulator + +value,
            0
          );
          return (
            <Fragment key={key}>
              <div className="flex gap-2 items-center  mb-4">
                <h2 className="text-xl font-semibold uppercase">
                  {key}: <span className="text-secondary">{total}</span>
                </h2>
              </div>

              <div className="flex gap-2 flex-wrap">
                {reps?.map((item) => {
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
                        <div className={`stat-value text-accent`}>
                          {item?.value}
                        </div>
                        <div className="stat-desc">{"item?.time"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="divider"></div>
            </Fragment>
          );
        }
      )}
    </>
  );
};
