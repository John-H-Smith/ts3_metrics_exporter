'use strict';

const config = require( "./config/main.config" );
const express = require( "express" );
const app = express();

const TeamspeakConnection = require( "./models/TeamspeakConnection" );
const ClientConnectEvent = require( "./models/ClientConnectEvent" );
const EventManager = require( "./services/EventManager" );
let DataSaveService = require( "./services/DataSaveService" );

let connection = null;

const fs = require( "fs" );

let ww = null;


app.get( '/metrics', (req, res) => {
    res.status( 200 ).send( "Erfolg" );
} );

( async () => {

    try {
        connection = await TeamspeakConnection.getConnection();
        console.log( "Connection established!" );
    } catch( error ) {
        if( config.debug )
            console.error( error );
        console.error( "Failed to establish connection!" );
        save_quit();  
    }

    try {
        fs.readFileSync( "DataSavings.json", { encoding: 'utf8', flag: 'r' } );
    } catch( error ) {
        console.log( "No DataSavings.json found - creating..." );
        fs.writeFileSync( 'DataSavings.json', '{}' );
    }

    // event registering
    EventManager.addEvent( new ClientConnectEvent( connection ) );
    //let cce = ;

})();

app.listen( 2232 );
console.log( "Listening on port 2232" );


/*  On Shutdown */
process.on( "SIGINT", () => {
    save_quit();
});

function save_quit() {
    if( connection != null )
        connection.quit();
    console.log( "Connection closed!" );
    process.exit( 0 );
}

