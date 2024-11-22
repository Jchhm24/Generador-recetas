// Tipo de patron de diseño: Creacional -> prototype
import { Ingredient } from "@/models/Ingredient";

export class Recipe {
  constructor(public name: string, public description: string, public ingredients: Ingredient[]){}

  // Generamos un clon de la receta actual pasando los valores de la receta actual
  clone(): Recipe {
    return new Recipe(
      this.name,
      this.description,
      this.ingredients.map(ingredient => new Ingredient(ingredient.name)),
    )
  }
}
