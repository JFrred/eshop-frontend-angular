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
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminRouteGuardService } from './auth/services/route-guard-service';
import { UserRouteGuardService } from './services/user-route-guard-service';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

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
    path: "account-verification",
    component: AccountActivationComponent
  },
  {
    path: "category/:name",
    component: CategoryProductsComponent
  },
  {
    path: "products/:id",
    component: ProductPageComponent
  },
  {
    path: "my-profile",
    component: MyProfileComponent
  },
  {
    path: "cart",
    canActivate: [UserRouteGuardService],
    component: CartComponent
  },
  {
    path: "orders",
    canActivate: [UserRouteGuardService],
    component: OrderComponent
  },
  {
    path: "order-form",
    canActivate: [UserRouteGuardService],
    component: OrderFormComponent
  },
  {
    path: "payments/:id",
    canActivate: [UserRouteGuardService],
    component: PaymentDetailsComponent
  },
  {
    path: 'admin/products',
    canActivate: [AdminRouteGuardService],
    loadChildren: () => import('./admin/admin-routing-module').then(m => m.AdminRoutingModule)
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
