<template>
  <div class="flex flex-col gap-2 border border-black/25 rounded-xl p-5 w-3/12">
    <h2 class="text-2xl font-bold">Crear Receta</h2>
    <form @submit.prevent="addRecipe" class="flex flex-col gap-4">
      <label class="flex flex-col gap-2">
        Nombre de la receta
        <input type="text" v-model="recipeName" placeholder="Nombre de la receta" class="inputs">
      </label>
      <label class="flex flex-col gap-2">
        Descripción
        <input type="text" v-model="recipeDescription" placeholder="Descripción" class="inputs">
      </label>
      <label class="flex flex-col gap-2">
        Ingrediente
        <input type="text" v-model="ingredientName" placeholder="Ingredientes" class="inputs">
      </label>
      <button @click.prevent="addIngredient" class="flex flex-row justify-center gap-1 bg-cyan-600 rounded-md py-2 px-4 text-white font-semibold outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
          <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/>
        </svg>
        Agregar Ingrediente
      </button>
      <ul class="flex flex-row flex-wrap gap-4 justify-center w-full border border-dashed border-slate-700 rounded-lg p-4 text-center">
        {{ text() }}
        <li v-for="(ing, index) in ingredients" :key="index" class="p-2 bg-slate-700 text-white rounded-md">
          {{ ing.name }}
        </li>
      </ul>
      <button type="submit" class="bg-green-600 rounded-md py-2 px-4 text-white font-semibold outline-none">
        Guardar Receta
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { Recipe } from "@/models/Recipe";
import { Ingredient } from "@/models/Ingredient";

const emits = defineEmits(['recipe-added']);

const recipeName = ref<string>('');
const recipeDescription = ref<string>('');
const ingredientName = ref<string>('');
const ingredients = ref<Ingredient[]>([]);

// Añade un ingrediente a la lista de ingredientes
const addIngredient = () => {
  if (ingredientName.value) {
    ingredients.value.push(new Ingredient(ingredientName.value));
    ingredientName.value = '';
  }
};

const addRecipe = () => {
  const newRecipe = new Recipe(recipeName.value, recipeDescription.value, ingredients.value);
  emits('recipe-added', newRecipe);
  recipeName.value = '';
  recipeDescription.value = '';
  ingredients.value = [];
};

const text = () => {
  return ingredients.value.length === 0 ? 'No se ha añadido algún ingrediente' : '';
};
</script>
