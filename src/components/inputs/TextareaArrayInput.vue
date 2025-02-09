<template>
  <div class="textarea-array-input">
    <div class="mb-2">
      <IonLabel>{{ label }}</IonLabel>
    </div>
    <IonList>
      <IonReorderGroup :disabled="!swappable" @ion-item-reorder="onReorder">
        <IonItem v-for="(field, index) of fields" :key="index" lines="none">
          <IonReorder class="-ml-4 mr-2" slot="start" />
          <TextareaInput class="my-2" :name="`${name}[${index}]`" :label="itemLabel?.(index) ?? `Item ${index + 1}`" />
          <IonButton slot="end" fill="clear" @click="onRemove(index, !!field.value)">
            <IonIcon slot="icon-only" :icon="close" color="danger" />
          </IonButton>
        </IonItem>
      </IonReorderGroup>
    </IonList>

    <IonButton @click="push('')">
      {{ addText || 'Add' }}
    </IonButton>
  </div>
</template>

<script setup lang="ts">
import { alertController, IonButton, IonIcon, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup } from '@ionic/vue';
import { IonReorderGroupCustomEvent, ItemReorderEventDetail } from '@ionic/core';
import { useFieldArray } from 'vee-validate';
import TextareaInput from './TextareaInput.vue';
import { close } from '@/icons';

const props = defineProps<{
  name: string;
  label: string;
  swappable?: boolean;
  itemLabel?: (index: number) => string;
  addText?: string;
  removeText?: string;
}>();

const { remove, push, fields, move } = useFieldArray(() => props.name);

const onRemove = async (index: number, hasData: boolean) => {
  if (!hasData) {
    remove(index);
    return;
  }

  const alert = await alertController.create({
    subHeader: props.removeText || 'Remove Item?',
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
    remove(index);
  }
};

const onReorder = (e: IonReorderGroupCustomEvent<ItemReorderEventDetail>) => {
  move(e.detail.from, e.detail.to);
  e.detail.complete(fields.value);
};
</script>

<style>
.textarea-wrapper::after {
  word-break: break-word;
}
</style>
