<template>
  <div class="recipe-form">
    <TextInput name="name" label="Name" />

    <!-- TODO: tags will go here -->

    <TextArrayInput class="mt-8" name="ingredients" label="Ingredients" swappable placeholder="Next Ingredient" />

    <TextareaArrayInput class="mt-8" name="steps" label="Steps" swappable :item-label="index => `Step ${index + 1}`">
      <template #add>Add Step</template>
    </TextareaArrayInput>
  </div>
</template>

<script setup lang="ts">
import TextareaArrayInput from '@/components/inputs/TextareaArrayInput.vue';
import TextArrayInput from '@/components/inputs/TextArrayInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
</script>
