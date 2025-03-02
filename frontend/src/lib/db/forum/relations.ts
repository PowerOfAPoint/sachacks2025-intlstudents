import { relations } from "drizzle-orm";
import {
  comment,
  group,
  groupsToUsers,
  post,
  tag,
  tagsToPosts,
  vote,
} from "./schema";
import { user } from "../auth";

export const groupRelations = relations(group, ({ many }) => ({
  posts: many(post, { relationName: "post_groups" }),
  members: many(groupsToUsers, { relationName: "groups_to_user" }),
}));

export const groupsToUsersRelations = relations(groupsToUsers, ({ one }) => ({
  group: one(group, {
    fields: [groupsToUsers.groupId],
    references: [group.id],
    relationName: "groups_to_users",
  }),
  user: one(user, {
    fields: [groupsToUsers.userId],
    references: [user.id],
    relationName: "users_to_groups",
  }),
}));

export const postRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
    relationName: "posts",
  }),
  group: one(group, {
    fields: [post.groupId],
    references: [group.id],
    relationName: "post_groups",
  }),
  tags: many(tagsToPosts, { relationName: "posts_to_tags" }),
  comments: many(comment, { relationName: "comments" }),
  votes: many(vote, { relationName: "post_votes" }),
}));

export const voteRelations = relations(vote, ({ one }) => ({
  // post: one(post, {
  //   fields: [vote.],
  //   references: [post.id],
  //   relationName: "post_votes",
  // }),
  user: one(user, {
    fields: [vote.userId],
    references: [user.id],
    relationName: "user_votes",
  }),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  posts: many(tagsToPosts, { relationName: "tags_to_posts" }),
}));

export const tagsToPostsRelations = relations(tagsToPosts, ({ one }) => ({
  post: one(post, {
    fields: [tagsToPosts.postId],
    references: [post.id],
    relationName: "tags_to_posts",
  }),
  tag: one(tag, {
    fields: [tagsToPosts.tagId],
    references: [tag.id],
    relationName: "posts_to_tags",
  }),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  author: one(user, {
    fields: [comment.authorId],
    references: [user.id],
    relationName: "user_comments",
  }),
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
    relationName: "comments",
  }),
}));
