import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/home";
import { RecipeRoute } from "./routes/recipe";
import { client } from "./client";
import { GetRecipeDocument, ListRecipesDocument } from "./gql/graphql";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    loader: async () => {
      const result = await client.query({
        query: ListRecipesDocument,
      });
      if (!result.data.recipes) {
        throw new Response("Not Found", { status: 404 });
      }
      return result.data.recipes;
    },
  },
  {
    path: "/recipes/:path",
    element: <RecipeRoute />,
    loader: async ({ params }) => {
      const result = await client.query({
        query: GetRecipeDocument,
        variables: { path: params.path! },
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
