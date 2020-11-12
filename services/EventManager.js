class EventManager {
    static events = [];

    static addEvent( event ) {
        this.events.push( event );
    }

    static getEvents() {
        return this.events;
    }

    static getEvent( event ) {
        return this.events.find( ev => ev.eventType === event );
    }
}

module.exports = EventManager;