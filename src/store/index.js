import { createStore } from "vuex";

export default createStore({
    state: {
        questions: [],
        trueIcon: "",
        dataLoaded: null,
        resultsData: [],
        questionsFinshed: false,
        currentQuestion: 0,
    },
    mutations: {
        questionsMutation(state, payload) {
            state.questions = payload;
        },
        pointsMutation(state, payload) {
            state.points = payload;
        },
        trueIconMutation(state, payload) {
            state.trueIcon = payload;
        },
        dataLoadedMutation(state, payload) {
            state.dataLoaded = payload;
        },
        resultsDataMutation(state, payload) {
            state.resultsData = payload;
        },
        questionsFinshedMutation(state, payload) {
            state.questionsFinshed = payload;
        },
        currentQuestionMutation(state, payload) {
            state.currentQuestion = payload;
        },
    },
    getters: {
        questionsGetter(state) {
            return state.questions;
        },
        trueIconGetter(state) {
            return state.trueIcon;
        },
        dataLoadedGetter(state) {
            return state.dataLoaded;
        },
        resultsDataGetter(state) {
            return state.resultsData;
        },
        resultsDataLengthGetter(state) {
            return state.resultsData.length;
        },
        questionsFinshedGetter(state) {
            return state.questionsFinshed;
        },
        currentQuestionGetter(state) {
            return state.currentQuestion;
        },
        questionsCountGetter(state) {
            return state.questions.length;
        },
    },
});