import { createStore } from 'vuex';
import axios from 'axios';
import {apiUrl} from './myconfig';

const store = createStore({
  state: {
    isLoggedIn: false,
    username: '',
    blogs: [],
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    username: (state) => state.username,
    blogs: (state) => state.blogs,
  },
  mutations: {
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setBlogs(state, blogs) {
      state.blogs = blogs;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try{
        const res = await axios.post(apiUrl + '/api/login', { username, password });
        commit('setIsLoggedIn', true);
        commit('setUsername', username);
        return res;
      } catch(err){
        throw err.response.data
      }
    },
    async logout({ commit }) {
      try {
        await axios.post(apiUrl + '/api/logout');
        commit('setIsLoggedIn', false);
        commit('setUsername', '');
        commit('setBlogs', []);
      } catch (error) {
        throw error.response.data;
      }
    },
    async addBlog({ commit }, newBlog) {
      try {
        await axios.post(apiUrl + '/api/blogs', newBlog, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, // 允許發送跨域 Cookie
        });
        
        // commit('setBlogs', [...this.state.blogs, response.data.blog]);
      } catch (error) {
        throw error.response.data
      }
    },
    async fetchBlogs({ commit }) {
      try {
        console.log('fetchin...');
        const jwtToken = localStorage.getItem('token');

        const blogs = await axios.get(apiUrl + '/api/blogs', {
          withCredentials: true, // 允許發送跨域 Cookie
          headers: { 'Authorization': 'Bearer '+jwtToken }
        });
        console.log('finished fetchin...');
        console.log('blogs:', blogs);
        // commit('setBlogs', response.data);
      } catch (error) {
        console.log('進入err');
        
        throw error.response.data
      }
    },
  },
});

export default store;