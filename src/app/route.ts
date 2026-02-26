import { Routes } from "@angular/router";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Tasks } from "./pages/tasks/tasks";


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  {path:'tasks',component:Tasks}
];