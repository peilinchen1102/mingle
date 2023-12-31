<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <img src="@/assets/images/logo.png" />
        <RouterLink :to="{ name: 'Home' }">
          <h1 style="font-family: &quot;Playpen Sans&quot;, cursive">Mingle</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Profile' }" :class="{ underline: currentRouteName == 'Profile' }" style="margin-right: 12px"> Profile </RouterLink>
          <RouterLink :to="{ name: 'Friends' }" :class="{ underline: currentRouteName == 'Friends' }" style="margin-right: 12px">Friends</RouterLink>
          <RouterLink :to="{ name: 'Messages' }" :class="{ underline: currentRouteName == 'Messages' }" style="margin-right: 12px">Messages</RouterLink>
          <RouterLink :to="{ name: 'Status' }" :class="{ underline: currentRouteName == 'Status' }" style="margin-right: 12px">Status</RouterLink>
          <RouterLink :to="{ name: 'Tasks' }" :class="{ underline: currentRouteName == 'Tasks' }" style="margin-right: 12px">Tasks</RouterLink>
          <RouterLink :to="{ name: 'Match' }" :class="{ underline: currentRouteName == 'Match' }" style="margin-right: 12px">Match</RouterLink>
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";
@import url("https://fonts.googleapis.com/css2?family=Playpen+Sans&display=swap");

nav {
  padding: 0.25em 2em;
  background-color: white;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
