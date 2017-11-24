'use strict';

module.exports = function(Usuario) {
    /**
 * metodo para aceptar la solicitud
 * @param {object} idUsuarioAut id del usuario autenticado
 * @param {Function(Error, object)} callback
 */

Usuario.prototype.aceptarSolicitud = function(idUsuarioAut, callback) {
  var solicitudAprobada;
    
  callback(null, solicitudAprobada);
};

    



};
