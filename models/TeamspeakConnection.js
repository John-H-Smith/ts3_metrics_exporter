const tsServer = require( "ts3-nodejs-library" ).TeamSpeak;
const serverConfig = require( "../config/tsserver.config" ).serverinfo;

class TeamspeakConnection {

    static async getConnection() {
        if( this.connection == null )
            this.connection = await tsServer.connect( serverConfig );
        return this.connection;
    }
    
}

module.exports = TeamspeakConnection;