<template>
  <Teleport v-if="isClosed" defer to="ion-modal .teleporting-footer">
    <slot></slot>
  </Teleport>
</template>

<script setup lang="ts">
import { useKeyboard } from '@/composables/keyboard';

const { isClosed } = useKeyboard();
</script>
