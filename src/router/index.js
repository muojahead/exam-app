import { createRouter, createWebHistory } from "vue-router";
import Results from "../views/Results.vue";
import Question from "../views/Question.vue";
import notFound from "../components/NotFound.vue"
const routes = [{
        path: "/results",
        name: "Results",
        component: Results,
    },
    { path: '/', component: Question },
    { path: "/question/:questionIndex", name: "Question", component: Question },
    { path: "/question", redirect: "/question/1" },
    { path: '/:n(.*)', component: notFound }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;