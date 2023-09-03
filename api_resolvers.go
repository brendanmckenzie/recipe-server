package main

import (
	"io/fs"
	"strings"

	"github.com/graphql-go/graphql"
)

func resolveFolder(params graphql.ResolveParams) (interface{}, error) {
	path := params.Args["path"].(string)

	entries, err := fs.ReadDir(fsys, path)
	result := make([]FolderItemObj, 0)

	for _, item := range entries {
		if strings.HasPrefix(item.Name(), ".") {
			continue
		} else if item.IsDir() {
			result = append(result, FolderItemObj{
				Name: item.Name(),
				Type: "folder",
			})
		} else if strings.HasSuffix(item.Name(), ".cook") {
			result = append(result, FolderItemObj{
				Name: item.Name(),
				Type: "recipe",
			})
		}
	}

	return result, err
}

func resolveRecipe(params graphql.ResolveParams) (interface{}, error) {
	path := params.Args["path"].(string)
	recipeRaw, err := fs.ReadFile(fsys, path)
	if err != nil {
		return nil, err
	}
	recipe, err := ParseString(string(recipeRaw))

	metadata := make([]MapTypeObj, 0)
	for key, value := range recipe.Metadata {
		metadata = append(metadata, MapTypeObj{
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
