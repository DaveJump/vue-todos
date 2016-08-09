<template>
  <section class="todoapp">
    <todo-header></todo-header>
    <todo-list></todo-list>
    <input type="hidden" v-model="remaincount">
    <todo-footer :remaincount="remaining"></todo-footer>
  </section>
</template>

<script>
import Header from './components/header';
import List from './components/list';
import Footer from './components/footer';

export default {
  data(){
    return {
      remaining: 0
    }
  },
  components: {
    'todo-header': Header,
    'todo-list': List,
    'todo-footer': Footer
  },
  events: {
    'newtodo': function(item){
      this.$broadcast('newtodo-forchild',item);
    },
    'totalTodos': function(todos){
      this.totalTodos = todos.length;
      this.$broadcast('todosObj-forchild',todos);
    },
    'remaining': function(remainCount){
      this.remaining = remainCount;
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #5d5d5d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
  font-weight: 300;
}

button,
input[type="checkbox"] {
  outline: none;
}

.hidden {
  display: none;
}

[v-cloak]{
  display: none;
}
</style>
