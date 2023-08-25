import * as React from "react";
import { Link, useLoaderData } from "react-router-dom";

export const HomeRoute: React.FC = () => {
  const recipes = useLoaderData() as string[];

  return (
    <ul>
      {recipes.map((r) => (
        <li key={r}>
          <Link to={`/recipes/${r}`}>{r}</Link>
        </li>
      ))}
    </ul>
  );
};
