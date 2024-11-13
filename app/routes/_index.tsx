import { LoaderFunction } from "@remix-run/node";
import { requiredUserId } from "../utils/auth.server";

// export const loader: LoaderFunction = async ({ request }) => {
//   await requiredUserId(request);
//   return null;
// };

export default function Index() {
  return (
    <div className="bg-slate-100 flex justify-center items-center">
      <h1 className="text-blue-600 font-extrabold text-5xl">
        Dashboard 
      </h1>
    </div>
  );
}
