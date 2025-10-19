import { Folder, Home, Mail, User } from "lucide-react";

const Sidebar = () => {
  return (
    <div>
      <aside className="hidden md:flex fixed z-40 bg-blue-500 h-[50vh] w-14  flex-col justify-between items-center p-4 left-0 top-1/4 rounded-e-3xl">
        <ul className="flex flex-col justify-evenly items-center h-full  text-gray-50">
          <a href="/">
            <Home
              size={22}
              color="white"
              className="cursor-pointer hover:opacity-80"
            />
          </a>
          <a href="/#about">
            <User
              size={22}
              color="white"
              className="cursor-pointer hover:opacity-80"
            />
          </a>
          <a href="/portfolio">
            <Folder
              size={22}
              color="white"
              className="cursor-pointer hover:opacity-80"
            />
          </a>
          <a href="/#contact">
            <Mail
              size={22}
              color="white"
              className="cursor-pointer hover:opacity-80"
            />
          </a>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
