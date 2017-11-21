'use strict';

module.exports = function(Listafamiliar) {
    //hacemos k el usuario q haga el post de lista familiar sera el owner
        Listafamiliar.beforeRemote('create', function (context, listaFamiliar, next) {
          context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    
    /*Listafamiliar.afterRemote('find', function (context, listaFamiliar, next) {
          var 
        next();
    });*/
    
};
