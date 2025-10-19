import { Model, type IMongoloquentSchema, type IMongoloquentTimestamps } from "mongoloquent";
import type { ObjectId } from "mongodb";

interface IProject extends IMongoloquentSchema, IMongoloquentTimestamps {
  title: string;
  description: string;
  image?: string;
  images?: string[];
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
  category?: string;
  duration?: string;
  team?: string;
}

export class Projects extends Model<IProject> {
  /**
   * The attributes of the model.
   */
  public static $schema: IProject;

  protected collection = "projects";
  protected timestamps = true;

  protected fillable = [
    "title",
    "description",
    "image",
    "images",
    "technologies",
    "features",
    "githubUrl",
    "liveUrl",
    "status",
    "category",
    "duration",
    "team"
  ];
}
