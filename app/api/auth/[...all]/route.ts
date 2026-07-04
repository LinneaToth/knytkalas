//Necessary file for better-auth, which demands HTTP endpoints

import { auth } from "@/data/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
