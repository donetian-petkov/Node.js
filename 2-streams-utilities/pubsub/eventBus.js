const subscribers = {};

//addEventListener
exports.subscribe = (eventType, callback) => {

    if (!subscribers[eventType]) {
        subscribers[eventType] = [];
    }

    subscribers[eventType].push(callback);

    return () => {
        subscribers[eventType] = subscribers[eventType].filter(x => x != callback);
    }
};

// Emit, trigger
exports.publish = (eventType, ...params) => {

    subscribers[eventType].forEach(s => s.apply(null, params));

};
