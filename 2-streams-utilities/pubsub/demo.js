const eventBus = require('./eventBus');

// the eventBus.subscribe will return a function to the firstSayHelloUnsubscribe
let firstSayHelloUnsubscribe = eventBus.subscribe('say-hello', (name, secondName) => { console.log('event say-hello executed - ' + name + " " + secondName) });
eventBus.subscribe('say-hello', (name, secondName) => { console.log('event say-hello executed second time -' + name + " " + secondName) });
eventBus.subscribe('say-bye', (name) => { console.log('event say-bye executed - ' + name)});

eventBus.publish('say-hello', 'Gosho', 'Ivan');
firstSayHelloUnsubscribe(); // it will execute the returned function from subscribe -
//         subscribers[eventType] = subscribers[eventType].filter(x => x != callback);
eventBus.publish('say-hello', 'Pesho'); // only the executed second time subscription will be executed
eventBus.publish('say-bye', 'Gosho');




