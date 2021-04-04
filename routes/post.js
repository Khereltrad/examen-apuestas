const { Router } = require('express');
const { TbUsuario, TbPujas} = require('../data/userdb');
const session = require("express-session");
const bcrypt = require('bcrypt');
const flash =  require('connect-flash');
const router = Router();

router
.post('/datosregistro', async (req, res) => { 

   try {
      const password_encrypted = await bcrypt.hash(req.body.password, 10);
      
      const usuario = await TbUsuario.findAndCountAll();
      let rol_usuario = "USUARIO";
      if(usuario.count==0){ rol_usuario="ADMIN"};
      const user = await TbUsuario.create({     
         fullname: req.body.name,
         rol: rol_usuario,
         email: req.body.email,
         password: password_encrypted
      });
   } 
   catch(err) {  // En el caso de algún error, guardamos los errores en "errors", y redirigimos al formulario
      console.log(err);
      // for (var key in err.errors) { req.flash('errors', err.errors[key].message);}
      return res.redirect('/');
   }
   res.redirect('/');
})
.post('/datosloging', async (req, res) => {

   const errors   =  req.flash("errors");
   const mensajes =  req.flash("mensaje");

   const user = await TbUsuario.findOne({where: {email: req.body.email}});
   if (user == null) {
      console.log('Intento de loging con datos errados -EM');
      req.flash('errors', 'Usuario inexistente o contraseña incorrecta');
      return res.redirect('/');      
   }

   let isCorrect = await bcrypt.compare(req.body.password, user.password);
   if (isCorrect == false) {
      console.log('Intento de loging con datos errados -PW');
      req.flash('errors', 'Usuario inexistente o contraseña incorrecta');
      return res.redirect('/');
   }
   req.session.user = user;
   console.log(`Logeo exitoso del `+user.rol+` `+user.fullname);
   res.redirect('/main');
 })
.post('/newbid', async (req,res) =>{

   try {
      const errors   =  req.flash("errors");
      const mensajes =  req.flash("mensaje");

      const new_bid = await TbPujas.create({
         product     :  req.body.product,
         amount      :  req.body.amount,   
         UsuarioId   : req.session.user.id,
      });
      console.log('Se ha generado una puja');
   } 
   catch(err) {
      console.log(err);
      // for (var key in err.errors) { req.flash('errors', err.errors[key].message);}
      return res.redirect('/main');
   }
   res.redirect('/main');
})

module.exports = router;