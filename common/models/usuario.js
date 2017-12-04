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
        var listafamiliar = Usuario.app.models.ListaFamiliar;

        //obtengo el id del usuario autenticado 
        var idUsuario = contexto.req.accessToken.userId
        var usuarioSolicitante = this;
//callback(new Error("rrrrrrrrrrrrrrrrrrrr"));

        // necesito obtener el id de lista familiar atraves del id de usuaio autenticado 
        Usuario.findById(idUsuario, function (err, objetoUsuarioLogeado) {
            if (err)
                callback(err);
            //} else {
            var idLista = objetoUsuarioLogeado.listaFamiliarId;

            //accedo al modelo lista con el (idLista) para obtener una instancia completa del modelo de la lista
            listafamiliar.findById(idLista, function (err, listacompleta) {
                if (err)
                    callback(err);

                //atraves de los datos k tengo de la lista completa accedo al modelo  solicitudes  y busco el objeto completo de del usuario obtenido del modelo listaFamiliar
                // y lo guardo en ObjetoUsuarioSolicitante
                listacompleta.solicitudes.findById(usuarioSolicitante.id, function (err, ObjetoUsuarioSolicitante) {
                    if (err)
                        callback(new Error("no existe relacion del usuario co la lista"));
                        console.log(ObjetoUsuarioSolicitante);
                        console.log(idLista);
                        //asigno el id de lista del autenticado al slicitante
                        ObjetoUsuarioSolicitante.listaFamiliarId = idLista;


                    //guardo los cambios del usuarioSolicitante actualizado
                    ObjetoUsuarioSolicitante.save();

                    //borramos la solicitud
                    listacompleta.solicitudes.remove(ObjetoUsuarioSolicitante, function (err) {
                        //hacemos un find de los usuarios con el mismo idListaFamiliar del autenticado y devolvemos el array
                        Usuario.find({
                            where: {
                                listaFamiliarId: idLista
                            }
                        },
                                function (err, arrayUsuarios) {
                                    if (err)callback(err);

                                    callback(null, arrayUsuarios);

                                }
                        );
                    });

                });

            });


        });

    };



};
