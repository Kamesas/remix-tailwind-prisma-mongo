import { Form } from "@remix-run/react";
import type { FC } from "react";

type tCreateTrainingProps = {
  [key: string]: any;
};

export const CreateTraining: FC<tCreateTrainingProps> = () => {
  return (
    <Form method="post" action="/workout">
      <button
        type="submit"
        aria-label="create training"
        name="_action"
        value={"createTraining"}
        className="rounded-xl bg-yellow-300 font-semibold text-blue-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
      >
        Create training
      </button>
    </Form>
  );
};
