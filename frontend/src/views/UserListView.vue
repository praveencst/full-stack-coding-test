<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import type { User, UsersResponse } from '@/models';

const pageSize = 10;

const users = ref<User[]>();
let currentPage = ref<number>(0);
let totalPages = ref<number>(0);

onMounted(async () => {
  await fetchPage(currentPage.value);
});

watch(currentPage, async () => {
  await fetchPage(currentPage.value);
});

const fetchPage = async (pageNum: number) => {
  const request: AxiosResponse = await axios.get(`http://localhost:3000/users?page=${pageNum}&limit=${pageSize}`);
  const data: UsersResponse = request.data;
  users.value = data.users;
  totalPages.value = data.pageInfo.totalPages;
  currentPage.value = data.pageInfo.currentPage;
};

</script>

<template>
  <main>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Last Name</th>
          <th>First Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{ user.id }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.first_name }}</td>
          <td>
            <router-link :to="`/user/${user.id}`">
              <button>Details</button>
            </router-link> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <button @click="currentPage--" :disabled="currentPage === 0">Prev Page</button>
      <span>Page {{ currentPage }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages">Next Page</button>
    </div>
  </main>
</template>

<style scoped>
  thead tr th {
    text-align: left;
    font-weight: bold;
  }

  tbody tr:nth-child(odd) {
    background-color: var(--color-border);
  }

  .buttons {
    text-align: center;
  }

  .buttons > * {
    margin: 0.5rem;
  }
</style>
  