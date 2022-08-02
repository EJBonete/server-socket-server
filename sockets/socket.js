const {io}=require('../index');


//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado')

    client.on('disconnect', () => {
        console.log('Cliente desconecatado')
    });
    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);

        io.emit('mensaje', { Admin: 'nuevo mensaje' });

    })
});
