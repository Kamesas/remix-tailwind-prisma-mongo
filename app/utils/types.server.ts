export type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginForm = Pick<RegisterForm, "email" | "password">;
