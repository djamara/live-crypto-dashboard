import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClasses = ({ isActive = false }) =>
    `px-4 py-2 rounded hover:bg-gray-200 transition ${
      isActive ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-green-600">
              Crypto Dashboard
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-2">
            <NavLink to="/" className={linkClasses}>
              Dashboard
            </NavLink>
            <NavLink to="/favorites" className={linkClasses}>
              Favorites
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}