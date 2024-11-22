// Tipo de patron de diseño: Estructural -> Composite

export class Ingredient {
  constructor(public name: string){}
}

export class IngredientGroup {
  private ingredients: Ingredient[] = []

  add(Ingredient: Ingredient){
    this.ingredients.push(Ingredient)
  }

  list() : string[] {
    return this.ingredients.map(ingredient => ingredient.name)
  }

}
