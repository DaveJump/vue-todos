<template>
	<section class="main">
		<input type="checkbox" class="toggle-all" v-show="todos.length" v-model="allDone" />
		<ul class="todo-list">
			<li class="todo" :class="{completed: todo.completed}" v-for="todo in todos">
				<div class="view">
					<input v-model="todo.completed" type="checkbox" class="toggle">
					<label>{{todo.todoText}}</label>
					<button class="destroy" @click="removeTodo(todo)"></button>
				</div>
				<input class="edit">
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
				todos: Store.fetch()
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
		}
	}
</script>

<style lang="scss">
@import '../modules/variable.scss';

.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid $color1;
}

label[for='toggle-all'] {
	display: none;
}

.toggle-all {
	position: absolute;
	top: -55px;
	left: -12px;
	width: 60px;
	height: 34px;
	text-align: center;
	border: none; /* Mobile Safari */

	@media screen and (-webkit-min-device-pixel-ratio:0) {
		background: none;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		-webkit-appearance: none;
		appearance: none;
	}

	&:before{
		content: '❯';
		font-size: 22px;
		color: $color1;
		padding: 10px 27px 10px 27px;
	}

	&:checked:before{
		color: #737373;
	}
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;

	li {
		position: relative;
		font-size: 24px;
		border-bottom: 1px solid $color1;

		&:last-child {
			border-bottom: none;
		}

		.destroy {
			display: none;
			position: absolute;
			top: 0;
			right: 10px;
			bottom: 0;
			width: 40px;
			height: 40px;
			line-height: 45px;
			margin: auto 0;
			font-size: 32px;
			color: #cc9a9a;
			margin-bottom: 11px;
			transition: color 0.2s ease-out;

			&:hover {
				color: #af5b5e;
			}

			&:after {
				content: '×';
			}
		}

		.toggle {
			text-align: center;
			width: 40px;
			/* auto, since non-WebKit browsers doesn't support input styling */
			height: auto;
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto 0;
			border: none; /* Mobile Safari */
			-webkit-appearance: none;
			appearance: none;

			@media screen and (-webkit-min-device-pixel-ratio:0) {
				background: none;
				height: 40px;
			}

			&:after {
				content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
			}

			&:checked:after {
				content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
			}
		}

		label {
			white-space: pre-line;
			word-break: break-all;
			padding: 15px 60px 15px 15px;
			margin-left: 45px;
			display: block;
			line-height: 1.2;
			transition: color 0.4s;
		}

		&:hover{
			.destroy {
				display: block;
			}
		}

		.edit {
			display: none;
		}

		&.editing{
			border-bottom: none;
			padding: 0;

			&:last-child {
				margin-bottom: -1px;
			}

			.edit {
				display: block;
				width: 506px;
				padding: 13px 17px 12px 17px;
				margin: 0 0 0 43px;
			}

			.view {
				display: none;
			}
		}

		&.completed label {
			color: #d9d9d9;
			text-decoration: line-through;
		}
	}
}
</style>