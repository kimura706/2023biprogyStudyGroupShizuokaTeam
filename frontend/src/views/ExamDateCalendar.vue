<template>
    
 
    <v-card :style="{ backgroundColor: 'white' ,margin: '10px'}">
    <div class="card">
      <h1 class="title">受験日一覧</h1>
      <v-container>  
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>ユーザー名</th>
                <th>受験日</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.examDate }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>
  </v-card>
      <v-container>  
      </v-container>

  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  import { apiFactory } from '../../src/features/apiRequest/apiFactory';
  
  const users = ref([
    { id: '000', name: '-', goal: 'ー', examDate: '-年-月-日' },
  ]);


  async function getUsers() {
    const resUsers = await apiFactory.usersApi.users();
    users.value = resUsers.data
    console.log(users.value)
    }

    getUsers()
  </script>
  
  <style scoped>
  
  th, td {
    text-align: center;
    min-width: 150px;
    padding: 10px;
  }
  
  thead {
    background-color: #f5f5f5;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>