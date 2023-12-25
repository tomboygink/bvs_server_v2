import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const devsAPI = createApi({
  reducerPath: "devsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3040" }),
  tagTypes: ["Devs"],
  endpoints: (build) => ({
    fetchAllDevs: build.query({
      query: () => ({
        url: "/api",
        method: "POST",
        body: {
          cmd: "get_DevsGroups",
          args: {
            user_w: "true",
            org_id: "1",
          },
          sess_code:
            "1f0f6e886ae8e9f19f4692a071e9133d68b00383a35d8850575d0ece4acf079a",
        },
      }),
      providesTags: (result) => ["Devs"],
    }),
  }),
});
