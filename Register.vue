<template>
    <div>
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <div>
          <label>Nombre de usuario:</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'RegisterUser',

    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          await api.post('/users/register', {
            username: this.username,
            password: this.password
          });
          this.$emit('registered');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  