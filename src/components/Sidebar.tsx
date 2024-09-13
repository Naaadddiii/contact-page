import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:w-64 md:relative md:flex md:flex-col`}
    >
      <button
        className="absolute top-4 right-4 md:hidden p-2"
        onClick={toggleSidebar}
      >
        {isOpen ? <CloseIcon /> : <ExpandMoreIcon />}
      </button>
      <div className="mt-4">
        <h1 className="text-lg font-semibold">My App</h1>
        <ul className="mt-4">
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/maps" className="block py-2 px-4 hover:bg-gray-700">
              Charts & Maps
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
