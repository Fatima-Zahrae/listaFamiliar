'use strict';

module.exports = function (Usuario) {
    /**
     * metodo para aceptar la solicitud
     * @param {object} idUsuarioAutenticado almacenar el objeto o instancia del id de usuario
     * @param {Function(Error, object)} callback
     */

    Usuario.prototype.AceptarSolicitudes = function (contexto, callback) {
        var solicitudAprobada
        var arrayUsuarios;

        // accedo al modelo de lista familiar atraves del modelo usuario.
        var ListaFamiliar = Usuario.app.models.ListaFamiliar;

        //obtengo el id del usuario autenticado 
        var idUsuario = contexto.req.accessToken.userId
        var usuariologeado = this;

        // necesito obtener el id de lista familiar atraves del id de usuaio autenticado 

        Usuario.findById(idUsuario, function (err, objetoUsuarioLogeado) {
            if (err) //{
                callback(err);
            //} else {
                var idLista = objetoUsuarioLogeado.listaFamiliarId;

                		Usuario.find({
					where: {
						listaFamiliarId: idLista
					}
				},
				function(err, arrayUsuarios) {
					if (err) callback(err);
						
					//borramos la solicitud
					usuariologeado.solicitudes.remove(objetoUsuarioLogeado.listaFamiliarId, function(err) {
						if (err) callback(err);
						callback(null, arrayUsuarios);
					})
				}
			);
		})
            
    };
    
};
