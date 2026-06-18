<script setup lang="ts">
    defineProps<{
    label: string;
    value?: string;
    }>();
</script>

<template>
  <div class="detail-row">
    <span class="label">{{ label }}</span>
    <span class="value">{{ value || '-' }}</span>
  </div>
</template>

<style scoped>
  .detail-row {
    display: flex;
    align-items: baseline;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border, #e0e0e0);
  }

  .label {
    font-weight: bold;
    min-width: 120px;
    flex-shrink: 0;
  }

  .value {
    flex: 1;
  }
</style>