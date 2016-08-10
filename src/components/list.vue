<template>
	<section class="main">
		<input type="checkbox" class="toggle-all" v-show="todos.length" v-model="allDone" @change="toggleDispatch()" />
		<ul class="todo-list">
			<li class="todo" :class="{completed: todo.completed,editing: todo == editedTodo}" v-for="todo in todos">
				<div class="view">
					<input type="checkbox" class="toggle" v-model="todo.completed" @change="toggleDispatch()">
					<label @dblclick="editTodo(todo)">{{todo.todoText}}</label>
					<button class="edit-btn" @click="editTodo(todo)"></button>
					<button class="destroy" @click="removeTodo(todo)"></button>
				</div>
				<input class="edit" v-todo-focus="todo == editedTodo" v-model="todo.todoText" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" @keyup.esc="cancelTodo(todo)">
			</li>
		</ul>
	</section>
</template>

<script>
	import Filter from '../modules/filter';
	import Store from '../modules/store';

	export default {
		data(){
			return {
				todos: Store.fetch(),
				editedTodo: null
			}
		},
		watch: {
			todos: {
				deep: true,
				handler: Store.save
			}
		},
		events: {
			'newtodo-forchild': function(txt){
				this.todos.push({
					todoText: txt,
					completed: false
				});
				this.$dispatch('totalTodos',this.todos);
			},
			'todosObj-forchild': function(todos){
				this.todos = todos;
			}
		},
		methods: {
			removeTodo: function(todo){
				this.todos.$remove(todo);
				this.$dispatch('totalTodos',this.todos);
			},
			toggleDispatch: function(){
				this.$dispatch('totalTodos',this.todos);
			},
			editTodo: function(todo){
				this.beforeEditCache = todo.todoText;
				this.editedTodo = todo;
			},
			doneEdit: function(todo){
				if(!this.editedTodo){
					return;
				}
				this.editedTodo = null;
				todo.todoText = todo.todoText.trim();
				if(!todo.todoText){
					this.removeTodo(todo);
				}
			},
			cancelTodo: function(todo){
				if(!this.editedTodo){
					return;
				}
				this.editedTodo = null;
				todo.todoText = this.beforeEditCache;
			}
		},
		computed: {
			remaining: function(){
				if(this.todos.length){
					var remain = Filter.active(this.todos).length;
					this.$dispatch('remaining',remain);
					return remain;
				}
			},
			allDone: {
				get: function(){
					return this.remaining === 0;
				},
				set: function(value){
					this.todos.forEach(function(item){
						item.completed = value;
					});
				}
			}
		},
		directives: {
			'todo-focus': function(value){
				if(!value){
					return;
				}
				var el = this.el;
				el.focus();
			}
		}
	}
</script>

<style lang="scss">
@import '../modules/variable';
@import '../modules/list';
</style>