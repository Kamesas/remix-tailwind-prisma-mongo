import { useState } from "react";
import { InputField } from "~/components/forms/InputField/InputField";
import { MainLayout } from "~/components/layouts/MainLayout";

export default function Login() {
  const [action, setAction] = useState<"login" | "register">("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    secondName: "",
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

        <form className="rounded-2xl bg-cyan-300 p-10 w-96">
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
                  id: "secondName",
                  name: "secondName",
                  value: formData?.secondName,
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
