<script setup lang="ts">
    import FavouritesList from './FavouritesList.vue';

    defineProps<{
    label: string;
    favourites?: string[];
    }>();
</script>

<template>
  <div class="detail-row favourites">
    <span class="label">{{ label }}</span>
    <FavouritesList :favourites="favourites" />
  </div>
</template>

<style scoped>
  .detail-row {
    display: flex;
    align-items: baseline;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border, #e0e0e0);
  }

  .detail-row.favourites {
    align-items: flex-start;
  }

  .label {
    font-weight: bold;
    min-width: 120px;
    flex-shrink: 0;
  }
</style>