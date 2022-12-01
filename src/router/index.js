import { createWebHistory, createRouter } from "vue-router";
import MovieReview from "@/views/MovieReview.vue";

const routes = [
    {
        path: "/moviereview",
        name: "moviereview",
        component: MovieReview,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/movies/:id",
        name: "movie.edit",
        component: () => import("@/views/MovieEdit.vue"),
        props: true
    },

    {
        path: "/movies/add",
        name: "movie.add",
        component: () => import("@/views/MovieAdd.vue"),
    },    
    
    {
        path: "/users/registered",
        name: "user.registered",
        component: () => import("@/views/Registered.vue"),
    },   
    
    {
        path: "/",
        name: "user.login",
        component: () => import("@/views/Login.vue"),
    },   
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
