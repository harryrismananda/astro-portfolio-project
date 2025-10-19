import type { APIRoute } from "astro";
import { Projects } from "../../../models/projects";
import { ObjectId } from "mongodb";

// GET - Fetch single project by ID
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid project ID"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const project = await Projects.where("_id", new ObjectId(id)).first();

    if (!project) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Project not found"
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: project
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch project"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

// PUT - Update project by ID (requires authentication)
export const PUT: APIRoute = async ({ params, request, locals }) => {
  try {
    // Check if user is authenticated
    if (!locals.user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized"
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid project ID"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      image,
      images,
      technologies,
      features,
      githubUrl,
      liveUrl,
      status,
      category,
      duration,
      team
    } = body;

    // Check if project exists
    const existingProject = await Projects.where("_id", new ObjectId(id)).first();

    if (!existingProject) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Project not found"
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Build update object (only include provided fields)
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (images !== undefined) updateData.images = images;
    if (technologies !== undefined) updateData.technologies = technologies;
    if (features !== undefined) updateData.features = features;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl;
    if (status !== undefined) updateData.status = status;
    if (category !== undefined) updateData.category = category;
    if (duration !== undefined) updateData.duration = duration;
    if (team !== undefined) updateData.team = team;

    // Update project
    await Projects.where("_id", new ObjectId(id)).update(updateData);

    // Fetch updated project
    const updatedProject = await Projects.where("_id", new ObjectId(id)).first();

    return new Response(
      JSON.stringify({
        success: true,
        data: updatedProject,
        message: "Project updated successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Failed to update project"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

// DELETE - Delete project by ID (requires authentication)
export const DELETE: APIRoute = async ({ params, locals }) => {
  try {
    // Check if user is authenticated
    if (!locals.user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized"
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid project ID"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Check if project exists
    const existingProject = await Projects.where("_id", new ObjectId(id)).first();

    if (!existingProject) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Project not found"
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Delete project
    await Projects.where("_id", new ObjectId(id)).delete();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Project deleted successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete project"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
