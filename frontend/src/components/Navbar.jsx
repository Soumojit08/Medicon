import { useState } from "react";
import { Contact, HomeIcon, Settings, Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="shadow-sm  w-full top-0 z-40 backdrop-blur-lg flex items-center justify-between px-4 py-4 bg-zinc-100">
      <div>
        <h1 className="text-2xl uppercase font-semibold text-blue-600">
          Medicon
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="sm:hidden text-gray-100" onClick={toggleMenu}>
          <Menu />
        </button>
        <ul
          className={`${
            isOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-zinc-100 shadow-md rounded-b-md p-4"
              : "hidden sm:flex gap-4"
          } sm:flex sm:flex-row gap-4 text-gray-100`}
        >
          <li className="list-none">
            <a href="/" className="flex hover:text-blue-600 items-center p-2">
              <HomeIcon className="mr-1" />
              <span>Home</span>
            </a>
          </li>
          <li className="list-none">
            <a href="/" className="flex hover:text-blue-600 items-center p-2">
              <Settings className="mr-1" />
              <span>Service</span>
            </a>
          </li>
          <li className="list-none">
            <a href="/" className="flex hover:text-blue-600 items-center p-2">
              <Contact className="mr-1" />
              <span>Contact</span>
            </a>
          </li>
        </ul>
        <a href="/loginDashboard">
          <button className="bg-blue-600 px-3 py-2 rounded text-white text-sm sm:px-4 sm:py-2 hover:bg-blue-500 cursor-pointer">
            Login
          </button>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
