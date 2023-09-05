import { Link, useLoaderData } from "react-router-dom";
import { Ingredient, Recipe } from "../../gql/graphql";
import { useWakeLock } from "../../hooks/use-wake-lock";
import React from "react";

const quantityDisplay = (input?: number | null): string => {
  if (!input) {
    return "";
  }

  const fracMap: { [key: number]: string } = {
    0.125: "⅛",
    0.25: "¼",
    0.333: "⅓",
    0.375: "⅜",
    0.5: "½",
    0.625: "⅝",
    0.667: "⅔",
    0.75: "¾",
    0.875: "⅞",
  };

  const frac = input % 1;
  const whole = input - frac;
  const fracRound = Math.round(frac * 1000) / 1000;

  if (fracMap[fracRound]) {
    return `${whole ? whole : ""} ${fracMap[fracRound]}`;
  }
  return `${input}`;
};

const IngredientDisplay: React.FC<{ input?: Ingredient }> = ({ input }) => {
  if (!input) {
    return null;
  }
  if (input.amount?.unit) {
    return (
      <>
        <span>{input.name}</span>{" "}
        <span>
          × {quantityDisplay(input.amount.quantity)} {input.amount.unit}
        </span>
      </>
    );
  } else if (input.amount?.quantity) {
    return (
      <>
        <span>{input.name}</span>{" "}
        <span>× {quantityDisplay(input.amount.quantity)}</span>
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
      <h1>{data.name}</h1>
      {displayMetadata.length > 0 ? (
        <dl>
          {displayMetadata.map((ent, i) => {
            const isLink = ent?.value?.startsWith("http");
            return (
              <React.Fragment key={i}>
                <dt className={isLink ? "hidden-print" : undefined}>
                  {ent?.key}
                </dt>
                <dd className={isLink ? "hidden-print" : undefined}>
                  {isLink ? (
                    <a href={ent?.value!} target="_blank" rel="noreferrer">
                      link
                    </a>
                  ) : (
                    ent?.value
                  )}
                </dd>
              </React.Fragment>
            );
          })}
        </dl>
      ) : null}
      <hr />
      {wakeLock.isSupported ? (
        <>
          <button
            type="button"
            className="hidden-print"
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

          <hr className="hidden-print" />
        </>
      ) : null}
      <details className="hidden-print">
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
      <hr className="hidden-print" />

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
    </>
  );
};
