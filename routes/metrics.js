const router = require( 'express' ).Router();
const fs = require( 'fs' );


router.get( '/', (req, res) => {

    let content = fs.readFileSync( "DataSavings.json", { encoding: 'utf8', flag: 'r' } );
    content = JSON.parse( content );

    console.log( content );

    let ret = "";
    
    /*  Query-connections   */
    ret += "# HELP nodets3_query_connections_total Number of connected clients<br/>";
    ret += "# TYPE nodets3_query_connections_total counter<br/>";
    ret += "nodets3_query_connects_total " + content.query_connections_total + "<br/>";

    /*  User connections */
    if( content.users != null )
        ret += "# HELP nodets3_user_connections Number of connected clients<br/>";
        ret += "# TYPE nodets3_user_connections counter<br/>";
        content.users.forEach( user => {
            ret += 'nodets3_user_connections{uid="' + user.uid + '",name="' + user.name + '"} ' + user.connections + '<br/>';
        });

    res.status( 200 ).send( ret );
} );




module.exports = router;