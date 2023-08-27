import { Link, useLoaderData } from "react-router-dom";
import { Ingredient, Recipe } from "../../gql/graphql";
import { useWakeLock } from "../../hooks/use-wake-lock";
import React from "react";

const IngredientDisplay: React.FC<{ input?: Ingredient }> = ({ input }) => {
  if (!input) {
    return null;
  }
  if (input.amount?.unit) {
    return (
      <>
        <span>{input.name}</span>{" "}
        <span>
          × {input.amount.quantity} {input.amount.unit}
        </span>
      </>
    );
  } else if (input.amount?.quantity) {
    return (
      <>
        <span>{input.name}</span> <span>× {input.amount.quantity}</span>
      </>
    );
  }
  return (
    <>
      <span>{input.name}</span>
    </>
  );
};

export const RecipeRoute: React.FC = () => {
  const wakeLock = useWakeLock();

  const data = useLoaderData() as Recipe;
  const ingredientsFlat =
    data.steps
      ?.map((step) => step?.ingredients ?? [])
      .filter(Boolean)
      .flat(1) ?? [];

  const incredientNames = ingredientsFlat
    .map((a) => a?.name)
    .filter((ent, cur, arr) => arr.indexOf(ent) === cur);

  const ingredientsWithAmount = incredientNames.map((name) => {
    const amount = ingredientsFlat
      .filter((ingredient) => ingredient?.name === name)
      .map((ingredient) => ingredient?.amount)
      .filter(Boolean)
      .flat(1)
      .reduce(
        (acc, cur) => {
          return {
            quantity: (acc?.quantity ?? 0) + (cur?.quantity ?? 0),
            unit: cur?.unit,
          };
        },
        { quantity: 0, unit: "" }
      );
    return {
      name,
      amount,
    };
  });

  const skipMetadata = ["name"];
  const displayMetadata = data.metadata!.filter(
    (ent) => !skipMetadata.includes(ent?.key!)
  );

  return (
    <>
      <Link to="/">&larr; Home</Link>
      <hr />
      <h1>{data.name}</h1>
      {displayMetadata.length > 0 ? (
        <dl>
          {displayMetadata.map((ent, i) => (
            <React.Fragment key={i}>
              <dt>{ent?.key}</dt>
              <dd>
                {ent?.value?.startsWith("http") ? (
                  <a href={ent?.value} target="_blank" rel="noreferrer">
                    link
                  </a>
                ) : (
                  ent?.value
                )}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      ) : null}
      <hr />
      {wakeLock.isSupported ? (
        <>
          <button
            type="button"
            onClick={() =>
              wakeLock.released === false
                ? wakeLock.release()
                : wakeLock.request()
            }
          >
            {wakeLock.released === false
              ? "Release screen keep active"
              : "Keep screen active"}
          </button>

          <hr />
        </>
      ) : null}
      <details>
        <summary>
          <strong>Ingredients</strong>
        </summary>
        <ul className="ingredients">
          {ingredientsWithAmount.map((ingredient, i) => (
            <li key={i}>
              <IngredientDisplay
                input={{
                  name: ingredient.name,
                  amount: {
                    quantity: ingredient.amount?.quantity,
                    unit: ingredient.amount?.unit,
                  },
                }}
              />
            </li>
          ))}
        </ul>
      </details>
      <hr />

      <h2>Method</h2>
      <ol>
        {data.steps
          ?.filter((step) => Boolean(step?.directions))
          .map((step, i) => (
            <li key={i}>
              <p>{step?.directions}</p>
              {(step?.ingredients?.length ?? 0) > 0 && (
                <ul>
                  {step?.ingredients?.map((ingredient, j) => (
                    <li key={j}>
                      <IngredientDisplay input={ingredient as Ingredient} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )) ?? null}
      </ol>
      <hr />
      <Link to="/">&larr; Home</Link>
    </>
  );
};
