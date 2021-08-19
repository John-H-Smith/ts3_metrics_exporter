const router = require( 'express' ).Router();
const fs = require( 'fs' );


router.get( '/', (req, res) => {

    res.setHeader( 'content-type', 'text/plain' );

    let content = fs.readFileSync( __dirname + "/../DataSavings.json", { encoding: 'utf8', flag: 'r' } );
    content = JSON.parse( content );

    //console.log( content );

    let ret = "";
    
    /*  Query-connections   */
    ret += "# HELP nodets3_query_connections_total Number of connected clients\n";
    ret += "# TYPE nodets3_query_connections_total counter\n";
    ret += "nodets3_query_connects_total " + content.query_connections_total + "\n";

    /*  User connections */
    if( content.users != null ) {
        ret += "# HELP nodets3_user_connections Number of connected clients\n";
        ret += "# TYPE nodets3_user_connections counter\n";
        content.users.forEach( user => {
            ret += 'nodets3_user_connections{uid="' + user.uid + '",name="' + user.name + '"} ' + user.connections + '\n';
        });

    }

    res.status( 200 ).send( ret );
} );




module.exports = router;