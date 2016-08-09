export default {
	active: function(arr){
		return arr.filter(function(item){
			return !item.completed;
		});
	},
	completed: function(arr){
		return arr.filter(function(item){
			return item.completed;
		});
	}
}