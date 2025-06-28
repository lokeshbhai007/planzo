import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:npg_mQ1qTE4jHXJc@ep-aged-base-a1zc3xir-pooler.ap-southeast-1.aws.neon.tech/planzo?sslmode=require&channel_binding=require"
);
export const db = drizzle(sql, { schema });