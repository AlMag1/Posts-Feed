import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { renderWithProviders } from "@tests/utils";
import { PostsSliceState } from "@src/lib/features/posts/postsSlice";
import { __MOCK_POSTS__ } from "@tests/__mocks__/mockPosts";
import PostPage from "./page";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/posts/1", async () => {
    await delay(150);
    return HttpResponse.json([]);
  }),
  http.get("https://dummyjson.com/users", async () => {
    await delay(150);
    return HttpResponse.json([]);
  }),
];

const server = setupServer(...handlers);

const postsSliceState: PostsSliceState = {
  start: 0,
  end: 20,
  error: null,
  loading: false,
  selectedPost: null,
  hasMoreResults: false,
  posts: [],
};

const mockParams = { id: 1 };

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Display the selected post", () => {
  it("Should display a loading state", () => {
    renderWithProviders(<PostPage params={mockParams} />, {
      preloadedState: {
        posts: { ...postsSliceState, loading: true },
      },
    });

    expect(screen.getByText(/Loading/i)).toBeDefined();
  });
});
