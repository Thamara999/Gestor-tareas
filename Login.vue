<template>
    <div>
      <h2>Inicio de sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label>Nombre de usuario:</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'LoginUser',
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/users/login', {
            username: this.username,
            password: this.password
          });
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$emit('loggedIn');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  