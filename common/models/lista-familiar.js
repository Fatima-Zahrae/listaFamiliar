'use strict';
// con el before hacemos k el id de la lista familiar aparezca en la tabla usuario
module.exports = function(ListaFamiliar) {
    //hacemos k el usuario q haga el post de lista familiar sera el owner
        ListaFamiliar.beforeRemote('create', function (context, listafamiliar, next) {
          context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    
    
    
// con el after hacemos k el id de la usuario aparezca en la tabla listafamiliar
    ListaFamiliar.afterRemote('find', function (context, listafamiliarInstancia, next) {
        /*var app = ListaFamiliar.app;
        var Usuario = app.models.Usuario; es lo  mismo k lo de abajo*/
             
        var Usuario = ListaFamiliar.app.models.Usuario; //modelo Ususario lo cogemos accediendo desde el modelo listafamiliar
        
        //obtener el id de la lista k se ha guardado arriba 
          var idLista = listafamiliarInstancia.id;
        
        //buscar los datos del usuario autenticado
         Usuario.findById(listafamiliarInstancia.context.req.accessToken.userId, function(err, usuario) { //es lo mismo k poner listafamiliarInstancia.owner 
                if(err){next(err);}
                else{
        //Asignar en listaFamiliarId de usuario el id que recogimos al principio
                    usuario.listaFamiliarId = idLista ;
        //Guardarlo en la Base de Datos
                    usuario.save(function(err, usuario){
                        if(err) next(err);
                        next();
                    });
                }
                });

    });
    
};

//para comprobar hacemos un post en listafamiliar
