import { useNavigate } from "react-router-dom";

export default function AppBar() {
  const navigate = useNavigate();
    return (
      <div className="flex justify-between text-lg items-center">
        <div>Quick Pay</div>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={(e) => {
            localStorage.removeItem("token");
            navigate("/signup");
          }}
        >
          Log Out
        </button>
      </div>
    );
}