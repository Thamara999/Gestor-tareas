<template>
    <div>
    <h1>Task List</h1>
    <ul>
    <li v-for="task in tasks" :key="task.id">
    {{ task.title }} - {{ task.description }}
    <button @click="deleteTask(task.id)">Delete</button>
    </li>
    </ul>
    </div>
   </template>
   <script>
   import api from '../services/api';
   export default {
    data() {
    return {
    tasks: []
    };
    },
    created() {
    this.fetchTasks();
    },
    methods: {
    async fetchTasks() {
    const response = await api.get('/tasks');
    this.tasks = response.data;
    },
    async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    this.fetchTasks();
    }
    }
   };
   </script>