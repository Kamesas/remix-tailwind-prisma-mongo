import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { InputField } from "~/components/forms/InputField/InputField";
import { MainLayout } from "~/components/layouts/MainLayout";
import { login, register } from "~/utils/auth.server";
import { validateEmail, validateName, validatePassword } from "~/utils/validators.server"; // prettier-ignore
import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

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
  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");
  const [action, setAction] = useState<"login" | "register">("login");

  console.log({ errors, formError });

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.lastName || "",
    lastName: actionData?.fields?.firstName || "",
  });

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, [action]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
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
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email}
          />
          {action === "register" && (
            <>
              <InputField
                htmlFor="firstName"
                label="First Name"
                onChange={(e) => handleInputChange(e, "firstName")}
                value={formData.firstName}
                error={errors?.firstName}
              />
              <InputField
                htmlFor="lastName"
                label="Last Name"
                onChange={(e) => handleInputChange(e, "lastName")}
                value={formData.lastName}
                error={errors?.lastName}
              />
            </>
          )}
          <InputField
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors?.password}
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
