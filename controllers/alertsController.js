const activeAlerts = require("../data/activeAlerts");

const MAX_ALERTS = 5;

let alertsController = {};
console.log(activeAlerts);

const addAlert = function (userId) {
  let index = activeAlerts.findIndex((alert) => alert.userId === userId);
  let alert =
    index !== -1 ? activeAlerts.splice(index, 1)[0] : { userId, noOfAlerts: 0 };
  if (alert.noOfAlerts < MAX_ALERTS) {
    alert.noOfAlerts += 1;
    activeAlerts.push(alert);
  } else {
    console.log(index);
    console.log(alert.noOfAlerts);
    throw new MaxAlertsError("User already has 5 active alerts");
  }
};

const removeAlert = function (userId) {
  let index = activeAlerts.findIndex((alert) => alert.userId === userId);
  console.log("i ran");
  console.log(activeAlerts);
  if (index !== -1) {
    let alert = activeAlerts.splice(index, 1)[0];
    alert.noOfAlerts -= 1;
    activeAlerts.push(alert);
    console.log(alert);
  }
};

class MaxAlertsError extends Error {
  constructor(message) {
    super(message);
    this.name = "MaxAlertsError";
  }
}
alertsController.addAlert = addAlert;
alertsController.removeAlert = removeAlert;
module.exports = alertsController;
