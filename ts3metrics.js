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
        process.exit( 0 );   
    }

    try {
        DataSaveService.loadData();
    } catch( error ) {
        console.error( error );
    }

    console.log( DataSaveService.getData() );
    DataSaveService.data.test = true;
    console.log( DataSaveService.getData() );

    ww = DataSaveService.getData();

    // event registering
    EventManager.addEvent( new ClientConnectEvent( connection ) );
    //let cce = ;

    

})();

app.listen( 2232 );
console.log( "Listening on port 2232" );


/*  On Shutdown */
process.on( "SIGINT", () => {
    console.log( ww );
    console.log( DataSaveService.data );
    if( connection != null )
        connection.quit();

    //DataSaveService.saveData();
    console.log( "Connection closed!" );
    process.exit( 0 );
});



