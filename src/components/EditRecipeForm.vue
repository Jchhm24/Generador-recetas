<template>
  <div class="fixed bg-black/50 h-screen w-full top-0 left-0 backdrop-blur-sm flex justify-center items-center">
    <form @submit.prevent="saveEditedRecipe" class="bg-white w-2/4 p-8 rounded-xl flex flex-col gap-2">
      <h3 class="text-2xl font-bold">Editar Receta</h3>
      <label class="flex flex-col gap-2">
        Nombre de la receta
        <input v-model="localEditedRecipe.name" placeholder="Nombre de la receta" class="inputs" />
      </label>
      <label class="flex flex-col gap-2">
        Descripción
        <input v-model="localEditedRecipe.description" placeholder="Descripción" class="inputs" />
      </label>
      <ul class="flex flex-row flex-wrap gap-4 justify-center w-full border border-dashed border-slate-700 rounded-lg p-4">
        <li v-for="(ing, index) in localEditedRecipe.ingredients" :key="index" class="p-2 flex flex-row gap-2 bg-slate-700 rounded-md">
          <input v-model="ing.name" class="inputs w-max" />
          <button type="button" @click="removeIngredient(index)" class="bg-red-600 rounded-md py-1 px-2 text-white font-semibold outline-none">Eliminar</button>
        </li>
      </ul>
      <label class="flex flex-col gap-2">
        Nuevo ingrediente
        <input v-model="localNewIngredient" placeholder="Ingrediente" class="inputs" />
      </label>
      <button type="button" @click="addIngredient" class="flex flex-row justify-center gap-1 bg-cyan-600 rounded-md py-2 px-4 text-white font-semibold outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
          <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/>
        </svg>
        Añadir Ingrediente
      </button>
      <button type="submit" class="bg-green-600 rounded-md py-2 px-4 text-white font-semibold outline-none">Guardar Cambios</button>
      <button type="button" @click="closeEditModal" class="bg-red-600 rounded-md py-2 px-4 text-white font-semibold outline-none">Cancelar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import { Recipe } from "@/models/Recipe";
import { Ingredient } from "@/models/Ingredient";

const props = defineProps({
  editedRecipe: {
    type: Object as () => Recipe,
    required: true,
  },
  newIngredient: {
    type: String,
    required: true,
  }
});

const emits = defineEmits(["save-edited-recipe", "close-edit-modal", "add-ingredient", "remove-ingredient"]);

const localEditedRecipe = ref<Recipe>(new Recipe(props.editedRecipe.name, props.editedRecipe.description, props.editedRecipe.ingredients.map(ing => new Ingredient(ing.name))));
const localNewIngredient = ref<string>(props.newIngredient);

watch(() => props.editedRecipe, (newVal) => {
  localEditedRecipe.value = new Recipe(newVal.name, newVal.description, newVal.ingredients.map(ing => new Ingredient(ing.name)));
});

watch(() => props.newIngredient, (newVal) => {
  localNewIngredient.value = newVal;
});

const saveEditedRecipe = () => {
  emits("save-edited-recipe", localEditedRecipe.value);
};

const closeEditModal = () => {
  emits("close-edit-modal");
};

const addIngredient = () => {
  if (localNewIngredient.value) {
    localEditedRecipe.value.ingredients.push(new Ingredient(localNewIngredient.value));
    localNewIngredient.value = "";
  }
};

const removeIngredient = (index: number) => {
  localEditedRecipe.value.ingredients.splice(index, 1);
};
</script>
