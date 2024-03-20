<template>
  <header>
    <nav>
      <ul>
        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-else>
          <span>Welcome, {{ username }}</span>
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  setup() {
    localStorage.setItem('OOOOO', "fuck");

    const sss = localStorage.getItem("OOOOO");
    console.log('取得OOOO:',sss);
    
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const username = computed(() => store.getters.username);

    const logout = async() => {
      try {
        await store.dispatch('logout');
        router.push('/login');
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      isLoggedIn,
      username,
      logout,
    };
  },
};
</script>
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
