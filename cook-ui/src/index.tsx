import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/home";
import { RecipeRoute } from "./routes/recipe";
import { client } from "./client";
import { GetRecipeDocument, ListFolderDocument } from "./gql/graphql";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    loader: async ({ request }) => {
      const path = new URL(request.url).searchParams.get("path");
      const result = await client.query({
        query: ListFolderDocument,
        variables: {
          path,
        },
      });
      if (!result.data.folder) {
        throw new Response("Not Found", { status: 404 });
      }
      return { path, items: result.data.folder };
    },
  },
  {
    path: "/recipes/*",
    element: <RecipeRoute />,
    loader: async ({ params }) => {
      const result = await client.query({
        query: GetRecipeDocument,
        variables: { path: params["*"]! },
      });
      if (!result.data.recipe) {
        throw new Response("Not Found", { status: 404 });
      }
      return result.data.recipe;
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
