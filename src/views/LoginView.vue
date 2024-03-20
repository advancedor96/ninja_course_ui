<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const login = async () => {
      try {
        const res = await store.dispatch('login', { username: username.value, password: password.value })
        
        localStorage.setItem('token', res.data.token);

        router.push('/blogs');
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>