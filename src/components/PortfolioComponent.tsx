import { Calendar, ExternalLink, Github, Star, Users } from "lucide-react";
import type { IProject } from "../types/type";

interface IProps {
  projects: IProject[];
}

export const PortfolioComponent = (props: IProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Development":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-12 flex flex-col gap-5 w-full h-full">
      {props.projects.map((project, index) => (
        <div
          key={project.id}
          className={`card-base  overflow-hidden ${
            index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
          }`}
        >
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Project Visual */}
            <div
              className={`lg:col-span-2 relative bg-blue-600 min-h-[280px] flex items-center justify-center ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <div className="absolute inset-0 bg-blue-600/90 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <span
                    className={`inline-block w-50 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div
              className={` lg:col-span-3 p-8 ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <div className="space-y-6 space-x-6 flex flex-col gap-5 py-5 px-5 mx-5 justify-between items-center">
                {/* Description */}
                <div>
                  <p className="text-white text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="w-full flex flex-col py-5 my-5 gap-3">
                  <h4 className="flex font-semibold text-sm uppercase tracking-wide text-white mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 w-25 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-white mb-3">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start text-white"
                      >
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Stats & Highlights */}
                <div className="flex flex-wrap gap-10 pt-3 border-t border-gray-200 text-white">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">{project.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">{project.team}</span>
                  </div>
                  {project.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center text-sm text-blue-400"
                    >
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
