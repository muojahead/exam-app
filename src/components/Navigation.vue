<template>
  <nav class="navbar navbar-expand-sm bg-secondary navbar-dark">
    <div class="container">
      <a @click="goToMain" class="navbar-brand"> <h3>Logo</h3> </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMneu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMneu">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isControlBtnsNeeded">
            <a class="nav-link btns" @click="onPrevious">Previous</a>
          </li>
          <li class="nav-item counter">
            <a class="nav-link active" v-if="!controls"
              ><fa
                v-if="icon == 'check-circle'"
                :icon="['fas', icon]"
                style="color: green"
              ></fa>
              <fa v-else :icon="['fas', icon]" style="color: yellow"></fa>
              {{ questionsCount }} / {{ currentQuestion }}</a
            >
          </li>
          <li class="nav-item" v-if="isControlBtnsNeeded">
            <a class="btns nav-link" @click="onNext">Next</a>
          </li>
          <li class="nav-item">
            <a
              @click="moveToResults"
              :class="['nav-link', controls ? 'active' : '']"
              >Results</a
            >
          </li>
        </ul>
      </div>
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
      this.$router.push("/question/1");
    },
    stayInResults() {
      this.leavePage = false;
    },
    onNext() {
      this.$emit("next");
    },
    onPrevious() {
      this.$emit("prev");
    },
    moveToResults() {
      if (this.currentQuestion == 10 || this.resultsDataExist != 0) {
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

.nav-link {
  font-weight: 300;
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
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
}
</style>
