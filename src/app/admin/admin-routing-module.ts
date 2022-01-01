import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductMgmtComponent } from './product-mgmt/product-mgmt.component'; 
import { ProductSaveComponent } from './product-save/product-save.component';

const routes: Routes = [
  { path: '', children :[
    { path : '', component : ProductMgmtComponent },
    { path : 'add', component : ProductSaveComponent },
    { path : 'edit/:id', component : ProductEditComponent },
    { path : '', redirectTo : 'admin/products', pathMatch : 'full' }
  ] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class AdminRoutingModule { }