import mongoose from 'mongoose';

/**
 * Connect
 * @return {[boolean]} [status connect database]
 */

module.exports.connnect = () => {

    mongoose.set('useFindAndModify', false);
    mongoose.connect('', { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
        dbName: 'ryoshi',
        user: '',
        pass: ''
        }, function(err, res) {
        if (err) throw err;
        console.log('Connect database mongoose');
    });

}