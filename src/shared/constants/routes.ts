export const ROUTES = {
  home: "/",
  story: "/story/:id",
} as const;

export const storyPath = (id: string) => `/story/${id}`;
