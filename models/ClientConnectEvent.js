const { TeamSpeakClient } = require("ts3-nodejs-library");
const Event = require( "./Event" );

class ClientConnectEvent extends Event {

    constructor( connection ) {
        super( "clientconnect", connection );
        connection.on( "clientconnect", this.doEvent );
    }

    doEvent( event ) {
        let client = new TeamSpeakClient( event.client );
        /*if( event.client.isQuery() )
            super.data.query_connects = super.data.query_connects++;
        else
            super.data.user_connects = super.data.user_connects[event.client.clientUniqueIdentifier]++;*/

        //console.log( super.data );
    }
}

module.exports = ClientConnectEvent;