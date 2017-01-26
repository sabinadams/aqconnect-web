//Core Imports....
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//Component Imports....
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home';
import { ContentPage } from './pages/content/content';
import { LoginPage } from './pages/login/login';

import { AuthGuard } from './services/auth-guard';

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
import { EditForumPostPage } from './pages/forums/editforumpost/editforumpost';
//App Routes....
const appRoutes: Routes = [
	{ path: '', component: LoginPage },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'createaccount', component: CreateAccountPage },
	{ path: 'forgotpassword', component: ForgotPasswordPage },
    { path: 'content', children: [
        { path : '' , component: ContentPage, canActivate: [AuthGuard]},
	    { path: 'itemspage/:id', component: ItemPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'locationspage/:id', component: LocationPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'monsterspage/:id', component: MonsterPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'npcspage/:id', component: NPCPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'questspage/:id', component: QuestPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'shoppespage/:id', component: ShopPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'badgespage/:id', component: BadgePage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'dungeonspage/:id', component: DungeonPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'craftshoppespage/:id', component: CraftshopPage, outlet: 'contentpage', canActivate: [AuthGuard] },
	    { path: 'recipespage/:id', component: RecipePage, outlet: 'contentpage', canActivate: [AuthGuard] }
  	]},
  	{path: 'news', children: [
        { path : '' , component: NewsPage, canActivate: [AuthGuard]},
	    { path: 'newsdetail/:id', component: NewsDetailPage, outlet: 'newspage', canActivate: [AuthGuard] },
  	]},
  	{path: 'account', children: [
        { path : '' , component: AccountPage, canActivate: [AuthGuard]},
	    { path: 'changepassword', component: ForgotPasswordPage, canActivate: [AuthGuard] },
  	]},
  	{path: 'users', children: [
        { path : '' , component: UserListPage, canActivate: [AuthGuard]},
	    { path: 'userprofile/:userID', component: UserPage, outlet: 'userpage', canActivate: [AuthGuard] },
  	]},
  	{path: 'forums', component: ForumsPage, canActivate: [AuthGuard]},
  	{path: 'forumpage/:forumID', children: [
        { path : '' , component: ForumPage, canActivate: [AuthGuard]},
	    { path: 'forumpost/:postID', component: ForumPostPage, outlet:'forumpostpage', canActivate: [AuthGuard] },
	    { path: 'editforumpost/:postID', component: EditForumPostPage, outlet: 'forumpostpage', canActivate: [AuthGuard]},
	    { path: 'userprofile/:userID', component: UserPage, outlet: 'forumpostpage', canActivate: [AuthGuard] }
  	]},
  	{path: 'userforumposts', children: [
        { path: '', component: UserForumPostsPage, canActivate: [AuthGuard]},
	    { path: 'editforumpost/:postID', component: EditForumPostPage, outlet: 'forumpostpage', canActivate: [AuthGuard]},
	    { path: 'forumpost/:postID', component: ForumPostPage, outlet:'forumpostpage', canActivate: [AuthGuard] }
  	]}

]; 

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);