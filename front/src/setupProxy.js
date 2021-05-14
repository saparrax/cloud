const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use('/getReserves', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/Reserva/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
  app.use('/getRecollides', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/Recollida/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getContenidors', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/contenidor2/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/deleteContenidor', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/deleteReserva', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/deleteRecollida', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getSolicitud', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/solicitud2/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/updateSolicitud', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/addRecollida', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getProductesReutilitzar', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getProducte/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getUbicacio', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/addReservaReutilitzar', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getCategories', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getCategories2', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/login', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/signup', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getHistorial', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getHistorial/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getUsuari', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/saveImage', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/addReservaPorta', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/checkHorari', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/addVehicle', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/addUbicacio', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/addCategoria', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/addContenidor', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/downloadapp', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/productesMensuals', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/reutilitzacioMensuals', createProxyMiddleware({ target: 'http://localhost:3001'}));

	app.use('/categoria2/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/deleteCategoria', createProxyMiddleware({ target: 'http://localhost:3001'}));

	app.use('/vehicle2/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/deleteVehicle', createProxyMiddleware({ target: 'http://localhost:3001'}));

	app.use('/ubicacio2/:id', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/deleteUbicacio', createProxyMiddleware({ target: 'http://localhost:3001'}));

	app.use('/getVehicles', createProxyMiddleware({ target: 'http://localhost:3001'}));
	app.use('/getUbicacions', createProxyMiddleware({ target: 'http://localhost:3001'}));

	app.use('/raspy', createProxyMiddleware({ target: 'http://localhost:8000'}));
}
