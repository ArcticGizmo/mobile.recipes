<template>
  <ion-app>
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useKeepAwake } from './composables/keepAwake';
import { onMounted } from 'vue';

const { enable } = useKeepAwake();

onMounted(() => enable());
</script>
