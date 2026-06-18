<script setup lang="ts">
    defineProps<{
    message: string;
    }>();

    const emit = defineEmits<{
    (e: 'retry'): void;
    }>();
</script>

<template>
  <div class="error-message">
    <p>{{ message }}</p>
    <button @click="emit('retry')" class="retry-button">Retry</button>
  </div>
</template>

<style scoped>
  .error-message {
    margin-top: 1.5rem;
    color: #c00;
  }

  .error-message p {
    margin-bottom: 1rem;
  }

  .retry-button {
    margin-top: 0.5rem;
  }
</style>