import { WSContext } from "hono/ws";

export const notifiableUsers = new Map<string, Set<WSContext>>();
