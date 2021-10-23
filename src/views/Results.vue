<template>
  <div>
    <navigation-app :controls="true" />
    <div class="container">
      <div class="card m-md-2">
        <div class="card-header">
          <h5>Results</h5>
        </div>
        <div class="card-body">
          <table class="table table-borderless table-hover">
            <thead>
              <tr>
                <th scope="col">Questions</th>
                <th scope="col">Correct Answer</th>
                <th scope="col">Your Answer</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(question, index) in resultsData" :key="index">
                <td>{{ question.question }}</td>
                <td v-html="question.correctAnswer"></td>
                <td
                  v-if="question.correctAnswer == question.userAnswer"
                  style="color: green"
                >
                  <fa
                    :icon="['fas', 'check-circle']"
                    style="margin-right: 5px"
                  ></fa>
                  <span v-html="question.userAnswer"></span>
                </td>
                <td
                  v-if="question.correctAnswer != question.userAnswer"
                  style="color: red"
                >
                  <fa
                    :icon="['fas', 'times-circle']"
                    style="margin-right: 5px"
                  ></fa>
                  <span v-html="question.userAnswer"></span>
                </td>
                <td>{{ question.point }}</td>
              </tr>
              <tr class="total">
                <td colspan="3">Total Points</td>
                <th>{{ totalPoints }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    totalPoints() {
      let points = 0;
      this.resultsData.forEach((e) => {
        points += e.point;
      });
      return points;
    },
    resultsData() {
      return this.$store.getters.resultsDataGetter;
    },
  },
  created() {
    if (this.resultsData.length == 0) {
      this.$router.push("/question/1");
    }
  },
};
</script>

<style scoped lang="scss">
.card-body {
  padding: 0;
  overflow-x: auto !important;
}
table {
  min-width: 700px;
  margin-bottom: 0 !important;
  thead {
    background-color: var(--bs-gray) !important;
    color: #fff;
  }
  tbody {
    tr {
      border-bottom: 0.1px solid var(--bs-gray-300);
    }
    .total {
      background-color: var(--bs-gray) !important;
      color: #fff !important;

      &:hover {
        color: #fff !important;
      }
    }
  }
}
</style>
