package main

import (
	"io/fs"
	"os"

	"github.com/graphql-go/graphql"
)

var fsys = os.DirFS(os.Getenv("RECIPE_DIR"))

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"recipe": &graphql.Field{
			Type: recipeType,
			Args: graphql.FieldConfigArgument{
				"path": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: resolveRecipe,
		},

		"recipes": &graphql.Field{
			Type:    graphql.NewList(graphql.String),
			Resolve: resolveRecipes,
		},
	},
})

var graphqlMapType = graphql.NewObject(graphql.ObjectConfig{
	Name: "MapValue",
	Fields: graphql.Fields{
		"key": &graphql.Field{
			Type: graphql.String,
		},
		"value": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var ingredientAmountType = graphql.NewObject(graphql.ObjectConfig{
	Name: "IngredientAmount",
	Fields: graphql.Fields{
		"quantity": &graphql.Field{
			Type: graphql.Float,
		},
		"unit": &graphql.Field{
			Type: graphql.String,
		},
		"isNumeric": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})

var ingredientType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Ingredient",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"amount": &graphql.Field{
			Type: ingredientAmountType,
		},
	},
})

var stepType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Step",
	Fields: graphql.Fields{
		"directions": &graphql.Field{
			Type: graphql.String,
		},
		"ingredients": &graphql.Field{
			Type: graphql.NewList(ingredientType),
		},
	},
})

var recipeType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Recipe",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"steps": &graphql.Field{
			Type: graphql.NewList(stepType),
		},
		"metadata": &graphql.Field{
			Type: graphql.NewList(graphqlMapType),
		},
	},
})

var RecipeSchema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: rootQuery,
})

func resolveRecipes(params graphql.ResolveParams) (interface{}, error) {
	matches, err := fs.Glob(fsys, "*.cook")
	return matches, err
}

type MetadataItemObj struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}
type RecipeObj struct {
	Name     string            `json:"name"`
	Steps    []Step            `json:"steps"`
	Metadata []MetadataItemObj `json:"metadata"`
}

func resolveRecipe(params graphql.ResolveParams) (interface{}, error) {
	path := params.Args["path"].(string)
	recipeRaw, err := fs.ReadFile(fsys, path)
	if err != nil {
		return nil, err
	}
	recipe, err := ParseString(string(recipeRaw))

	metadata := make([]MetadataItemObj, 0)
	for key, value := range recipe.Metadata {
		metadata = append(metadata, MetadataItemObj{
			Key:   key,
			Value: value,
		})
	}

	name := recipe.Metadata["name"]
	if name == "" {
		name = path
	}

	res := RecipeObj{
		Name:     name,
		Steps:    recipe.Steps,
		Metadata: metadata,
	}
	return res, err
}
