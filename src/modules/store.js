var STORAGE_KEY = 'todos-storage';

export default {
	fetch: function(){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
	},
	save: function(todos){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(todos));
	}
}