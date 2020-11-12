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
            if( content.query_connections_total == null )
                content.query_connections_total = 0;
            content.query_connections_total += 1;
        }
        else {
            if( content.users == null )
                content.users = [];

            let user = content.users.find( e => e.uid == client.parent.propcache.clientUniqueIdentifier );
            if( user == null ) {
                let newUser = {
                    uid: client.parent.propcache.clientUniqueIdentifier,
                    connections: 0,
                    name: client.parent.propcache.clientNickname
                };
                content.users.push( newUser );
            }
            user.connections += 1;
        }
        fs.writeFileSync( 'DataSavings.json', JSON.stringify( content ) );   
    }
}

module.exports = ClientConnectEvent;