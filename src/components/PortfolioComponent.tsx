import { ExternalLink, Github, ChevronLeft, ChevronRight, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";
import type { IProject } from "../types/type";

interface IProps {
  projects: IProject[];
}

export const PortfolioComponent = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll every 15 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === props.projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, props.projects.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === props.projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? props.projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {props.projects.map((project) => (
            <div key={project.id} className="min-w-full">
              {/* Card */}
              <div className="group relative bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden h-[600px]">
                {/* Image Section - Always Visible */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                  {project.category === "Mobile App" ? (
                    // Mobile Phone Frame
                    <div className="relative w-56 max-h-full flex items-center justify-center">
                      <div className="relative w-full aspect-[9/19.5] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border-8 border-gray-900">
                        {/* Phone notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10"></div>
                        {/* Screen */}
                        <div className="relative w-full h-full bg-white rounded-[1.8rem] overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="object-contain w-full h-full"
                          />
                        </div>
                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                  ) : (
                    // Laptop Frame
                    <div className="relative w-full max-w-4xl max-h-full flex items-center justify-center">
                      {/* Laptop Screen */}
                      <div className="relative w-full aspect-[16/10] bg-gray-900 rounded-t-lg p-2 shadow-2xl max-h-[480px]">
                        {/* Screen bezel */}
                        <div className="relative w-full h-full bg-gray-800 rounded-t-md overflow-hidden border-2 border-gray-900">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="object-contain w-full h-full"
                          />
                        </div>
                        {/* Camera notch */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
                      </div>
                      {/* Laptop Base */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[102%] h-2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg shadow-lg">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-t-sm"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title - Always Visible at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent z-10">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>

                {/* Hover Overlay - Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-sm opacity-0 group-hover:opacity-80 transition-opacity duration-300 overflow-y-auto z-20">
                  <div className="p-6 h-full flex flex-col">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-200 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{project.team}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-100 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/20 text-white rounded-md text-xs font-semibold border border-white/30 backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 6 && (
                          <span className="px-2 py-1 bg-white/10 text-white rounded-md text-xs font-semibold">
                            +{project.techStack.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-2">
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {project.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start text-gray-100">
                            <svg
                              className="w-4 h-4 text-green-400 mr-1 flex-shrink-0 mt-0.5"
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
                            <span className="text-xs font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-md"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                      {project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute -left-15 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 border-2 border-gray-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>
      <button
        onClick={goToNext}
        className="absolute -right-15 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 border-2 border-gray-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {props.projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-12 h-3 bg-gradient-to-r from-indigo-600 to-purple-600"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
};
