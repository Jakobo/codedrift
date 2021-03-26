import { getClient } from "src/lib/ghost";
import { ghost2Post } from "../../util";

export default async function post(_, { id, slug }) {
  const ghost = getClient();

  if (id) {
    const result = await ghost.posts.read({ id, include: "tags" });
    return ghost2Post(result || null);
  } else if (slug) {
    const result = await ghost.posts.read({ slug, include: "tags" });
    return ghost2Post(result || null);
  } else {
    return null;
  }
}
