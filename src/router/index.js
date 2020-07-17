import Vue from 'vue';
import Router from 'vue-router';
import EditMember from '@/components/EditMember';
import Dashboard from '@/components/Dashboard';
import NewMember from '@/components/NewMember';
import ViewMember from '@/components/ViewMember';

Vue.use(Router);

export default new Router({
	routes : [
		{
			path      : '/',
			name      : 'dashboard',
			component : Dashboard
		},
		{
			path      : '/new',
			name      : 'new-member',
			component : NewMember
		},
		{
			path      : '/edit/:member_id',
			name      : 'edit-member',
			component : EditMember
		},
		{
			path      : '/:member_id',
			name      : 'view-member',
			component : ViewMember
		}
	]
});
