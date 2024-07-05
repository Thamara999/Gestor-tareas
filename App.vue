<template>
  <div id="app">
    <Login />
    <Register />
    <AddTask @taskAdded="fetchTasks"/>
    <TaskList ref="taskList"/>
  </div>
</template>

<script>
import AddTask from './components/AddTask.vue';
import TaskList from './components/TaskList.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    AddTask,
    TaskList,
    Register,
    Login
  },
  methods: {
    fetchTasks() {
      this.$refs.taskList.fetchTasks();
    }
  }
};
</script>
