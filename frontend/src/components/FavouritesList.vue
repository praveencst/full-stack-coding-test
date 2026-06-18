<script setup lang="ts">
    defineProps<{
    favourites?: string[];
    }>();
</script>

<template>
  <ul v-if="favourites && favourites.length > 0" class="favourites-list">
    <li v-for="favourite in favourites" :key="favourite">
      {{ favourite || '-' }}
    </li>
  </ul>
  <span v-else class="empty">-</span>
</template>

<style scoped>
  .favourites-list {
    margin: 0;
    padding-left: 1.25rem;
    flex: 1;
  }

  .favourites-list li {
    padding: 0.25rem 0;
  }

  .empty {
    flex: 1;
  }
</style>