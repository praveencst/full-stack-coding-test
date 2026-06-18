<script setup lang="ts">
    defineProps<{
    message?: string;
    }>();
</script>

<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p v-if="message">{{ message || 'Loading...' }}</p>
  </div>
</template>

<style scoped>
  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
    color: #666;
  }

  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e0e0e0;
    border-top-color: #666;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>