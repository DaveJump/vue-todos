<template>
	<footer class="footer" v-show="todos.length">
		<span class="todo-count">
			<strong v-text="remaincount"></strong> {{remaincount | pluralize 'item'}} left
		</span>
		<ul class="filters">
			<li><a href="#" class="selected">All</a></li>
			<li><a href="#">Active</a></li>
			<li><a href="#">Completed</a></li>
		</ul>
		<button class="clear-completed" @click="removeCompleted()" v-show="todos.length > remaincount">Clear completed</button>
	</footer>
</template>

<script>
	import Filter from '../modules/filter';
	import Store from '../modules/store';

	export default {
		data(){
			return {
				todos: Store.fetch()
			}
		},
		props: ['remaincount'],
		events: {
			'todosObj-forchild': function(todos){
				this.todos = todos;
			}
		},
		methods: {
			removeCompleted: function(){
				this.todos = Filter.active(this.todos);
				this.$dispatch('totalTodos',this.todos);
			}
		}
	}
</script>

<style lang="scss">
@import '../modules/variable';
@import '../modules/footer';
</style>