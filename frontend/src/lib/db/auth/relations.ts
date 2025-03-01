import { relations } from "drizzle-orm";
import { account, session, user, verification } from "./schema";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  verificationTokens: many(verification),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user),
}));

export const verificationRelations = relations(account, ({ one }) => ({
  user: one(user),
}));
