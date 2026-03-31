// data/note-audio-map.js
// Dedicated note audio map for the interactive maqam system
//
// This file is optional but recommended.
// It centralizes all note -> mp3 filename mapping in one place.
//
// Expected folder:
// assets/audio/notes/
//
// Usage goal:
// - assets/interactive-scale.js can read from this file instead of hardcoding paths
// - you can later change filenames here without touching playback logic
//
// Canonical allowed note tokens:
// Do, Dob, Do#, Do/#,
// Re, Reb, Re/b, Re#, Re/#,
// Mi, Mib, Mi/b,
// Fa, Fa#, Fa/#,
// Sol, Solb, Sol#, Sol/#,
// La, Lab, La/b, La#,
// Si, Sib, Si/b

const NOTE_AUDIO_BASE_PATH = "assets/audio/notes/";

const NOTE_AUDIO_FILE_MAP = {
  "Do": "Do.mp3",
  "Dob": "Dob.mp3",
  "Do#": "DoSharp.mp3",
  "Do/#": "DoHalfSharp.mp3",

  "Re": "Re.mp3",
  "Reb": "Reb.mp3",
  "Re/b": "ReHalfFlat.mp3",
  "Re#": "ReSharp.mp3",
  "Re/#": "ReHalfSharp.mp3",

  "Mi": "Mi.mp3",
  "Mib": "Mib.mp3",
  "Mi/b": "MiHalfFlat.mp3",

  "Fa": "Fa.mp3",
  "Fa#": "FaSharp.mp3",
  "Fa/#": "FaHalfSharp.mp3",

  "Sol": "Sol.mp3",
  "Solb": "Solb.mp3",
  "Sol#": "SolSharp.mp3",
  "Sol/#": "Sol/#.mp3",

  "La": "La.mp3",
  "Lab": "Lab.mp3",
  "La/b": "LaHalfFlat.mp3",
  "La#": "LaSharp.mp3",

  "Si": "Si.mp3",
  "Sib": "Sib.mp3",
  "Si/b": "SiHalfFlat.mp3"
};

function getNoteAudioFilename(noteToken) {
  return NOTE_AUDIO_FILE_MAP[noteToken] || null;
}

function getNoteAudioUrl(noteToken) {
  const filename = getNoteAudioFilename(noteToken);
  return filename ? `${NOTE_AUDIO_BASE_PATH}${filename}` : null;
}

function hasNoteAudioMapping(noteToken) {
  return !!getNoteAudioFilename(noteToken);
}

function getAllMappedNoteTokens() {
  return Object.keys(NOTE_AUDIO_FILE_MAP);
}
