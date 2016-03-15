MidiWriterJS
===============
[![Build Status](https://travis-ci.org/grimmdude/MidiWriterJS.svg?branch=master)](https://travis-ci.org/grimmdude/MidiWriterJS)

MidiWriterJS is a JavaScript library providing an API for generating MIDI files.  It's still very young and is in active development.

```javascript
var note = new MidiWriter.NoteEvent({pitch: 'C4', duration: '4'});
track.addEvent(note);

var notes = new MidiWriter.NoteEvent({pitch: ['C4', 'D4', 'E4'], duration: '4'});
track.addEvent(notes);

var write = new MidiWriter.Writer(track);
console.log('data:audio/midi;base64,' + write.base64());
```