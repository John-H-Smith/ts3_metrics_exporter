'use strict';

const config = require( "./config/main.config" );
const express = require( "express" );
const app = express();

const TeamspeakConnection = require( "./models/TeamspeakConnection" );
const ClientConnectEvent = require( "./models/ClientConnectEvent" );
const EventManager = require( "./services/EventManager" );

let connection = null;




app.get( '/metrics', (req, res) => {
    res.status( 200 ).send( "Erfolg" );
} );

( async () => {

    try {
        connection = await TeamspeakConnection.getConnection();
        console.log( "Verbindung aufgebaut!" );
    } catch( error ) {
        if( config.debug )
            console.error( error );
        console.error( "Verbindung fehlgeschlagen!" );
        process.exit( 0 );   
    }

    // event registering
    EventManager.addEvent( new ClientConnectEvent( connection ) );
    //let cce = ;

    

})();

app.listen( 2232 );
console.log( "Höre auf Port 2232" );


/*  On Shutdown */
process.on( "SIGINT", () => {
    if( connection != null )
        connection.quit();
    console.log( "Verbindung getrennt!" );
    process.exit( 0 );
});



