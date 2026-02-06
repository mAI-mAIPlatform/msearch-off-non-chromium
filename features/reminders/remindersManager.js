const fs = require("fs");
const path = require("path");

const remindersFile = path.join(__dirname, "reminders.json");

function addReminder(text, date) {
  const reminders = fs.existsSync(remindersFile)
    ? JSON.parse(fs.readFileSync(remindersFile))
    : [];

  reminders.push({ id: Date.now(), text, date });
  fs.writeFileSync(remindersFile, JSON.stringify(reminders, null, 2));
}

function getReminders() {
  if (!fs.existsSync(remindersFile)) return [];
  return JSON.parse(fs.readFileSync(remindersFile));
}

function removeReminder(id) {
  let reminders = getReminders();
  reminders = reminders.filter(r => r.id !== id);
  fs.writeFileSync(remindersFile, JSON.stringify(reminders, null, 2));
}

module.exports = { addReminder, getReminders, removeReminder };