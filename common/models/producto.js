'use strict';

module.exports = function(Producto) {
    /**
 * metodo de limpiar lista
 * @param {object} contexto contexto
 * @param {Function(Error, array)} callback
 */

Producto.limpiarLista = function(contexto, callback) {
  
  //temgo el id del usuario autenticado
  var IdAutenticado = contexto.req.accessToken.userId;
  
  //accedo al modelo de productos a traves de productos
  var Usuario = Producto.app.models.Usuario;
 
  //hago in find de Ususarios para poder tener una instancia de usuarioCompleto
    Usuario.findById(IdAutenticado ,function(err , usuarioCompleto){
        if(err)callback(err);
        console.info(usuarioCompleto);
        //tengo el IdListaFamiliar del autenticado
        var IdlistaAuten = usuarioCompleto.listaFamiliarId;
        
            Producto.updateAll({listaFamiliarId:IdlistaAuten}, {comprar:false},function(err , numeroProdActuali){
                if(err)callback(err);
  
               
                Producto.find({
                            where: {
                                listaFamiliarId: IdlistaAuten
                            }
                        },
                                function (err, arrayProductos) {
                                    console.log(arrayProductos);
                                    if (err)callback(err);
                                    callback(null, arrayProductos);

                                }
                        );
            });
    });
};


};
