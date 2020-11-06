const fs = require( "fs" );

class DataSaveService {

    static data = {};

    static async saveData() {
        fs.writeFile( 'DataSavings.txt', data );
    }

    static getData() {
        return this.data;
    }

    static async loadData() {
        fs.readFile( "DataSavings.txt", ( err, data ) => {
            if( err )
                throw err;
            this.data = data;
        });
    }

}

module.exports = DataSaveService;