import { createRouter, createWebHistory } from "vue-router";
import Results from "../views/Results.vue";
import Question from "../views/Question.vue";
const routes = [{
        path: "/results",
        name: "Results",
        component: Results,
    },
    { path: '/', component: Question },
    { path: "/question/:id", name: "Question", component: Question },
    { path: "/question", redirect: "/question/1" },
    { path: '/:n(.*)', redirect: '/question/1' }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;