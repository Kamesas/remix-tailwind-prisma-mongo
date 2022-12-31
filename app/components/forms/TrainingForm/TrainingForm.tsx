import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { exerciseArr } from "~/CONSTANTS/workout";
import type { Rep, Training } from "@prisma/client";
import { RemixReactSelect } from "~/components/formsElement/Select/RemixReactSelect";

const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  tooltips2: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
): Obj[FirstKey][SecondKey] => {
  return tooltips2[firstKey][secondKey];
};

export const TrainingForm = () => {
  const actionData = useActionData();
  // const { exercises } = useLoaderData();
  const training = useLoaderData()?.training as Training & { set: Rep[] };
  const [formError] = useState(actionData?.error || "");
  const [formData, setFormData] = useState({
    value: "",
    exerciseName: "",
  });

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        value: "",
      };
    });
  }, [training?.set?.length]);

  const handleChange = (value: string, field: string) => {
    setFormData((data) => ({ ...data, [field]: value }));
  };

  const opt = exerciseArr?.map((item) => ({
    name: item?.value,
    label: item?.name,
  }));

  if (!training?.id) return null;
  return (
    <div className="flex gap-4 mt-4">
      <Form
        method="post"
        action="/workout"
        className="py-8 p-6 bg-base-100 rounded-xl flex-shrink-0 w-full max-w-2xl"
      >
        <input type={"hidden"} value={training?.id} name="id" />

        <div className="flex gap-4 flex-wrap">
          <input
            name="value"
            type="text"
            placeholder="Enter amount reps"
            className="input input-bordered grow shrink-0"
            value={formData.value}
            onChange={(e) => handleChange(e?.target?.value, "value")}
          />

          <RemixReactSelect
            options={opt}
            name="exerciseName"
            defaultValue={opt[0]}
            customValue={formData.exerciseName}
            onChange={(e) => e?.name && handleChange(e.name, "exerciseName")}
          />

          <button
            type="submit"
            aria-label="create rep"
            name="_action"
            value={"createRep"}
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
      </Form>

      {/* <div className="flex-grow flex-shrink">
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
