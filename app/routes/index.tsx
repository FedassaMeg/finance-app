import { LoaderFunction } from "@remix-run/node";
import { requiredUserId } from "../utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requiredUserId(request);
  return null;
}

export default function Index() {
  return (
    <div className="h-screen bg-slate-700 flex justify-center items-center">
      <h1 className="text-blue-600 font-extrabold text-5xl">Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
