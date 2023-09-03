import * as React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FolderItem, FolderItemType } from "../../gql/graphql";

export const HomeRoute: React.FC = () => {
  const { items, path } = useLoaderData() as {
    items: FolderItem[];
    path?: string;
  };

  const parentPath = path?.split("/").slice(0, -1).join("/");

  return (
    <>
      <h1>Recipes</h1>
      {path ? (
        <ul className="crumbs">
          <li>
            <Link to={`/`}>home</Link>
          </li>
          {path.split("/").map((str, idx, arr) => (
            <li key={str}>
              {idx === arr.length - 1 ? (
                str
              ) : (
                <Link to={`/?path=${arr.slice(0, idx + 1).join("/")}`}>
                  {str}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      <hr />
      <ul>
        {path ? (
          <li>
            <Link
              to={parentPath ? `/?path=${parentPath}` : "/"}
            >{`📁 ..`}</Link>
          </li>
        ) : null}
        {items.map((r) => {
          const itemPath = [path, r.name].filter(Boolean).join("/");
          return (
            <li key={r.name}>
              {r.type === FolderItemType.Folder ? (
                <Link to={`/?path=${itemPath}`}>{`📁 ${r.name}`}</Link>
              ) : (
                <Link to={`/recipes/${itemPath}`}>{`📄 ${r.name}`}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
