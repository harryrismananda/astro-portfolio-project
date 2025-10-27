export interface ISEOProps {
  title: string;
  description: string;
  image: string;
  type: string;
}

export interface ILayoutSEO {
  seo: ISEOProps
}

export interface IProject {
    id: number,
    title: string,
    description: string,
    image: string,
    techStack: string[]
    features: string[]
    githubUrl: string,
    liveUrl: string,
    status: string,
    duration: string,
    team: string,
    highlights: string[],
    category: string,
    createdAt?: string,
}