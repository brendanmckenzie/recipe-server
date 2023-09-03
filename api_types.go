package main

import "github.com/graphql-go/graphql"

type FolderItemObj struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

var FolderItem = graphql.NewObject(graphql.ObjectConfig{
	Name: "FolderItem",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"type": &graphql.Field{
			Type: FolderItemType,
		},
	},
})

var FolderItemType = graphql.NewEnum(graphql.EnumConfig{
	Name: "FolderItemType",
	Values: graphql.EnumValueConfigMap{
		"FOLDER": &graphql.EnumValueConfig{
			Value: "folder",
		},
		"RECIPE": &graphql.EnumValueConfig{
			Value: "recipe",
		},
	},
})

type MapTypeObj struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

var MapType = graphql.NewObject(graphql.ObjectConfig{
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

var IngredientAmountType = graphql.NewObject(graphql.ObjectConfig{
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

var IngredientType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Ingredient",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"amount": &graphql.Field{
			Type: IngredientAmountType,
		},
	},
})

var StepType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Step",
	Fields: graphql.Fields{
		"directions": &graphql.Field{
			Type: graphql.String,
		},
		"ingredients": &graphql.Field{
			Type: graphql.NewList(IngredientType),
		},
	},
})

type RecipeObj struct {
	Name     string       `json:"name"`
	Steps    []Step       `json:"steps"`
	Metadata []MapTypeObj `json:"metadata"`
}

var RecipeType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Recipe",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"steps": &graphql.Field{
			Type: graphql.NewList(StepType),
		},
		"metadata": &graphql.Field{
			Type: graphql.NewList(MapType),
		},
	},
})
