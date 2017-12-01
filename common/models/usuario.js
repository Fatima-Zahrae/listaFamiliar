'use strict';

module.exports = function (Usuario) {
    



    /**
     * este es ek¡l metodo para rechazar la solicitud del usuario solicitante
     * @param {object} context contexto
     * @param {Function(Error, object)} callback
     */

    Usuario.prototype.rechazarSolicitud = function (context, callback) {
        var arraydeUsuarios;
        var IdAutenticado = context.req.access.Token;

        callback(null, arraydeUsuarios);
    };

};
