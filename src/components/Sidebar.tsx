import { CodeXml, Home, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [currentPath, setCurrentPath] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);

    const detectActiveSection = () => {
      // Don't detect if we're manually navigating
      if (isNavigating) return;
      
      // if (window.location.pathname !== "/") {
      //   setActiveSection("");
      //   return;
      // }

      const sections = ["hero", "skills", "projects", "contact"];
      let currentSection = "hero";
       const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      
      if (isAtBottom) {
        // If at bottom, set last section as active
        currentSection = "contact";
      } else {

      // Find the section that's currently most visible
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (top of section is above middle of screen)
          if (rect.top <= 100 && rect.bottom > 100) {
            currentSection = sectionId;
          }
        }
      }}

      setActiveSection(currentSection);
    };

    // Set initial section
    const hash = window.location.hash.substring(1);
    if (hash && ["hero", "skills", "projects", "contact"].includes(hash)) {
      setActiveSection(hash);
    } else {
      detectActiveSection();
    }

    // Listen to scroll events with throttling
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        detectActiveSection();
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isNavigating]);

  const handleNavigation = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      
      // Set navigating flag and update active state
      setIsNavigating(true);
      setActiveSection(sectionId);

      if (window.location.pathname !== "/") {
        window.location.href = href;
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Re-enable detection after scroll completes (1.5 seconds is safe for smooth scroll)
          setTimeout(() => {
            setIsNavigating(false);
          }, 2000);
        }
      }
    } else {
      window.location.href = href;
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      return currentPath === "/" && activeSection === sectionId;
    }
    return currentPath === href;
  };

  return (
    <div>
      <aside className="hidden md:flex fixed z-40 bg-[#9babfe] h-[50vh] w-14  flex-col justify-between items-center p-4 left-0 top-1/4 rounded-e-3xl">
        <ul className="flex flex-col justify-evenly items-center h-full  text-gray-50">
          <button
            onClick={() => handleNavigation("/#hero")}
            className="relative group"
            title="Home"
          >
            <Home
              size={22}
              color={isActive("/#hero") ? "#ffffff" : "#1c398e"}
              className="cursor-pointer hover:opacity-80 transition-all"
            />
            {isActive("/#hero") && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-white rounded-r-full"></span>
            )}
          </button>
          <button
            onClick={() => handleNavigation("/#skills")}
            className="relative group"
            title="Skills"
          >
            <CodeXml
              size={22}
              color={isActive("/#skills") ? "#ffffff" : "#1c398e"}
              className="cursor-pointer hover:opacity-80 transition-all"
            />
            {isActive("/#skills") && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-white rounded-r-full"></span>
            )}
          </button>
          <button
            onClick={() => handleNavigation("/#projects")}
            className="relative group"
            title="Highlighted Projects"
          >
            <Sparkles
              size={22}
              color={isActive("/#projects") ? "#ffffff" : "#1c398e"}
              className="cursor-pointer hover:opacity-80 transition-all"
            />
            {isActive("/#projects") && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-white rounded-r-full"></span>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/#contact")}
            className="relative group"
            title="Contact"
          >
            <Mail
              size={22}
              color={isActive("/#contact") ? "#ffffff" : "#1c398e"}
              className="cursor-pointer hover:opacity-80 transition-all"
            />
            {isActive("/#contact") && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-white rounded-r-full"></span>
            )}
          </button>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
