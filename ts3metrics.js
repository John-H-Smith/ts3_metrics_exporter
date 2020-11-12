'use strict';

const config = require( "./config/main.config" );
const express = require( "express" );
const app = express();

const TeamspeakConnection = require( "./models/TeamspeakConnection" );
const ClientConnectEvent = require( "./models/ClientConnectEvent" );
const EventManager = require( './services/EventManager' );

let connection = null;

const fs = require( "fs" );

let ww = null;

/*  Routing of metrics  */
app.use( '/metrics', require( './routes/metrics' ) );



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
        let file = fs.readFileSync( "DataSavings.json", { encoding: 'utf8', flag: 'r' } );
        if( file == "" )
            fs.writeFileSync( 'DataSavings.json', '{}' );
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

