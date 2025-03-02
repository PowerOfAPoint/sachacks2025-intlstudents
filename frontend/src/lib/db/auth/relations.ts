import { relations } from "drizzle-orm";
import { account, session, user, verification } from "./schema";
import { comment, groupsToUsers, post, role, vote } from "../forum/schema";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session, { relationName: "sessions" }),
  accounts: many(account, { relationName: "accounts" }),
  groups: many(groupsToUsers, { relationName: "users_to_groups" }),
  posts: many(post, { relationName: "posts" }),
  comments: many(comment, { relationName: "comments" }),
  votes: many(vote, {
    relationName: "user_votes",
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
    relationName: "sessions",
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
    relationName: "accounts",
  }),
}));
