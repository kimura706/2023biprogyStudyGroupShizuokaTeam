<template>
  <v-card :style="{ backgroundColor: 'white', margin: '10px' }">
    <div class="card">
      <h1 class="title">進捗状況一覧</h1>
      <v-container>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="user-name-column">ユーザー名</th>
                <th v-for="progressKey in progressKeys" :key="progressKey">{{ progressKey }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="user-name-column">{{ user.name }}</td>
                <td v-for="progress in userProgress[user.id]" :key="progress">
                  {{ progress ? '✓' : '-' }}
                </td> 
              </tr>
            </tbody>
          </table>
        </div>
      </v-container>
    </div>
  </v-card>
  <v-container>  
      </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiFactory } from '../../src/features/apiRequest/apiFactory';

const users = ref<any>([]);
const userProgress = ref<any>({});
const progressKeys = ref<string[]>([
  '5春', '4春', '3春', '2秋', '元秋', '31春', '30秋', '30春', '29秋', '29春',
  '28秋', '28春', '27秋', '27春', '26秋', '26春', '25秋', '25春', '24秋', '24春',
  '23秋', '23春', '22秋', '22春', '21秋', '21春'
]);

async function getUsers() {
  const resUsers = await apiFactory.usersApi.users();
  users.value = resUsers.data;
}

async function getProgressList() {
  const resProgressList = await apiFactory.progressApi.progressList();
  resProgressList.data.forEach((progress: { UserID: any; }) => {
    const userId = progress.UserID;
    // userProgress.value[userId] = progress;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userProgress.value[userId] = (({UserID,...rest})=>rest)(progress);   
  });
}

getProgressList();
getUsers();
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.user-name-column {
  min-width: 100px; /* ユーザー名の列の最小幅を設定 */
}
</style>
