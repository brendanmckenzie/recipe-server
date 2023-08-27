import { Link, useLoaderData } from "react-router-dom";
import { Ingredient, Recipe } from "../../gql/graphql";
import { useWakeLock } from "../../hooks/use-wake-lock";

const IngredientDisplay: React.FC<{ input?: Ingredient }> = ({ input }) => {
  if (!input) {
    return null;
  }
  if (input.amount?.unit) {
    return (
      <span>
        {input.name} × {input.amount.quantity} {input.amount.unit}
      </span>
    );
  } else if (input.amount?.quantity) {
    return (
      <span>
        {input.name} × {input.amount.quantity}
      </span>
    );
  }
  return <span>{input.name}</span>;
};

export const RecipeRoute: React.FC = () => {
  const wakeLock = useWakeLock();

  const data = useLoaderData() as Recipe;
  const ingredientsFlat =
    data.steps
      ?.map((step) => step?.ingredients ?? [])
      .filter(Boolean)
      .flat(1)
      .map((a) => a?.name)
      .filter((ent, cur, arr) => arr.indexOf(ent) === cur) ?? [];

  return (
    <>
      <Link to="/">&larr; Home</Link>
      <hr />
      <h1>{data.name}</h1>
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
        <ul>
          {ingredientsFlat.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          )) ?? null}
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
