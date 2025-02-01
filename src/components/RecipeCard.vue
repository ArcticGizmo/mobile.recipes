<template>
  <IonCard class="recipe-card">
    <IonCardHeader>
      <IonLabel class="text-xl" color="medium">
        {{ name }}
      </IonLabel>
    </IonCardHeader>
    <IonCardContent>
      <!-- tags and stuff -->
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonLabel } from '@ionic/vue';

defineProps<{ name: string }>();
</script>
