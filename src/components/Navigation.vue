<template>
  <nav class="navbar bg-secondary navbar-dark">
    <div class="container">
      <a @click="goToMain" class="navbar-brand"> <h3>Logo</h3> </a>
      <ul class="navbar-nav" v-if="isDataLoaded">
        <li class="nav-item" v-if="isControlBtnsNeeded">
          <a class="nav-link btns" @click="onPrevious">Previous</a>
        </li>
        <li class="nav-item counter" v-if="!controls">
          <a :class="['nav-link ', isControlBtnsNeeded ? 'active' : '']"
            ><fa
              v-if="icon == 'check-circle'"
              :icon="['fas', icon]"
              style="color: green"
            ></fa>
            <fa v-else :icon="['fas', icon]" style="color: yellow"></fa>
            {{ questionsCount }} /
            {{
              currentQuestion + 1 > 10 ? currentQuestion : currentQuestion + 1
            }}</a
          >
        </li>
        <li class="nav-item" v-if="isControlBtnsNeeded">
          <a class="btns nav-link" @click="onNext">Next</a>
        </li>
        <li class="nav-item">
          <a
            @click="moveToResults"
            :class="['nav-link results', !isControlBtnsNeeded ? 'active' : '']"
            >Results</a
          >
        </li>
      </ul>
    </div>
    <teleport to="body">
      <transition name="fade">
        <Modal
          :message="msg"
          @doIt="leaveReults"
          @ignoreIt="stayInResults"
          v-if="leavePage"
        />
      </transition>
    </teleport>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      leavePage: false,
      msg: "if you Leave this Page you will Lose All Your Results Data, Click Leave To Leave Page and Lose Data.",
    };
  },
  props: ["controls"],
  computed: {
    ...mapGetters({
      currentQuestion: "currentQuestionGetter",
      questionsCount: "questionsCountGetter",
      resultsDataExist: "resultsDataLengthGetter",
      isDataLoaded: "dataLoadedGetter",
    }),
    icon() {
      if (this.currentQuestion == 10) {
        return "check-circle";
      }
      return "exclamation-circle";
    },
    isControlBtnsNeeded() {
      if (this.currentQuestion == 10) {
        return false;
      }
      if (this.controls) {
        return false;
      }
      return true;
    },
  },
  methods: {
    goToMain() {
      if (this.$route.fullPath == "/results") {
        this.leavePage = true;
      }
    },
    leaveReults() {
      this.$store.commit("resultsDataMutation", []);
      this.$store.commit("questionsMutation", []);
      this.$router.push("/");
    },
    stayInResults() {
      this.leavePage = false;
    },
    onNext() {
      if (this.currentQuestion > 10) {
        this.currentQuestion = 10;
      }
      this.$emit("next");
    },
    onPrevious() {
      this.$emit("prev");
    },
    moveToResults() {
      if (this.currentQuestion == 10) {
        this.$router.push("/results");
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bg-secondary {
  background-color: #323a41 !important;
}
.container {
  justify-content: flex-start;
  .navbar-brand {
    cursor: pointer;
  }
  .navbar-nav {
    display: flex;
    flex-direction: row;
    .nav-link {
      font-weight: 300;
      color: #fff;
      opacity: 0.7;
      cursor: pointer;
      margin-right: 10px;
    }
    .nav-link.btns {
      font-weight: 600;
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
    }
    .nav-link.active {
      font-weight: bold;
      opacity: 1;
      cursor: default !important;
    }
    .results {
      cursor: default !important;
    }
    .results.active {
      cursor: pointer !important;
    }
  }
}
@media (max-width: 540px) {
  .navbar .navbar-brand {
    width: 100%;
    text-align: center;
    border-bottom: 0.5px solid var(--bs-gray);
  }
  .navbar-nav {
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }
}
</style>
