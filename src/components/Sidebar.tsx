import { Folder, Home, Mail, User } from "lucide-react";

const Sidebar = () => {
  const handleNavigation = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      if (window.location.pathname !== "/") {
        window.location.href = "/" + href;
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <div>
      <aside className="hidden md:flex fixed z-40 bg-[#9babfe] h-[50vh] w-14  flex-col justify-between items-center p-4 left-0 top-1/4 rounded-e-3xl">
        <ul className="flex flex-col justify-evenly items-center h-full  text-gray-50">
          <button onClick={() => handleNavigation("/#hero")}>
            <Home
              size={22}
              color="#1c398e"
              className="cursor-pointer hover:opacity-80"
            />
          </button>
          <button onClick={() => handleNavigation("/#about")}>
            <User
              size={22}
              color="#1c398e"
              className="cursor-pointer hover:opacity-80"
            />
          </button>
          <a href="/portfolio">
            <Folder
              size={22}
              color="#1c398e"
              className="cursor-pointer hover:opacity-80"
            />
          </a>
          <button onClick={() => handleNavigation("/#contact")}>
            <Mail
              size={22}
              color="#1c398e"
              className="cursor-pointer hover:opacity-80"
            />
          </button>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
