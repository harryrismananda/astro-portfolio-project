import type { APIRoute } from "astro";
import { Users } from "../../../models/users";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Username and password are required" 
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const token = await Users.login(username, password);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { token },
        message: "Login successful" 
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
        message: error instanceof Error ? error.message : "Login failed" 
      }),
      { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
