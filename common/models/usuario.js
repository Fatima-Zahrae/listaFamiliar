'use strict';

module.exports = function(Usuario) {
    /**
 * metodo para aceptar la solicitud
 * @param {object} idUsuarioAutenticado almacenar el objeto o instancia del id de usuario
 * @param {Function(Error, object)} callback
 */

Usuario.prototype.AceptarSolicitudes = function(contexto, callback) {
  var solicitudAprobada;
  
   // accedo al modelo de lista familiar atraves del modelo usuario.
   var ListaFamiliar = Usuario.app.models.ListaFamiliar;
   
   //obtengo el id del usuario autenticado 
   var idUsuario = contexto.req.accessToken.userId
   var usuariolosgeado = this;
   
   // necesito obtener el id de lista familiar atraves del id de usuaio autenticado 
   
           Usuario.findById(idUsuario, function (err, objetoUsuarioLogeado) { 
            if (err) {
                callback(err);
            } else {
                var idLista = objetoUsuario.listaFamiliarId;
                
                /*usuario.solicitudes.add(usuariologeado,
                        function (err, datosAmostrar) {
                            if (err)
                                callback(err);
                            
                            solicitud = datosAmostrar;  
                           callback(null, solicitud);
                           
                        });*/
            }
        });
  callback(null, solicitudAprobada);
  
  
};


};
