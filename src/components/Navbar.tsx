import { Home as HomeIcon, Mail } from "@mui/icons-material";
import { FileText, X, Menu, Folder } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleNavigation = (href: string) => {
    window.location.href = href;
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    return currentPath === href;
  };

  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Portfolio", href: "/portfolio", icon: Folder },
    { name: "Resume", href: "/resume", icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50  bg-[#9babfe] backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-full px-6">
        <div className="flex  h-17 gap-2 px-5 items-center min-w-full justify-evenly">
          {/* Logo */}
          <div className="flex">
          <a href="/" className="flex items-center justify-between space-x-2 group">
              <span className="text-xl font-bold  text-blue-900 bg-clip-text hover:text-gray-500 ">
                M Harry Rismananda
              </span>
          </a>
          </div>
            <div></div>
          <div className="flex">
               {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3 items-center space-x-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group relative px-4 py-2 text-md font-medium transition-all duration-200 rounded-lg hover:cursor-pointer ${
                  isActive(item.href)
                    ? "text-blue-900"
                    : "text-blue-900 hover:text-black"
                }`}
              >
                <span className="flex gap-1 items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </span>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-blue-900 rounded-full"></span>
                )}
              </button>
            ))}

            {/* CTA Button */}
            <button
              className="ml-4 px-5 w-full py-2 bg-blue-700  hover:bg-[#1d1b50] hover:cursor-pointer text-white rounded-lg font-medium transition-all duration-200 flex flex-row items-center justify-center gap-2"
              onClick={() =>
                (window.location.href = "mailto:harryrismananda@gmail.com")
              }
            >
              <Mail className="" />
              <span className="flex justify-center items-center ">Hire Me</span>
            </button>
          </div>
          </div>
          
       

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 animate-[fade-in_0.4s_ease-out]">
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`group flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg w-full text-left ${
                    isActive(item.href)
                      ? "bg-blue-900 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                  )}
                </button>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                <button
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={() =>
                    (window.location.href = "mailto:harryrismananda@gmail.com")
                  }
                >
                  <Mail className="w-4 h-4" />
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
