class Event {
    constructor( eventType, connection ) {
        this.eventType = eventType;
        this.connection = connection;
    }

    doEvent() {
        console.log( "Kein Event festgesetzt!" );
    }
}

module.exports = Event;