import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  index,
  serial,
  unique,
  json,
} from "drizzle-orm/pg-core";
import { createId as cuid } from "@paralleldrive/cuid2";
import { user } from "../auth";

// export const role = pgTable("role", {
//   roleId: serial("role_id").notNull().primaryKey(),
//   name: text("name", {
//     enum: [
//       "verified::cpt",
//       "verified::opt",
//       "verified::stem-opt",
//       "verified::cap-gap",
//       "verified::h-1b",
//       "verified::internship",
//     ],
//   }),
// });
//

export type Group = typeof group.$inferSelect;
export const group = pgTable(
  "group",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    name: text("name"),
    slug: text("slug").unique(),
  },
  (t) => [index("group_slug_idx").on(t.slug)],
);

export type GroupsToUsers = typeof groupsToUsers.$inferSelect;
export const groupsToUsers = pgTable(
  "groups_to_users",
  {
    id: serial("id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    groupId: text("group_id")
      .notNull()
      .references(() => group.id),
    role: text("role", {
      enum: ["member", "verified-member"],
    }).default("member"),
  },
  (t) => [unique("unique_user_group").on(t.userId, t.groupId)],
);

export type Post = typeof post.$inferSelect;
export const post = pgTable(
  "post",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    groupId: text("group_id")
      .notNull()
      .references(() => group.id),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
  },
  (t) => [index("post_author_idx").on(t.authorId)],
);

export type Tag = typeof tag.$inferSelect;
export const tag = pgTable("tag", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").unique().notNull(),
});

export type TagsToPosts = typeof tagsToPosts.$inferSelect;
export const tagsToPosts = pgTable(
  "tagsToPosts",
  {
    id: serial("id").primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => post.id),
    tagId: text("tag_id")
      .notNull()
      .references(() => tag.id),
  },
  (t) => [unique("unique_post_tag").on(t.postId, t.tagId)],
);

export type Comment = typeof comment.$inferSelect;
export const comment = pgTable(
  "comment",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id),
    postId: text("post_id")
      .notNull()
      .references(() => post.id),
    content: json("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("comment_post_idx").on(t.id),
    index("comment_author_idx").on(t.authorId),
  ],
);
