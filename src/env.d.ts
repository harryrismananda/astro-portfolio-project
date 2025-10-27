/// <reference types="astro/client" />

import type { ObjectId } from "mongodb";

declare global {
  namespace App {
    interface Locals {
      user?: {
        id: ObjectId;
        username: string;
      };
    }
  }
}

export {};
