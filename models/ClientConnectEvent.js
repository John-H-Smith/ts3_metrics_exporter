const { TeamSpeakClient } = require("ts3-nodejs-library");
const Event = require( "./Event" );
const fs = require( "fs" );

class ClientConnectEvent extends Event {

    constructor( connection ) {
        super( "clientconnect", connection );
        connection.on( "clientconnect", this.doEvent );
    }

    doEvent( event ) {
        let client = new TeamSpeakClient( event.client );
        let content = fs.readFileSync( "DataSavings.json", { encoding: 'utf8', flag: 'r' } );
        content = JSON.parse( content );
        /*  Query connects  */
        if( event.client.isQuery() ) {
            if( content.query_connects == null )
                content.query_connects = 1;
            else
                content.query_connects += 1;
        }
        else {
            if( content.user_connects == null )
                content.user_connects = {};
                content.query_connects = 1;
            //else
            //    content.query_connects += 1;
        }
        console.log( content );
        fs.writeFileSync( 'DataSavings.json', JSON.stringify( content ) );
        //console.log( super.data );
    }
}

module.exports = ClientConnectEvent;