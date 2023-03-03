import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: {
      isLogged: false,
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      isLogged: false,
    },
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: {
      isLogged: true,
    },
  },
];

export const UserRoutingModule = RouterModule.forChild(routes);
