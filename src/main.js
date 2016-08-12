import Vue from 'vue';
import App from './App';
// import Router from 'vue-router';
// Vue.use(Router);

new Vue({
	el: '#todosapp',
	components: {App}
});

// let router = new Router();
// let NewApp = Vue.extend(App);
// let _newApp = new NewApp();

// ['all','active','completed'].forEach(function(visibility){
// 	router.on(visibility,{
// 		component: {NewApp}
// 	});
// });

// router.afterEach(function(transition){
// 	switch(transition.to.path.replace('/','')){
// 		case 'all':
// 			_newApp.$data.visibility = 'all';
// 			break;
// 		case 'active':
// 			_newApp.$data.visibility = 'active';
// 			break;
// 		case 'completed':
// 			_newApp.$data.visibility = 'completed';
// 			break;
// 	}
// });

// router.start(NewApp,'#todosapp');
