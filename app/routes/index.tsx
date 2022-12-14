import type { LoaderFunction } from "@remix-run/node";
import { MainLayout } from "~/components/layouts/MainLayout";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function Index() {
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl uppercase font-bold text-center pt-1 bg-slate-300">
          Hello world!
        </h1>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
              className="hover:text-slate-600"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
}
