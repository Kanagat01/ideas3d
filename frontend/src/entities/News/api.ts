import { createEffect, createStore } from "effector";
import { apiInstance } from "~/shared/apiInstance";

export const getNewsFx = createEffect<void, News[]>(async () => {
  const response = await apiInstance.get("api/news/");
  return response.data;
});

export const $news = createStore<News[]>([]).on(
  getNewsFx.doneData,
  (_, state) => state
);
