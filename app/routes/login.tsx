import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useState } from "react";
import { InputField } from "~/components/forms/InputField/InputField";
import { MainLayout } from "~/components/layouts/MainLayout";
import { login, register } from "~/utils/auth.server";
import { validateEmail, validateName, validatePassword } from "~/utils/validators.server"; // prettier-ignore

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (
    action === "register" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    console.log("==== register err =====");
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName((firstName as string) || ""),
          lastName: validateName((lastName as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean)) {
    console.log("==== common validation err =====");
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );
  }

  switch (action) {
    case "login": {
      return await login({ email, password });
    }
    case "register": {
      firstName = firstName as string;
      lastName = lastName as string;

      console.log("in =============> i");

      return await register({ email, password, firstName, lastName });
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || "");
  const [action, setAction] = useState<"login" | "register">("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target?.name]: e.target.value,
      };
    });
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col justify-center items-center gap-y-4">
        <h2 className="text-5xl font-extrabold">Welcome !</h2>

        <button
          onClick={() =>
            setAction((prev) => (prev === "login" ? "register" : "login"))
          }
          className="mt-3 border py-2 px-4 rounded-md uppercase border-black bg-slate-50 tracking-wide font-mono hover:bg-slate-800  hover:text-teal-50"
        >
          {action === "login" ? "To sing up" : "To sign in"}
        </button>

        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
          {formError}
        </div>

        <form method="post" className="rounded-2xl bg-cyan-300 p-10 w-96">
          <InputField
            label="Email"
            inputsProps={{
              type: "text",
              id: "email",
              name: "email",
              value: formData?.email,
              onChange: onInputChange,
            }}
          />
          {action === "register" && (
            <>
              <InputField
                label="First name"
                inputsProps={{
                  type: "text",
                  id: "firstName",
                  name: "firstName",
                  value: formData?.firstName,
                  onChange: onInputChange,
                }}
              />
              <InputField
                label="Second name"
                inputsProps={{
                  type: "text",
                  id: "lastName",
                  name: "lastName",
                  value: formData?.lastName,
                  onChange: onInputChange,
                }}
              />
            </>
          )}

          <InputField
            label="Password"
            inputsProps={{
              type: "text",
              id: "password",
              name: "password",
              value: formData?.password,
              onChange: onInputChange,
            }}
          />

          <button
            type="submit"
            name="_action"
            value={action}
            className="mt-3 border py-2 px-4 rounded-md uppercase border-black bg-slate-50 tracking-wide font-mono hover:bg-slate-800  hover:text-teal-50"
          >
            {action === "login" ? "Sing in" : "Sign up"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
