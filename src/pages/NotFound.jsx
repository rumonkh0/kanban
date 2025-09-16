import Icon from "@/components/Icon";
import { Link } from "react-router";
import { Danger, Home } from "../components/Icon";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg h-full bg-surface2 text-center p-6">
      <div className="bg-surface border border-divider rounded-2xl shadow-md p-10 max-w-md w-full">
        <div className="w-20 h-20 mx-auto flex items-center justify-center bg-red-100 rounded-full mb-6">
          <Danger size={30} className="stroke-brand" />
        </div>

        <h1 className="text-4xl font-bold text-text mb-3">404</h1>
        <p className="text-text2 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2 bg-brand text-white rounded-lg hover:opacity-90 transition"
        >
          <Home size={18} className="stroke-white" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
