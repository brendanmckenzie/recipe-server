package main

import (
	"os"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

var fsys = os.DirFS(os.Getenv("RECIPE_DIR"))

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"recipe": &graphql.Field{
			Type:    RecipeType,
			Resolve: resolveRecipe,
			Args: graphql.FieldConfigArgument{
				"path": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
		},

		"folder": &graphql.Field{
			Type:    graphql.NewList(FolderItem),
			Resolve: resolveFolder,
			Args: graphql.FieldConfigArgument{
				"path": &graphql.ArgumentConfig{
					Type:         graphql.String,
					DefaultValue: ".",
				},
			},
		},
	},
})

var RecipeSchema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: rootQuery,
})

var handleApi = handler.New(&handler.Config{
	Schema:   &RecipeSchema,
	Pretty:   true,
	GraphiQL: true,
})
