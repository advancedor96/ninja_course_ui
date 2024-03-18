<template>
  <div>
    <h1>My Blogs</h1>
    <button @click="showAddBlogModal = true">Add Blog</button>
    <ul>
      <li v-for="blog in blogs" :key="blog._id">
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.content }}</p>
      </li>
    </ul>
    <div v-if="showAddBlogModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showAddBlogModal = false">&times;</span>
        <h2>Add Blog</h2>
        <form @submit.prevent="addBlog">
          <div>
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="newBlog.title" required>
          </div>
          <div>
            <label for="content">Content:</label>
            <textarea id="content" v-model="newBlog.content" required></textarea>
          </div>
          <button type="submit">Add Blog</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const blogs = computed(() => store.getters.blogs);
    const showAddBlogModal = ref(false);
    const newBlog = reactive({
      title: '',
      content: '',
    });

    const addBlog = async () => {
      try {
        await store.dispatch('addBlog', newBlog);
        showAddBlogModal.value = false;
        newBlog.title = '';
        newBlog.content = '';
      } catch (error) {
        alert(error.message);
      }
    };

    onMounted(async () => {
      try {
        await store.dispatch('fetchBlogs');
      } catch (error) {
        console.log(error.message);
        router.push('/login');
      }
    });
    return {
      blogs,
      showAddBlogModal,
      newBlog,
      addBlog,
    };
  },
};
</script>