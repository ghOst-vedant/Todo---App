import zod from "zod";

export const creation = zod.object({
  title: zod.string(),
  description: zod.string(),
});
export const update = zod.object({
  id: zod.string(),
});
