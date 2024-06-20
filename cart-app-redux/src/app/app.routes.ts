import { Routes } from '@angular/router';
import { CartPanelComponent } from './components/cart-panel/cart-panel.component';
import { CatalogComponent } from './components/catalog/catalog.component';

export const routes: Routes = [
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },
    { path: 'cart', component: CartPanelComponent },
    { path: 'catalog', component: CatalogComponent }
];
