//Core Imports....
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';

//Page Imports....
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home';
import { NavComponent } from './pages/navbar/nav';
import { ContentPage } from './pages/content/content';
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
  import { CalculatorPage } from './pages/calculator/calculator';
import { NewsPage } from './pages/news/news';
  import { NewsDetailPage } from './pages/news/news-detail/news-detail';
import { ForumsPage } from './pages/forums/forums';
  import { ForumPage } from './pages/forums/forum/forum';
    import { ForumPostPage } from './pages/forums/forumpost/forumpost';
import { LoginPage } from './pages/login/login';
  import { CreateAccountPage } from './pages/createaccount/createaccount';
  import { ForgotPasswordPage } from './pages/forgotpassword/forgotpassword';
import { UserListPage } from './pages/userlist/userlist';
  import { UserPage } from './pages/userpage/userpage';
import { AccountPage } from './pages/account/account';
import { UserForumPostsPage } from './pages/userforumposts/userforumposts';

//Service Imports....
import { HttpClient } from './services/http-service';
import { TeamService } from './services/team-service';
import { NewsService } from './services/news-service';
import { ContentService } from './services/content-service';
import { ForumService } from './services/forum-service';
import { AuthService } from './services/auth-service';
import { UserService } from './services/user-service';
import { ServerStatusService } from './services/server-status-service';
import { AuthGuard } from './services/auth-guard';
//Pipe Imports....
import { StaffTypePipe } from './pipes/staff-type-pipe';
import { ItemRarityPipe} from './pipes/item-rarity-pipe';
import { FilterPipe } from './pipes/filter-pipe';
import { SortPipe } from './pipes/sort-pipe';
import { SafePipe } from './pipes/safe-pipe';
import { NewsTypePipe } from './pipes/news-type-pipe';
import { LikePipe } from './pipes/like-pipe';
import { TimeAgoPipe } from './pipes/time-ago-pipe';

//Routing Imports....
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, NavComponent, StaffTypePipe,
    ContentPage, ItemRarityPipe, ItemPage, LocationPage,
    MonsterPage, NPCPage, QuestPage, CraftshopPage,
    ShopPage, BadgePage, DungeonPage, RecipePage, 
    FilterPipe, SortPipe, SafePipe, NewsPage, 
    NewsTypePipe, NewsDetailPage, ForumsPage, 
    LoginPage, ForumPage, ForumPostPage, LikePipe, 
    UserListPage, UserPage, AccountPage, CalculatorPage, 
    CreateAccountPage, ForgotPasswordPage, TimeAgoPipe, UserForumPostsPage
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing, CKEditorModule
  ],
  providers: [
    appRoutingProviders, HttpClient, TeamService, NewsService,
    ContentService, ForumService, AuthService, UserService,
    ServerStatusService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
