'use strict';
// con el before hacemos k el id de la lista familiar aparezca en la tabla usuario
module.exports = function (ListaFamiliar) {
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
        Usuario.findById(listafamiliarInstancia.context.req.accessToken.userId, function (err, usuario) { //es lo mismo k poner listafamiliarInstancia.owner 
            if (err) {
                next(err);
            } else {
                //Asignar en listaFamiliarId de usuario el id que recogimos al principio
                usuario.listaFamiliarId = idLista;
                //Guardarlo en la Base de Datos
                usuario.save(function (err, usuario) {
                    if (err)
                        next(err);
                    next();
                });
            }
        });

    });

    /**
     * metodo remoto para crear las solicitudes
     * @param {object} context el argumento del context
     * @param {Function(Error, object)} callback
     */

    ListaFamiliar.prototype.solicitar = function (contexto, callback) {
        //var Usuario = ListaFamiliar.app.models.Usuario;
        //var UsuarioAutenti = Usuario.id;
        var Usuario = ListaFamiliar.app.models.Usuario;
        
        var solicitud;
        var Milista = this; //Milista tenemos el objeto , una instancia de la listafamiliar
        console.log(Milista);

        //el id del usuario lo cogo del acces token 
        var IdUsuario = contexto.req.accessToken.userId; 

        Usuario.findById(IdUsuario, function (err, usuariologeado) { //en usuario logeado tiene un objeto de Usuario , es decir una unstancia
            if (err) {
               callback(err);
            } else {
                Milista.solicitudes.add(usuariologeado,
                        function (err, datosAmostrar) {
                            if (err)
                                callback(err);
                            
                            solicitud = datosAmostrar; // lo datos que metemos en solicitud lo mtemos en y y lo mostrmos en solicitud 
                           callback(null, solicitud);
                           
                           /*solicitud = {
                               listaFamiliarID = this.id; mirar la otra forma
                           }*/
                           
                        });
                        
                
                        
            }
        });



       

        //al terminar hago in post de usuario y un login y despues acl a lista familiar

    };
};

//para comprobar hacemos un post en listafamiliar
