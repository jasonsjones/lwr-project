class EventEmitter {
    events = {};

    subscribe(evtName, callback) {
        this.events[evtName] = this.events[evtName] || [];
        this.events[evtName].push(callback);

        return {
            unsubscribe: () => {
                this.events[evtName] = this.events[evtName].filter((cb) => cb !== callback);
            }
        };
    }

    emit(evtName, data) {
        const callbacks = this.events[evtName];
        if (Array.isArray(callbacks)) {
            callbacks.forEach((cb) => cb(data));
        }
    }
}

export default new EventEmitter();
