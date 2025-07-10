import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const { user, loading, handleLogout } = useContext(StoreContext);

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div className="bg-[#111827] border-b border-gray-700">
      <ul className="flex gap-6 px-6 py-4 text-gray-300 text-sm font-medium w-full items-center">
        {/* Left-aligned nav links */}
        <li className="text-blue-400 font-bold text-lg tracking-wide mr-4">
          ClientSync
        </li>

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline"
                : "hover:text-blue-300 transition"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/revenue"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline"
                : "hover:text-blue-300 transition"
            }
          >
            Revenue
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline"
                : "hover:text-blue-300 transition"
            }
          >
            Invoices
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leads"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline"
                : "hover:text-blue-300 transition"
            }
          >
            Leads
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline"
                : "hover:text-blue-300 transition"
            }
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline"
                : "hover:text-blue-300 transition"
            }
          >
            Client
          </NavLink>
        </li>

        {/* Push following items to right end */}
        <div className="ml-auto flex items-center gap-6">
          {!user ? (
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 underline"
                    : "hover:text-blue-300 transition"
                }
              >
                Sign in
              </NavLink>
            </li>
          ) : (
            <>
              <li className="text-green-400">Welcome, {user.name}</li>
              <li
                onClick={handleLogout}
                className="hover:text-red-400 cursor-pointer"
              >
                Logout
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
