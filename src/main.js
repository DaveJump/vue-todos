import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
Vue.use(Router);

let router = new Router();

['all','active','completed'].forEach(function(visibility){
	router.on(visibility,{
		component: {App}
	});
});

router.afterEach(function(transition){
	switch(transition.to.path.replace('/','')){
		case 'all':
			router.app.visibility = 'all';
			break;
		case 'active':
			router.app.visibility = 'active';
			break;
		case 'completed':
			router.app.visibility = 'completed';
			break;
	}
});

router.start(App,'#todosapp');
