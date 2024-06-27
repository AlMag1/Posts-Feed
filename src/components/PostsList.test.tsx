import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { renderWithProviders } from "@tests/utils";
import { PostsSliceState } from "@src/lib/features/posts/postsSlice";
import { __MOCK_POSTS__ } from "@tests/__mocks__/mockPosts";
import PostsList from "./PostsList";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/posts", async () => {
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

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Display a feed of posts", () => {
  it("Should display a loading state", () => {
    renderWithProviders(<PostsList />, {
      preloadedState: {
        posts: { ...postsSliceState, loading: true },
      },
    });

    expect(screen.getByText(/Posts are loading/)).toBeDefined();
  });

  it("Should display a list of posts with a body and user firstname and lastname", () => {
    renderWithProviders(<PostsList />, {
      preloadedState: {
        posts: {
          ...postsSliceState,
          posts: __MOCK_POSTS__,
        },
      },
    });

    const [post] = __MOCK_POSTS__;
    const { body, author } = post;
    const { firstName = "", lastName = "" } = author || {};
    const substring = body.substring(0, 10);

    expect(screen.getByText(new RegExp(substring, "i"))).toBeDefined();
    expect(screen.getByText(new RegExp(firstName, "i"))).toBeDefined();
    expect(screen.getByText(new RegExp(lastName, "i"))).toBeDefined();
  });

  it("Should display an error if the request failed", () => {
    renderWithProviders(<PostsList />, {
      preloadedState: {
        posts: {
          ...postsSliceState,
          error: "Request has failed with 404 code",
          posts: [],
        },
      },
    });

    expect(screen.getByText(/We're sorry/)).toBeDefined();
  });
});
