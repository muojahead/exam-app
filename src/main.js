import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExclamationCircle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import navigation from "./components/Navigation.vue";
library.add(faExclamationCircle, faCheckCircle, faTimesCircle);
const app = createApp(App);
app.use(store);
app.use(router);
app.component("navigation-app", navigation);
app.component("fa", FontAwesomeIcon);
app.mount("#app");
