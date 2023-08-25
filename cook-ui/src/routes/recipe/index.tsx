import { Link, useLoaderData } from "react-router-dom";
import { Ingredient, Recipe } from "../../gql/graphql";

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
      <h1>{data.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {ingredientsFlat.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        )) ?? null}
      </ul>
      <h2>Method</h2>
      <ol>
        {data.steps
          ?.filter((step) => Boolean(step?.directions))
          .map((step, i) => (
            <li key={i}>
              {step?.directions}
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
