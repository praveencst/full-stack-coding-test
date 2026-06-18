<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios, { type AxiosResponse, AxiosError } from 'axios';
  import type { UserDetails } from '@/models';
  import { API_BASE_URL } from '@/config/api';
  import LoadingSpinner from '@/components/LoadingSpinner.vue';
  import ErrorMessage from '@/components/ErrorMessage.vue';
  import DetailRow from '@/components/DetailRow.vue';
  import DetailRowFavourites from '@/components/DetailRowFavourites.vue';

  const route = useRoute();
  const router = useRouter();
  const user = ref<UserDetails | null>(null);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchUser = async () => {
    loading.value = true;
    error.value = null;
    user.value = null;

    try {
      const userId = route.params.userId;

      if (!userId) {
        error.value = 'User ID is missing from the URL.';
        loading.value = false;
        return;
      }

      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/user/${userId}`);
      
      if (!response.data) {
        error.value = 'No data received from the server.';
        loading.value = false;
        return;
      }

      user.value = response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;

        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 404:
              error.value = 'User not found.';
              break;
            case 500:
              error.value = 'Server error. Please try again later.';
              break;
            case 503:
              error.value = 'Service unavailable. Please try again later.';
              break;
            default:
              error.value = `Server error: ${axiosError.response.status}`;
          }
        } else if (axiosError.request) {
          error.value = 'Cannot connect to the server. Please check your network or ensure the backend is running.';
        } else {
          error.value = 'An unexpected error occurred while making the request.';
        }
      } else {
        error.value = 'An unexpected error occurred.';
      }
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchUser();
  });
</script>

<template>
  <main>
    <button @click="router.back()">Back</button>
    <h1>User Details</h1>
    
    <LoadingSpinner v-if="loading" message="Loading user details..." />
    
    <ErrorMessage
      v-else-if="error"
      :message="error"
      @retry="fetchUser"
    />
    
    <div v-else-if="user" class="user-details">
      <DetailRow label="Id:" :value="user.id" />
      <DetailRow label="Last Name:" :value="user.last_name" />
      <DetailRow label="First Name:" :value="user.first_name" />
      <DetailRow label="Email:" :value="user.email" />
      <DetailRowFavourites label="Favourites:" :favourites="user.favourites" />
    </div>
  </main>
</template>

<style scoped>
  .user-details {
    margin-top: 1.5rem;
    max-width: 500px;
  }

  button {
    margin-bottom: 1rem;
  }
</style>