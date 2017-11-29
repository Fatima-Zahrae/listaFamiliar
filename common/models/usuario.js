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
        var usuarioSolicitante = this;

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
                                        
					// Saber si El solicitante ha realizado alguna solicitud a la lista del usuarioAutenticado()
					usuarioSolicitante.solicitudes.findById(objetoUsuarioLogeado.listaFamiliarId, function(err, listaFamiliar) {
                                            
						// Si no se encuentra la relación entre el usuario solicitante y la listafamiliar devuelve un error 
						if (err) callback(err);

						// asociar la listaFamiliar del autenticado al solicitante
						usuarioSolicitante.listaFamiliarId = objetoUsuarioLogeado.listaFamiliarId;

						// Guardamos los cambios del usuarioSolicitante
						usuarioSolicitante.save(function(err, usuarioSolicitante) {
							
							// Añadimos al usuario al array de usuarios de la listaFamiliar para devolverlo posteriormente
							arrayUsuarios.push(usuarioSolicitante);

							if (err) callback(err);

							//borramos la solicitud
							usuarioSolicitante.solicitudes.remove(listaFamiliar, function(err) {
								if (err) callback(err);
								callback(null, arrayUsuarios);
							})
						})
                                        })
				}
			);
		})
            
    };
    
};
