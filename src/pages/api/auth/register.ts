import type { APIRoute } from "astro";
import { Users } from "../../../models/users";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, password, email } = body;

    // Validation
    if (!username || !password || !email) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Username, email, and password are required" 
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Check if user already exists
    const existingUser = await Users.where("username", username).first();
    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Username already exists" 
        }),
        { 
          status: 409,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Check if email already exists
    const existingEmail = await Users.where("email", email).first();
    if (existingEmail) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Email already exists" 
        }),
        { 
          status: 409,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Register the user (validation is now done in the model)
    const user = await Users.register(username, password, email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { 
          id: user._id,
          username: user.username,
          email: user.email
        },
        message: "User registered successfully" 
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
        message: error instanceof Error ? error.message : "Registration failed" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
