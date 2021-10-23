<template>
  <div>
    <navigation-app @next="onNext" @prev="onPrevious" />
    <div class="container">
      <div class="card m-md-5 m-2" v-if="!questionsFinshed">
        <div class="card-header">
          <h2 v-html="question"></h2>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(answer, index) in allAnswersFuncResult"
              :key="index"
              @click="getAnswer($event, index)"
            >
              <input
                type="radio"
                :id="answer"
                v-model="selectedAnswer"
                :value="answer"
                name="answer"
              />
              <label :for="answer" v-html="answer"></label>
            </li>
          </ul>
          <transition name="fade">
            <div class="alert alert-danger my-2" role="alert" v-if="error">
              {{ alertMsg }}
            </div>
          </transition>
        </div>
        <div class="card-footer text-muted text-left">
          <button class="btn btn-secondary mx-1" @click="onPrevious">
            Previous
          </button>
          <button class="btn btn-secondary bg-dsecondary" @click="onNext">
            Next
          </button>
        </div>
      </div>
      <transition name="fade" v-else>
        <div
          :class="'alert alert-' + msgType + ' my-2'"
          role="alert"
          v-if="alertMsg"
          v-html="alertMsg"
        ></div>
        <teleport to="body" v-else>
          <loader />
        </teleport>
      </transition>
    </div>
  </div>
</template>
<script>
import loader from "../components/Loading.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    loader,
  },
  data() {
    return {
      selectedAnswer: "",
      alertMsg: "",
      error: null,
      questionsResults: [],
      point: "",
      msgType: "",
    };
  },
  computed: {
    ...mapGetters({
      isQuestionsLoaded: "dataLoadedGetter",
      questionsData: "questionsGetter",
      cureentQuestion: "currentQuestionGetter",
      questionsCount: "questionsCountGetter",
      questionsFinshed: "questionsFinshedGetter",
    }),
    question() {
      if (this.questionsData[this.cureentQuestion]) {
        return (
          this.cureentQuestion +
          1 +
          " - " +
          this.questionsData[this.cureentQuestion].question
        );
      }
      return "";
    },
    incorrect_answers() {
      if (this.questionsData[this.cureentQuestion]) {
        return this.questionsData[this.cureentQuestion].incorrect_answers;
      }
      return "";
    },
    correct_answer() {
      if (this.questionsData[this.cureentQuestion]) {
        return this.questionsData[this.cureentQuestion].correct_answer;
      }
      return "";
    },
    allAnswersFuncResult() {
      return this.allAnswers();
    },
  },
  methods: {
    getAnswer(e, indexOfAnswer) {
      this.selectedAnswer = this.allAnswersFuncResult[indexOfAnswer];
    },
    allAnswers() {
      // Randomizing Array Elements to Change The correct Answer Position at every Question Showed
      const answers = [];
      answers.push(...this.incorrect_answers);
      answers.push(this.correct_answer);
      let currentIndex = answers.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [answers[currentIndex], answers[randomIndex]] = [
          answers[randomIndex],
          answers[currentIndex],
        ];
      }
      return answers;
    },
    onNext() {
      // Check If User Choosed some Answer or not
      if (this.selectedAnswer == "") {
        this.error = true;
        this.alertMsg = "Please Answer on The Current Question Frist";
        setTimeout(() => {
          this.error = false;
        }, 4000);
        return;
      }
      // Get Point
      if (this.selectedAnswer === this.correct_answer) {
        this.point = 1;
      } else {
        this.point = 0;
      }
      // Collect Question Result
      this.error = false;

      const question = {
        question: this.question,
        correctAnswer: this.correct_answer,
        userAnswer: this.selectedAnswer,
        point: this.point,
      };
      if (this.questionsResults.length === 0) {
        this.questionsResults.push(question);
      } else {
        const questionInArray = this.questionsResults.find(
          (ele) => ele.question == question.question
        );
        if (questionInArray) {
          const index = this.questionsResults.indexOf(questionInArray);
          this.questionsResults[index].userAnswer = question.userAnswer;
          this.questionsResults[index].point = question.point;
        } else {
          this.questionsResults.push(question);
        }
      }
      // Get Next Question
      this.$store.commit("currentQuestionMutation", this.cureentQuestion + 1);
      this.selectedAnswer = "";
      this.$router.push(`/question/${this.cureentQuestion + 1}`);
      // Finall Questions Step and Go To Results
      if (this.cureentQuestion == this.questionsData.length) {
        let seconds = 4;
        this.msgType = "success";
        this.alertMsg = `Questions Finished, Go To Results Page, you will auto redirect after <span style='color: red;'>${
          seconds - 1
        }</span>  Seconds`;
        this.$store.commit("resultsDataMutation", this.questionsResults);
        this.$store.commit("questionsFinshedMutation", true);
        const interval = setInterval(() => {
          seconds--;
          this.alertMsg = `Questions Finished, Go To Results Page, you will auto redirect after <span style='color: red;'>${seconds}</span> Seconds`;
          if (seconds == 0) {
            clearInterval(interval);
            this.$router.push("/results");
          }
        }, 1000);
      }
    },
    onPrevious() {
      if (this.cureentQuestion == 0) {
        return;
      }
      this.$store.commit("currentQuestionMutation", this.cureentQuestion - 1);
      this.selectedAnswer =
        this.questionsResults[this.cureentQuestion].userAnswer;
    },
  },
  created() {
    if (this.cureentQuestion == 10) {
      if (this.questionsData) {
        this.$store.commit("dataLoadedMutation", true);
      }
      this.$store.commit("currentQuestionMutation", 0);
    }
    if (!this.isQuestionsLoaded) {
      // this.$store.commit("dataLoadedMutation", false)
      setTimeout(() => {
        this.msgType = "danger";
        this.alertMsg =
          "Unfortunately something bad happened that we didn't expect, maybe the internet is too slow or the server is not responding try to refresh the page.";
      }, 10000);
    }
  },
  async mounted() {
    const result = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
    );
    if (result.status == 200 && result.data.results.length != 0) {
      this.$store.commit("questionsMutation", result.data.results);
      this.$store.commit("dataLoadedMutation", true);
      this.$store.commit("questionsFinshedMutation", false);
    } else {
      this.$store.commit("dataLoadedMutation", false);
      this.$store.commit("questionsFinshedMutation", true);
    }
  },
};
</script>
<style scoped lang="scss">
.list-group-item {
  transition: 0.2s ease-in all;
  cursor: pointer;
  &:hover {
    color: #fff !important;
    background-color: var(--bs-gray);
  }
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 12px;
  height: 12px;
  background: var(--bs-gray);
  position: absolute;
  top: 3.2px;
  left: 3.2px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>