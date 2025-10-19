import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
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
    }, 5000);

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
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden min-h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-80 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-700/90 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
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
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full flex flex-col gap-5 h-full !p-8">
                  <div className="flex justify-center">
                    <h3 className="text-3xl font-bold">{project.title}</h3>
                  </div>
                  {/* Description */}
                  <div className="w-full">
                    <p className="text-gray-800 text-lg leading-relaxed font-medium ">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-3 flex flex-col gap-3">
                    <h4 className="font-bold text-base uppercase tracking-wider text-gray-900">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="w-20 justify-center items-center flex text-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border-2 border-indigo-200 hover:bg-indigo-100 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3 flex flex-col gap-3">
                    <h4 className="font-bold text-base uppercase tracking-wider text-gray-900">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start text-gray-900"
                        >
                          <svg
                            className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5"
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
                          <span className="text-base font-semibold leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full h-full flex flex-row gap-5 justify-evenly items-end">

                  <div className="gap-4 pt-4 flex justify-center w-80 h-15">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-base hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-base hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
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
