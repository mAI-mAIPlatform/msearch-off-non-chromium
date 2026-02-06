const fs = require("fs");
const path = require("path");

const notesFile = path.join(__dirname, "notes.json");

function addNote(title, content) {
  const notes = fs.existsSync(notesFile)
    ? JSON.parse(fs.readFileSync(notesFile))
    : [];

  notes.push({ id: Date.now(), title, content, date: new Date().toISOString() });
  fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

function getNotes() {
  if (!fs.existsSync(notesFile)) return [];
  return JSON.parse(fs.readFileSync(notesFile));
}

function deleteNote(id) {
  let notes = getNotes();
  notes = notes.filter(n => n.id !== id);
  fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

module.exports = { addNote, getNotes, deleteNote };