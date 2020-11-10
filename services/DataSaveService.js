const fs = require( "fs" );

class DataSaveService {

    static data = {};

    static saveData() {
        console.log( "saved: ", this.data );
        fs.writeFileSync( 'DataSavings.json', JSON.stringify( this.getData() ) );
        //fs.writeFileSync( 'DataSavings.json', "hallo test" );
    }

    static addData( key, value ) {
        this.getData();
        this.data[ key ] = value;
        this.saveData();
    }

    static getData() {
        /*fs.readFile( "DataSavings.json", 'utf8', ( err, data ) => {
            if( err ) {
                if( err.errno === -4058 )
                    fs.writeFile( 'DataSavings.json', '', ( error, data2 ) => {
                        if( error )
                            throw error;
                        else
                            console.log( "DataSavings.json created!" );
                    } );
                else
                    throw err;
            }
            this.data = data;
        });*/
        //this.data = fs.readFileSync( "DataSavings.json" );
        let temp = fs.readFileSync( "DataSavings.json", {encoding:'utf8', flag:'r'} );
        console.log( "temp:" + temp );
        if( temp != null && temp != "" )
            this.data = JSON.parse( temp );
        return this.data;
    }

}

module.exports = DataSaveService;