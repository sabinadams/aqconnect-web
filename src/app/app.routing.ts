//Core Imports....
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//Component Imports....
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home';
import { ContentPage } from './pages/content/content';
import { LoginPage } from './pages/login/login';

import { ItemPage } from './pages/content/content-details/item/item';
import { LocationPage } from './pages/content/content-details/location/location';
import { MonsterPage } from './pages/content/content-details/monster/monster';
import { NPCPage } from './pages/content/content-details/npc/npc';
import { QuestPage } from './pages/content/content-details/quest/quest';
import { CraftshopPage } from './pages/content/content-details/craftshop/craftshop';
import { ShopPage } from './pages/content/content-details/shop/shop';
import { BadgePage } from './pages/content/content-details/badge/badge';
import { DungeonPage } from './pages/content/content-details/dungeon/dungeon';
import { RecipePage } from './pages/content/content-details/recipe/recipe';
import { NewsPage } from './pages/news/news';
import { NewsDetailPage } from './pages/news/news-detail/news-detail';
import { ForumsPage } from './pages/forums/forums';
import { ForumPage } from './pages/forums/forum/forum';
import { ForumPostPage } from './pages/forums/forumpost/forumpost';
import { UserListPage } from './pages/userlist/userlist';
import { UserPage } from './pages/userpage/userpage';
import { AccountPage } from './pages/account/account';
import { CreateAccountPage } from './pages/createaccount/createaccount';
import { ForgotPasswordPage } from './pages/forgotpassword/forgotpassword';
import { UserForumPostsPage } from './pages/userforumposts/userforumposts';

//App Routes....
const appRoutes: Routes = [
	{ path: '', component: LoginPage },
	{ path: 'home', component: HomeComponent },
	{ path: 'createaccount', component: CreateAccountPage },
	{ path: 'forgotpassword', component: ForgotPasswordPage },
	{ path: 'userforumposts', component: UserForumPostsPage},
    { path: 'content', children: [
        { path : '' , component: ContentPage},
	    { path: 'itemspage/:id', component: ItemPage, outlet: 'contentpage' },
	    { path: 'locationspage/:id', component: LocationPage, outlet: 'contentpage' },
	    { path: 'monsterspage/:id', component: MonsterPage, outlet: 'contentpage' },
	    { path: 'npcspage/:id', component: NPCPage, outlet: 'contentpage' },
	    { path: 'questspage/:id', component: QuestPage, outlet: 'contentpage' },
	    { path: 'shoppespage/:id', component: ShopPage, outlet: 'contentpage' },
	    { path: 'badgespage/:id', component: BadgePage, outlet: 'contentpage' },
	    { path: 'dungeonspage/:id', component: DungeonPage, outlet: 'contentpage' },
	    { path: 'craftshoppespage/:id', component: CraftshopPage, outlet: 'contentpage' },
	    { path: 'recipespage/:id', component: RecipePage, outlet: 'contentpage' }
  	]},
  	{path: 'news', children: [
        { path : '' , component: NewsPage},
	    { path: 'newsdetail/:id', component: NewsDetailPage, outlet: 'newspage' },
  	]},
  	{path: 'account', children: [
        { path : '' , component: AccountPage},
	    { path: 'changepassword', component: ForgotPasswordPage },
  	]},
  	{path: 'users', children: [
        { path : '' , component: UserListPage},
	    { path: 'userprofile/:userID', component: UserPage, outlet: 'userpage' },
  	]},
  	{path: 'forums', children: [
        { path : '' , component: ForumsPage},
	    { path: 'forumpage/:forumID', component: ForumPage },
	    { path: 'forumpost/:postID', component: ForumPostPage, outlet:'forumpostpage' },
	    { path: 'userprofile/:userID', component: UserPage, outlet: 'forumpostpage' },
  	]}
]; 

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);