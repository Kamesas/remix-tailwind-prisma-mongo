import type { FC } from "react";

type tMainLayoutProps = {
  [key: string]: any;
};

export const MainLayout: FC<tMainLayoutProps> = ({ children }) => {
  return <div className="h-screen w-full">{children}</div>;
};
