<template>
  <div class="flex flex-row gap-10 p-6">
    <RecipeForm @recipe-added="addRecipe" />
    <RecipeList :recipes="recipes" @recipe-cloned="openEditModal" />
    <EditRecipeForm
      v-if="isEditing"
      :editedRecipe="editedRecipe"
      :newIngredient="newIngredient"
      @save-edited-recipe="saveEditedRecipe"
      @close-edit-modal="closeEditModal"
      @add-ingredient="addIngredient"
      @remove-ingredient="removeIngredient"
    />
  </div>
</template> 

<script lang="ts" setup>
import { ref } from "vue";
import RecipeForm from "@/components/RecipeForm.vue";
import RecipeList from "@/components/RecipeList.vue";
import EditRecipeForm from "@/components/EditRecipeForm.vue";
import { RecipeValidator } from "@/models/RecipeValidator";
import { Recipe } from "@/models/Recipe";
import { Ingredient } from "@/models/Ingredient";

const recipes = ref<Recipe[]>([]);
const isEditing = ref(false);
const editedRecipe = ref<Recipe | null>(null);
const newIngredient = ref("");

const addRecipe = (recipe: Recipe) => {
  const validationMessage = RecipeValidator.validate(recipe);
  if (validationMessage === "Receta válida") {
    recipes.value.push(recipe);
  } else {
    alert(validationMessage);
  }
};

const openEditModal = (recipe: Recipe) => {
  isEditing.value = true;
  editedRecipe.value = recipe.clone(); // Clonar la receta para editar
};

const closeEditModal = () => {
  isEditing.value = false;
  editedRecipe.value = null;
  newIngredient.value = "";
};

const addIngredient = () => {
  if (newIngredient.value && editedRecipe.value) {
    editedRecipe.value.ingredients.push(new Ingredient(newIngredient.value));
    newIngredient.value = "";
  }
};

const removeIngredient = (index: number) => {
  if (editedRecipe.value) {
    editedRecipe.value.ingredients.splice(index, 1);
  }
};

const saveEditedRecipe = (updatedRecipe: Recipe) => {
  const validationMessage = RecipeValidator.validate(updatedRecipe);
  if (validationMessage === "Receta válida") {
    const index = recipes.value.findIndex(recipe => recipe.name === updatedRecipe.name);
    if (index !== -1) {
      recipes.value[index] = updatedRecipe;
    } else {
      recipes.value.push(updatedRecipe);
    }
    closeEditModal();
  } else {
    alert(validationMessage);
  }
};
</script>
