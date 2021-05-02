import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateTokenGuard } from './guards/validate-token.guard';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./Auth/auth.module').then( m => m.AuthModule )
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
        canActivate: [ ValidateTokenGuard ],
        canLoad: [ ValidateTokenGuard ] 
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}