import matter from "gray-matter";
import { DateTime } from "luxon";
import { demoji } from "../demoji";
import { Post } from "types/Post";
import yaml from "js-yaml";
import sort from "sort-array";
import { type ResultOf } from "@graphql-typed-document-node/core";
import { postData } from "gql/posts";
import Markdoc from "@markdoc/markdoc";
import { markdocSchema } from "lib/markdoc/schema";

export type PostFrontmatter = {
  slug: string;
  published?: Date;
  description?: string;
  repost?: {
    url: string;
    text: string;
  };
  changelog?: {
    [date: string]: string;
  };
};

type BlogPostFromGithub = ResultOf<
  typeof postData
>["repository"]["discussions"]["nodes"][0];

export const discussionToBlog = (item: BlogPostFromGithub): Post => {
  const isDraft = false;

  // de-decorate frontmatter
  const demattered = item.body.replace(
    /^(?:```(?:yaml)?[\r\n]+)?(---[\r\n]+[\s\S]+?[\r\n]+---)(?:[\r\n]+```)?/gim,
    // ^fence ^lang            ^actual frontmatter                    ^ end fence
    "$1"
  );

  const ast = Markdoc.parse(demattered);
  const frontmatter: PostFrontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};

  const markdoc = JSON.parse(
    JSON.stringify(
      Markdoc.transform(ast, {
        ...markdocSchema,
        variables: {
          ...markdocSchema.variables,
          frontmatter,
        },
      })
    )
  );

  const canonicalUrl = `https://codedrift.com/thunked/${
    frontmatter.slug || ""
  }`;

  const category =
    (item.labels?.nodes ?? [])
      .filter((label) => label.name.indexOf("📚") === 0)
      .map((label) => ({
        name: label.name,
        display: demoji(label.name),
        description: label.description || null,
        id: label.id,
      }))?.[0] || null;
  const tags = (item.labels?.nodes ?? [])
    .filter((label) => !category?.id || label.id !== category.id)
    .filter((label) => label.name.toLowerCase().indexOf("thunked") === -1)
    .map((label) => ({
      name: label.name,
      display: demoji(label.name),
      description: label.description || null,
      id: label.id,
    }));

  // build changelog. Ensure we see a proper ISO date
  const changelog = Object.keys(frontmatter?.changelog ?? {}).map((dt) => {
    const evt = frontmatter.changelog[dt];
    const changeOn = DateTime.fromISO(dt);
    return {
      isoDate: changeOn.isValid ? changeOn.toISO() : null,
      change: {
        body: evt,
        html: evt,
      },
    };
  });

  sort(changelog, {
    by: "isoDate",
    order: "desc",
  });

  return {
    id: "" + item.id,
    commentUrl: item.url,
    slug: frontmatter.slug,
    draft: isDraft,
    title: item.title || "A post on Thunked",
    description: frontmatter?.description || null,
    excerpt: frontmatter?.description ?? "",
    changelog,
    markdoc,
    body: item.body,
    source: item.url,
    canonicalUrl,
    updatedAt: item.lastEditedAt || null,
    publishedAt: frontmatter.published
      ? DateTime.fromJSDate(frontmatter.published).toISO()
      : null,
    category,
    tags,
  };
};
