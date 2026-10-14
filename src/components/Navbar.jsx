import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyle = ({ isActive }) =>
    `block rounded-md px-4 py-3 text-sm ${
      isActive ? "bg-[#0B9BD3] text-white" : "text-blue-100 hover:bg-white/10"
    }`;

  return (
    <aside className="sticky top-0 h-screen w-60 bg-[#123F68]">
      <div className="border-b border-white/20 px-6 py-6">
        <h1 className="text-lg font-semibold text-white">Services Manager</h1>
      </div>

      <nav className="px-4 py-7">
        <p className="mb-3 px-4 text-xs text-blue-200">Main Menu</p>

        <div className="space-y-1">
          <NavLink to="/services" className={linkStyle}>
            Services
          </NavLink>

          <NavLink to="/appointment" className={linkStyle}>
            Appointment
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
