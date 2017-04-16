"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBd1NgrVuoSc3BBeRi4bWhJLtYUElhTBWk",
    authDomain: "reactive-462.firebaseapp.com",
    databaseURL: "https://reactive-462.firebaseio.com",
    projectId: "reactive-462",
    storageBucket: "reactive-462.appspot.com",
    messagingSenderId: "319244644108"
};
firebase.initializeApp(config);
var db = firebase.database();
var dbRef = db.ref('reactive-462');
function joinBudget(budgetName, endpoint) {
    db.ref(budgetName).push().set({
        endpoint: endpoint
    });
}
exports.joinBudget = joinBudget;
function getCollaborators(budgetName) {
    return new Promise(function (resolve) {
        db.ref(budgetName).once("value", function (snapshot) {
            resolve(snapshot.val());
        });
    });
}
exports.getCollaborators = getCollaborators;
