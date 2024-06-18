import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      transformResponse: (response: Todo[]) => response.sort((a, b) => a.id - b.id),
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "/todos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ id, ...body }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body,
      }),
        invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
        invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
