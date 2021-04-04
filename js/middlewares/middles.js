
                                                        //^ Funcion para chequear loging
function checkLogin(req, res, next) {
    if (req.session.user == null) {
    res.redirect('/');
    }
    res.locals.user = req.session.user;
    next();
};

function checkAdmin(req,res,next){
  
    if (req.session.user.rol == "USUARIO") {
      console.log('Usuario no Autorizado');
      return res.redirect('/main');
    } else {
      res.locals.user = req.session.user;
      console.log('Administrador logeado');
    };
    next();
  }

module.exports = { checkLogin, checkAdmin};