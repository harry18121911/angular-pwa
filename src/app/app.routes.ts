import { Routes } from '@angular/router';
import { NewsDetail } from './news-detail/news-detail';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component :Home},
  { path: 'news/:uuid', component: NewsDetail}
];
