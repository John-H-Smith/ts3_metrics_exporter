class Event {
    constructor( eventType, connection ) {
        this.eventType = eventType;
        this.connection = connection;
        this.data = {};
    }

    doEvent() {
        console.log( "Kein Event festgesetzt!" );
    }

    getData() {
        return this.data;
    }
}

module.exports = Event;