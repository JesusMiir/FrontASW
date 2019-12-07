// Importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes vistas
import { IssuesComponent } from './components/issues/issues.component';
import { NewIssueComponent } from './components/new-issue/new-issue.component';
import { IssueComponent } from './components/issue/issue.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';



// Array de rutas
const appRoutes: Routes = [
    {path: '', component: IssuesComponent},
    {path: 'issues', component: IssuesComponent},
    {path: 'issues/new', component: NewIssueComponent},
    {path: 'issues/:id/:title', component: IssueComponent},
    {path: 'iniciar-sesion', component: LoginComponent},
    {path: 'iniciar-sesion/:id', component: LoginComponent},
    {path: 'registrarse', component: RegisterComponent},
    {path: '**', component: ErrorComponent}
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);