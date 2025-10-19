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
    <div className="space-y-10 w-full flex flex-col gap-5">
      {props.projects.map((project, index) => (
        <div
          key={project.id}
          className={`bg-white rounded-2xl border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
            index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Project Visual */}
            <div
              className={`relative bg-gradient-to-br from-indigo-600 to-purple-700 min-h-[400px] flex items-center justify-center ${
                index % 2 === 1 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/95 to-purple-700/95 flex items-center justify-center p-8">
                <div className="text-white text-center max-w-md">
                  <div className="w-28 h-28 mx-auto mb-6 bg-white/15 rounded-3xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
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
                  <h3 className="text-3xl font-bold mb-4 leading-tight">{project.title}</h3>
                  <span
                    className={`inline-block px-5 py-2 rounded-full text-base font-bold border-2 ${getStatusColor(
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
              className={`p-8 lg:p-10 ${
                index % 2 === 1 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className="flex flex-col justify-between h-full space-y-15">
                {/* Description */}
                <div className="space-y-4">
                  <p className="text-gray-900 text-lg leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <h4 className="font-bold text-base uppercase tracking-wider text-gray-900">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border-2 border-indigo-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <h4 className="font-bold text-base uppercase tracking-wider text-gray-900">
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start text-gray-900"
                      >
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-base font-semibold leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Stats & Highlights */}
                <div className="flex flex-wrap gap-4 pt-6 border-t-2 border-gray-300">
                  <div className="flex items-center text-base text-gray-900">
                    <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                    <span className="font-bold">{project.duration}</span>
                  </div>
                  <div className="flex items-center text-base text-gray-900">
                    <Users className="w-5 h-5 mr-2 text-indigo-600" />
                    <span className="font-bold">{project.team}</span>
                  </div>
                  {project.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center text-base text-indigo-700 bg-indigo-100 px-4 py-2 rounded-full border-2 border-indigo-300"
                    >
                      <Star className="w-5 h-5 mr-2 fill-current" />
                      <span className="font-bold">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-base hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-base hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5" />
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
