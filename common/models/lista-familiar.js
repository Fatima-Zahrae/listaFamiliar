'use strict';

module.exports = function(Listafamiliar) {
    //hacemos k el usuario q haga el post de lista familiar sera el owner
        Listafamiliar.beforeRemote('create', function (context, listaFamiliar, next) {
          context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    
    Listafamiliar.afterRemote('find', function (context, listaFamiliar, next) {
        var app = Usuario.app;       //esta lista cual de ellas??
        var Usuario = app.models.Usuario; // models.Usuario nose de donde sale??
        
        //obtener el id de la lista k se ha guardado arriba 
          var idLista = Listafamiliar.id;
        
        //buscar los datos del usuario autenticado
            Usuario.findById({
                //context.req.accessToken.userId;
            }, function(err, rolemapping) {
                if (err) next(err);
                next();
            })
            
        //asignar al campo listafamiliarId el id de la lista que se acaba de crear
            Usuario.listaFamiliar.id = idLista;
          
        next();
    });
    
};
