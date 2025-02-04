<template>
  <BasePage title="View" :loading default-back-href="/">
    <template v-if="recipe && !isEditing" #header-end>
      <IonButton color="danger" @click="onDelete()">
        <IonIcon slot="icon-only" :icon="trashBin" />
      </IonButton>
    </template>
    <div v-if="doesNotExist" class="p-4">
      <div class="pt-8">Could not find that recipe</div>
      <IonButton expand="block" @click="onBack()">Back</IonButton>
    </div>
    <div v-else-if="recipe" class="p-4">
      <template v-if="isEditing">
        <RecipeForm />
      </template>
      <template v-else>
        <div class="text-2xl mb-8 text-center">
          {{ recipe.name }}
          <IonButton class="-mt-3" fill="outline" @click="onStartEditing()">
            <IonIcon slot="icon-only" :icon="pencil" />
          </IonButton>
        </div>

        <div class="text-lg underline mb-4">Steps</div>
        <div v-for="(step, index) of recipe.steps" :key="index">
          <IonTextarea
            class="mt-2"
            :model-value="step"
            readonly
            mode="md"
            fill="outline"
            label-placement="stacked"
            :label="`Step ${index + 1}`"
            auto-grow
          />
        </div>
      </template>
    </div>
    <template #footer="{ keyboardClosed }">
      <div v-if="keyboardClosed && isEditing">
        <IonButton class="px-4" expand="block" @click="onUpdate()">Update</IonButton>
        <IonButton class="px-4" expand="block" fill="outline" @click="isEditing = false">Cancel</IonButton>
      </div>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import TextareaArrayInput from '@/components/inputs/TextareaArrayInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import { useRecipe, useRecipes } from '@/composables/recipes';
import BasePage from '@/views/BasePage.vue';
import { alertController, IonButton, IonIcon, IonTextarea, useIonRouter } from '@ionic/vue';
import { ref } from 'vue';
import { useEditRecipeForm } from './editRecipeForm';
import { pencil, trashBin } from 'ionicons/icons';
import RecipeForm from '../RecipeForm.vue';

const props = defineProps<{ id: string }>();

const isEditing = ref(false);
const router = useIonRouter();
const { recipe, loading, doesNotExist } = useRecipe(props.id);
const { update, form, initialise } = useEditRecipeForm();
const { remove } = useRecipes();

const onUpdate = form.handleSubmit(async values => {
  await update(values);
  isEditing.value = false;
});

const onStartEditing = () => {
  isEditing.value = true;
  initialise(recipe.value!);
};

const onDelete = async () => {
  if (!recipe.value) {
    return;
  }
  const alert = await alertController.create({
    subHeader: 'Delete Recipe?',
    buttons: [
      {
        text: 'Remove',
        role: 'destructive'
      },
      {
        id: 'cancel',
        text: 'Cancel'
      }
    ]
  });
  alert.present();

  const resp = await alert.onWillDismiss();

  if (resp.role === 'destructive') {
    remove(recipe.value.id);
    onBack();
  }
};

const onBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
};
</script>
