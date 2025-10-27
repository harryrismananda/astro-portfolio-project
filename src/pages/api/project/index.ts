import type { APIRoute } from "astro";
import { Projects } from "../../../models/projects";

// GET - Fetch all projects or filter by query params
export const GET: APIRoute = async ({ url }) => {
  try {
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");
    const limit = parseInt(url.searchParams.get("limit") || "0");
    const skip = parseInt(url.searchParams.get("skip") || "0");

    let query = Projects.query();

    if (category) {
      query = query.where("category", category);
    }

    if (status) {
      query = query.where("status", status);
    }

    if (skip > 0) {
      query = query.skip(skip);
    }

    if (limit > 0) {
      query = query.limit(limit);
    }

    const projects = await query.get();
    const total = await Projects.count();

    return new Response(
      JSON.stringify({
        success: true,
        data: projects,
        meta: {
          total,
          limit,
          skip
        }
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
        message: error instanceof Error ? error.message : "Failed to fetch projects"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

// POST - Create a new project (requires authentication)
export const POST: APIRoute = async ({ request, locals }) => {
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

    // Validation
    if (!title || !description) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Title and description are required"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "At least one technology is required"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Create project
    const project = await Projects.create({
      title,
      description,
      image,
      images,
      technologies,
      features,
      githubUrl,
      liveUrl,
      status: status || "active",
      category,
      duration,
      team
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: project,
        message: "Project created successfully"
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Failed to create project"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
