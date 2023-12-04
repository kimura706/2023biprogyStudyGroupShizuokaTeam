<template>
  <v-card :style="{ backgroundColor: 'white' ,margin: '10px'}">
    <div class="card">
      <h1 class="title">ユーザー選択</h1>
      <v-btn color="#0288D1" v-for="otherUser in users" :key="otherUser.id" @click="goToUserPage(otherUser.id)" :style="{margin: '10px'}">{{ otherUser.name }}</v-btn>
    </div>
  </v-card>

  <v-card :style="{ backgroundColor: 'white' ,margin: '10px'}">
    <div class="card">
      <h1 class="title">{{ user.name }} マイページ</h1>
      <v-form>
        <v-textarea :style="{ margin: '10px',borderRadius:'1%'}" v-model="user.goal" label="決意表明" readonly></v-textarea>
        <v-text-field :style="{ margin: '10px',borderRadius:'1%'}" v-model="user.examDate" label="受験日" readonly></v-text-field>
      </v-form>
      <div>
        <router-link class="link" to="/calendar" style="color: #2196F3; font-weight: bold; font-size: 18px; text-decoration: none;">受験日一覧</router-link>
      </div>
      <div>
        <router-link class="link" to="/progress" style="color: #2196F3; font-weight: bold; font-size: 18px; text-decoration: none;">進捗状況一覧</router-link>
      </div>
    </div>
  </v-card>

  <v-card :style="{ backgroundColor: 'white' ,margin: '10px'}">
    <h1 class="title">過去問道場 進捗入力</h1>
    <v-card-text>
      <div>
      <v-btn color="#0288D1"  @click="updateprogress()" :style="{margin: '10px'}">進捗状況を更新</v-btn>
    </div>
      <v-container>
    <div v-for="i in 26" :key="i" :style="{ backgroundColor: 'white' ,margin: '10px'}">
      <input type="checkbox" :id="'progress' + i" v-model="progressData['Progress' + i]" :disabled="!isEditable"/>
      <label :for="'progress' + i">{{ progressLabels[i - 1] }}</label>
    </div>
  </v-container>
    </v-card-text>

 
  </v-card>


</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiFactory } from '../../src/features/apiRequest/apiFactory';

const router = useRouter()

//チェックボックスの初期状態
const progressData = ref<any>({
  Progress1: false,
  Progress2: false,
  Progress3: false,
  Progress4: false,
  Progress5: false,
  Progress6: false,
  Progress7: false,
  Progress8: false,
  Progress9: false,
  Progress10: false,
  Progress11: false,
  Progress12: false,
  Progress13: false,
  Progress14: false,
  Progress15: false,
  Progress16: false,
  Progress17: false,
  Progress18: false,
  Progress19: false,
  Progress20: false,
  Progress21: false,
  Progress22: false,
  Progress23: false,
  Progress24: false,
  Progress25: false,
  Progress26: false,
});
const isEditable = ref(true);

//チェックボックス用ラベル
const progressLabels = [
  '令和5年春期',
  '令和4年春期',
  '令和3年春期',
  '令和2年秋期',
  '令和元年秋期',
  '平成31年春期',
  '平成30年秋期',
  '平成30年春期',
  '平成29年秋期',
  '平成29年春期',
  '平成28年秋期',
  '平成28年春期',
  '平成27年秋期',
  '平成27年春期',
  '平成26年秋期',
  '平成26年春期',
  '平成25年秋期',
  '平成25年春期',
  '平成24年秋期',
  '平成24年春期',
  '平成23年秋期',
  '平成23年特別',
  '平成22年秋期',
  '平成22年春期',
  '平成21年秋期',
  '平成21年春期',
];

//ユーザー一覧格納用
const users =  ref<any>([])
//ユーザー初期表示用
let user =ref({ id: '000', name: '', goal: '', examDate: ''})

//ユーザー用添え字の取得
function getUserIdNum(){
  var page_url = location.href;
  // console.log('URL',page_url)
  const userId = extractUserIDFromURL(page_url);
  return parseInt(userId?userId:'000', 10);
}

//DBからユーザー一覧を取得し、画面にセット
async function setUsers() {
  const resUsers = await apiFactory.usersApi.users();
  const userIdNum = getUserIdNum();
  users.value = resUsers.data
  console.log(users.value)
  user.value ={ id: resUsers.data[userIdNum].id, name: resUsers.data[userIdNum].name, goal: resUsers.data[userIdNum].goal, examDate: resUsers.data[userIdNum].examDate}
}

// 正規表現を使用してURLからユーザーIDを抽出
function extractUserIDFromURL(page_url:string) {
  const userIdMatch = page_url.match(/.{3}$/);
  if (userIdMatch && userIdMatch[0]) {
    return userIdMatch[0];
  } else {
    return '000';
  }
}

// 進捗の取得と表示
async function setProgress() {
  const res = await apiFactory.progressApi.progressList();
    await changeUserProgress(res.data);  
}

//画面初期化
const initialize = () => {
  setUsers();
  setProgress();
}


//ユーザー進捗の表示
function changeUserProgress(progress: any){
  const userIdNum = getUserIdNum();
  progressData.value=progress[userIdNum]
}

async function sendOtherUserPage(userId:string){
  await router.push(`/mypage/${userId}`)
}

//ほかのユーザーページに遷移
const goToUserPage = (userId: string) => {
  sendOtherUserPage(userId)
  const userIdNum = getUserIdNum();
  user.value.id=users.value[userIdNum].id
  user.value.name=users.value[userIdNum].name
  user.value.goal=users.value[userIdNum].goal
  user.value.examDate=users.value[userIdNum].examDate
  // setProgress();
  initialize()
  // console.log('userIdNum',userIdNum)
  // console.log('isEditable',isEditable.value)
  // if (userIdNum === 0){
  //   isEditable.value =false;
  // }else{
  //   isEditable.value = true;
  // }
  // console.log('isEditable',isEditable.value)
}

//進捗をDBに更新
async function updateprogress(){
  const userIdNum = getUserIdNum();
  const reqData = {userID:`${userIdNum}`,...progressData.value}
  await apiFactory.progressApi.changeProgress(reqData);
}

initialize();

</script>


<style>

.title{
  margin: 0.6rem;
  padding: 0.6rem;
  color: black;
}
.card{
  background-color: white;
  border-radius: 1%;
}

.link{
  background-color: white;
  margin: 1rem;
  size: 15rem;
}

</style>

<style scoped>

</style>