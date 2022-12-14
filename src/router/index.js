import Vue from "vue";
import VueRouter from "vue-router";

import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import AccountView from "@/views/user/AccountView.vue";
import RegisterCompanyRequestView from "@/views/company/RegisterCompanyRequestView.vue";
import RegisterCompanyRequestsView from "@/views/company/RegisterCompanyRequestsView.vue";
import ApprovedRegisterCompanyRequestsView from "@/views/company/ApprovedRegisterCompanyRequestsView.vue";
import CompanyInfoView from "@/views/company/CompanyInfoView.vue";
import CompaniesView from "@/views/company/CompaniesView.vue";
import CompanyView from "@/views/company/CompanyView.vue";
import JobPositionView from "@/views/company/JobPositionView.vue";
import JobPositionsView from "@/views/company/JobPositionsView.vue";
import LandingView from "@/views/LandingView.vue";
import CreateJobOfferView from "@/views/company/CreateJobOfferView.vue";


import HomeView from "@/views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    component: LoginView,
    name: "LoginView",
    path: "/login",
  },
  {
    component: RegisterView,
    name: "RegisterView",
    path: "/register",
  },
  {
    component: HomeView,
    name: "HomeView",
    path: "/",
    children: [
      {
        component: AccountView,
        name: "AccountView",
        path: "/account",
        beforeEnter: guardRouteLoggedIn,
      },
      {
        component: RegisterCompanyRequestView,
        name: "RegisterCompanyRequestView",
        path: "/register-company-request",
        beforeEnter: guardRouteLoggedIn,
      },
      {
        component: RegisterCompanyRequestsView,
        name: "RegisterCompanyRequestsView",
        path: "/register-company-requests",
        beforeEnter: guardRouteLoggedIn,
      },
      {
        component: ApprovedRegisterCompanyRequestsView,
        name: "ApprovedRegisterCompanyRequestsView",
        path: "/approved-register-company-request",
        beforeEnter: guardRouteLoggedIn,
      },
      {
        component: CompanyInfoView,
        name: "CompanyInfoView",
        path: "/company-info",
        beforeEnter: guardRouteLoggedIn,
      },
      {
        component: CompaniesView,
        name: "CompaniesView",
        path: "/companies",
        beforeEnter: guardRouteLoggedIn,
      },
      {
        component: CompanyView,
        name: "CompanyView",
        path: "/company/:id",
      },
      {
        component: JobPositionsView,
        name: "JobPositionsView",
        path: "/job-positions",
        beforeEnter: guardRouteLoggedIn,
      },
      {
        component: JobPositionView,
        name: "JobPositionView",
        path: "/job-position/:id",
      },
      {
        component: LandingView,
        name: "LandingView",
        path: "/landing",
      },
      {
        component: CreateJobOfferView,
        name: "CreateJobOfferView",
        path: "/job-offer",
        beforeEnter: guardRouteLoggedIn,
      },
    ]
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function guardRouteLoggedIn(to, from, next) {
  let userId = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  if (!userId || !token) next("/login");
  else next(); // allow to enter the route
}

// function guardRouteAdmin(to, from, next) {
//   let userRole = localStorage.getItem("role");
//   if (userRole === "ROLE_ADMIN") next();
// }

// function guardRouteUser(to, from, next) {
//   let userRole = localStorage.getItem("role");
//   if (userRole === "ROLE_USER") next();
// }

// function guardNotFound(to, from, next) {
//   let userRole = localStorage.getItem("role");
//   let token = localStorage.getItem("token");
//   if (!userRole || !token) next("/");
//   else {
//     if (userRole === "ROLE_USER") next({ name: "HomeUserView" });
//     else next({ name: "HomeAdminView" });
//   }
// }

// Vue.axios.interceptors.response.use(undefined, function (error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         localStorage.clear();
//         return router.push('/login');
//     }
//     return Promise.reject(error);
//   }
// })

export default router;