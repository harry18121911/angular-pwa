import { Routes } from '@angular/router';
import { NewsDetail } from './news-detail/news-detail';
import { Home } from './home/home';
import { NewsList } from './news-list/news-list';

export const routes: Routes = [
  { path: '', component :Home},
  { path: 'newsList', component:NewsList},
  { path: 'news/:uuid', component: NewsDetail}
];
