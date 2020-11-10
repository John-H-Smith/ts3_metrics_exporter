const fs = require( "fs" );

class DataSaveService {

    static data = {};

    static saveData() {
        console.log( "saved: ", this.getData() );
        fs.writeFileSync( 'DataSavings.json', JSON.stringify( this.getData() ) );
        //fs.writeFileSync( 'DataSavings.json', "hallo test" );
    }

    static getData() {
        return this.data;
    }

    static async loadData() {
        fs.readFile( "DataSavings.json", 'utf8', ( err, data ) => {
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
        });
        //this.data = fs.readFileSync( "DataSavings.json" );
        //this.data = fs.readFileSync( "DataSavings.json", {encoding:'utf8', flag:'r'} );
    }

}

module.exports = DataSaveService;