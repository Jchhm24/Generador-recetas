// Tipo de patron de diseño: Comportamiento -> Chain of Responsibility
import type { Recipe } from "@/models/Recipe"

export class RecipeValidator {
  static validate(recipe: Recipe): string {
    if (!recipe.name) return "La receta debe tener un nombre";
    if (!recipe.description) return "La receta debe tener una descripción";
    if (recipe.ingredients.length === 0) return "La receta debe tener ingredientes";
    return "Receta válida";
  }
}
