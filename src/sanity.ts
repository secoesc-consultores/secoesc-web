import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url"; 

export const client = createClient({
  projectId: "mtl1bf29",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-06-30",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}