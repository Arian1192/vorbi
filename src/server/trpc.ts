// aqui vamos atener los procedure Helpers
import { initTRPC } from "@trpc/server";
const t = initTRPC.create()

// Base router and procedure helpers
export const router = t.router // aqui vamos a meter nuestros routers
export const procedure = t.procedure // aqui vamos a meter nuestros procedures