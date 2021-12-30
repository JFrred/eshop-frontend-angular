import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountActivationComponent } from './auth/account-activation/account-activation.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderComponent } from './order/order.component';
import { ProductMgmtComponent } from './product-mgmt/product-mgmt.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: "product/:id",
    component: ProductPageComponent
  },
  {
    path: "products-mgmt",
    component: ProductMgmtComponent
  },
  {
    path: "category/:name",
    component: CategoryProductsComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "orders",
    component: OrderComponent
  },
  {
    path: "order-form",
    component: OrderFormComponent
  },

  {
    path: "my-profile",
    component: MyProfileComponent
  },
  {
    path: "account-verification",
    component: AccountActivationComponent
  },
  {
    path:
      "**",
    component: HomepageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
