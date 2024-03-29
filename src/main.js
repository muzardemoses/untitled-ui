import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/Pages/Home.vue";
import Profile from "@/Pages/Profile.vue";
import Pricing from "@/Pages/Pricing.vue";
import Messages from "@/Pages/Messages.vue";
import Login from "@/Pages/Login.vue";
import SignUp from "@/Pages/SignUp.vue";
//import VerifyEmail from "@/Pages/VerifyEmail.vue";
import ForgetPassword from "@/Pages/ForgetPassword.vue";
import NotFound from "@/Pages/NotFound.vue";
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import Dashboard from "@/Pages/dashboard-pages/Dashboard.vue";
import Explore from "@/Pages/Explore.vue";
import Users from "@/Pages/users-pages/Users.vue";
import Settings from "@/Pages/settings-pages/Settings.vue";
import Notifications from "@/Pages/dashboard-pages/Notifications.vue";
import Activity from "@/Pages/dashboard-pages/Activity.vue";
import Overview from "@/Pages/dashboard-pages/Overview.vue";
import UserOverview from "@/Pages/users-pages/Overview.vue";
import Friends from "@/Pages/users-pages/Friends.vue";
import FollowersAndFollowing from "@/components/ProfileComps/FollowersAndFollowing.vue";
import Followers from "@/Pages/profile-pages/Followers.vue";
import Following from "@/Pages/profile-pages/Following.vue";
import ChatRoom from "@/Pages/profile-pages/ChatRoom.vue";
import SelectAndMessage from "@/Pages/profile-pages/SelectAndMessage.vue";
import BillingSettings from "@/Pages/settings-pages/Billing.vue";
import ProfileSettings from "@/Pages/settings-pages/Profile.vue";
import NotificationsSettings from "@/Pages/settings-pages/Notifications.vue";
import PasswordSettings from "@/Pages/settings-pages/Password.vue";
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import store from "./Config/store.js";
import { auth } from "./Config/firebase.js";
import "./assets/main.css";
import "./assets/tailwind.css";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        layout: DefaultLayout, // use DefaultLayout for this route
      },
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing,
      meta: {
        layout: DefaultLayout, // use DefaultLayout for this route
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        layout: AuthLayout, // use AuthLayout for this route
      },
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.getters["user"];
        console.log(isAuthenticated);
        if (isAuthenticated) {
          next({ name: "Overview" });
        } else {
          next();
        }
      },
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
      meta: {
        layout: AuthLayout, // use AuthLayout for this route
      },
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.getters["user"];
        if (isAuthenticated) {
          next({ name: "Dashboard" });
        } else {
          next();
        }
      },
    },
    {
      path: "/forget-password",
      name: "ForgetPassword",
      component: ForgetPassword,
      meta: {
        layout: AuthLayout, // use AuthLayout for this route
      },
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.getters["user"];
        if (isAuthenticated) {
          next({ name: "Dashboard" });
        } else {
          next();
        }
      },
    },
    {
      path: "/:username",
      name: "Profile",
      component: Profile,
      meta: {
        Layout: DashboardLayout, // use DashboardLayout for this route
      },
    },
    {
      path: "/:username",
      name: "FollowingAndFollowers",
      component: FollowersAndFollowing,
      meta: {
        Layout: DashboardLayout, // use DashboardLayout for this route
      },
      redirect: { name: "Followers" }, // redirect to Followers by default
      children: [
        {
          path: "followers",
          name: "Followers",
          component: Followers,
        },
        {
          path: "following",
          name: "Following",
          component: Following,
        },
      ],
    },
    {
      path: "/messages",
      name: "Messages",
      component: Messages,
      meta: {
        layout: DashboardLayout, // use DashboardLayout for this route
      },
      redirect: { name: "SelectAndMessage" }, // redirect to SelectAndMessage by default
      children: [
        {
          path: "select-and-message",
          name: "SelectAndMessage",
          component: SelectAndMessage,
        },
        {
          path: ":idone-:idtwo",
          name: "ChatRoom",
          component: ChatRoom,
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters["user"]) {
          next();
        } else {
          next({ name: "Login" });
        }
      }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        layout: DashboardLayout, // use DashboardLayout for this route
      },
      redirect: { name: "Overview" }, // redirect to Overview by default
      children: [
        {
          path: "overview",
          name: "Overview",
          component: Overview,
        },
        {
          path: "notifications",
          name: "Notifications",
          component: Notifications,
        },
        {
          path: "activity",
          name: "Activity",
          component: Activity,
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters["user"]) {
          next();
        } else {
          next({ name: "Login" });
        }
      },
    },
    {
      path: "/explore",
      name: "Explore",
      component: Explore,
      meta: {
        layout: DashboardLayout, // use DashboardLayout for this route
      },
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
      meta: {
        layout: DashboardLayout, // use DashboardLayout for this route
      },
      redirect: { name: "UserOverview" }, // redirect to Overview by default
      children: [
        {
          path: "overview",
          name: "UserOverview",
          component: UserOverview,
        },
        {
          path: "friends",
          name: "Friends",
          component: Friends,
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters["user"]) {
          next();
        } else {
          next({ name: "Login" });
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        layout: DefaultLayout, // use DefaultLayout for this route
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: {
        layout: DashboardLayout, // use DashboardLayout for this route
      },
      redirect: { name: "ProfileSettings" }, // redirect to Overview by default
      children: [
        {
          path: "billing",
          name: "BillingSettings",
          component: BillingSettings,
        },
        {
          path: "profile",
          name: "ProfileSettings",
          component: ProfileSettings,
        },
        {
          path: "notifications",
          name: "NotificationsSettings",
          component: NotificationsSettings,
        },
        {
          path: "password",
          name: "PasswordSettings",
          component: PasswordSettings,
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters["user"]) {
          next();
        } else {
          next({ name: "Login" });
        }
      },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = store.getters["user"];

//     if (to.name === "Login" || to.name === "SignUp") {
//       if (isAuthenticated) {
//         next({ name: "Dashboard" });
//       } else {
//         next();
//       }
//     } else if (to.name === "Dashboard") {
//       if (isAuthenticated) {
//         next();
//       } else {
//         next({ name: "Login" });
//       }
//     } else {
//       next();
//     }
//   });

//   export default router;


createApp(App).use(router).use(store).mount("#app");

