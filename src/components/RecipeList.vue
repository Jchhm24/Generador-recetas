<template>
  <div class="w-full flex flex-col gap-6">
    <h2 class="bg-orange-600/25 p-5 rounded-xl text-white font-black text-3xl">
      Lista de Recetas
    </h2>
    <ul class="flex flex-row flex-wrap gap-2">
      <li v-for="(recipe, index) in recipes" :key="index"
        class="max-w-[32%] bg-blue-950/90 rounded-xl p-5 text-white flex flex-col gap-3">

        <h5 class="text-xl font-bold">
          {{ index + 1 }}.- {{ recipe.name }}
        </h5>

        <article class="flex flex-col">
          <span class="font-bold">
            Descripción:
          </span>
          <p>
            {{ recipe.description }}
          </p>
        </article>

        <article>
          <span class="font-bold">
            Ingredientes:
          </span>

          <ul class="list-disc pl-5">
            <li v-for="(ing, index) in recipe.ingredients" :key="index">
              {{ ing.name }}
            </li>
          </ul>
        </article>

        <button @click="cloneAndEditRecipe(index)"
          class="bg-orange-500 rounded-md py-2 px-4 text-white font-semibold outline-none mt-auto">
          Clonar y Editar
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { Recipe } from "@/models/Recipe";

const props = defineProps({
  recipes: {
    type: Array as () => Recipe[],
    required: true,
  },
});

const emits = defineEmits(["recipe-cloned"]);

const cloneAndEditRecipe = (index: number) => {
  const clonedRecipe = props.recipes[index].clone();
  emits("recipe-cloned", clonedRecipe); // Envía la receta clonada para que se edite
};
</script>
