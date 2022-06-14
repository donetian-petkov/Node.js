const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('sing', (songTitle) => {
    console.log(`${songTitle} - LaLaLa`);
});

eventEmitter.emit('sing', 'Nothing Else Matters');
