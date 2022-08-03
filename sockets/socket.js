const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('bustiamante'));
bands.addBand(new Band('heroes del silencio'));
bands.addBand(new Band('Fito'));
console.log(bands)
//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado')

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('vote-band', (payload) => {
        bands.votedBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    //escuchar el evento add-band.
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {
        
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });




    /* client.on('mensaje', (payload) => {
          console.log('mensaje', payload);
         io.emit('mensaje', { Admin: 'nuevo mensaje' });
         client.broadcast.emit('nuevo-mensaje', payload);
      });*/

});
