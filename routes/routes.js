const { Router } = require('express');
const router = Router();
const {checkLogin,checkAdmin} = require('../js/middlewares/middles');
const { TbUsuario,TbPujas} = require('../data/userdb');
// , TbPreguntas, TbResultado

router
.get('/',  async (req, res) => { res.render('loging.ejs'); })
.get('/register',  async (req, res) => { res.render('register.ejs'); })
.get('/logout', async (req, res) => { req.session.user = null; res.redirect('/'); })   
.get('/main',checkLogin,  async (req, res) => { 
   console.log('***** Ingresa a Main'); 
   const usuarios = await TbUsuario.findAll();
   const max3mansi   = await TbPujas.findAll({where:{product:'Mansion'}, order:[['amount','desc']],limit:3});
   const max3islas   = await TbPujas.findAll({where:{product:'Isla'}, order:[['amount','desc']],limit:3});
   const max3diamn   = await TbPujas.findAll({where:{product:'Diamante'}, order:[['amount','desc']],limit:3});
   
   let diamante1 = ""; let diamante2 = ""; let diamante3 = "";
   let mansion1 = ""; let mansion2 = ""; let mansion3 = "";
   let Isla1 = ""; let Isla2 = ""; let Isla3 = "";

   if (max3diamn.length > 0) {
       diamante1 = `${usuarios[max3diamn[0].UsuarioId-1].fullname} : $${max3diamn[0].amount}`;
      if (max3diamn.length > 1){
         diamante2 = `${usuarios[max3diamn[1].UsuarioId-1].fullname} : $${max3diamn[1].amount}`;
         if (max3diamn.length > 2){
            diamante3 = `${usuarios[max3diamn[2].UsuarioId-1].fullname} : $${max3diamn[2].amount}`;
         }
      }
   }
   
   if (max3islas.length > 0) {
      isla1 = `${usuarios[max3islas[0].UsuarioId-1].fullname} : $${max3islas[0].amount}`;
      if (max3islas.length > 1){
         isla2 = `${usuarios[max3islas[1].UsuarioId-1].fullname} : $${max3islas[1].amount}`;
            if (max3islas.length > 2){
               isla3 = `${usuarios[max3islas[2].UsuarioId-1].fullname} : $${max3islas[2].amount}`;
            }
      }
   }

   if (max3mansi.length > 0) {
      mansion1 = `${usuarios[max3mansi[0].UsuarioId-1].fullname} : $${max3mansi[0].amount}`;
      if (max3mansi.length > 1){
         mansion2 = `${usuarios[max3mansi[1].UsuarioId-1].fullname} : $${max3mansi[1].amount}`;
         if (max3mansi.length > 2){
            mansion3 = `${usuarios[max3mansi[2].UsuarioId-1].fullname} : $${max3mansi[2].amount}`;
         }
      }
   }


   res.render('main.ejs',{usuarios,max3mansi,max3islas,max3diamn,diamante1, diamante2, diamante3,isla1,isla2,isla3,mansion1,mansion2,mansion3});
})
.get('/result',checkLogin,  async (req, res) => { 
   console.log('***** Ingresa a Resultados'); 
   const usuarios    = await TbUsuario.findAll();
   const maxmansions = await TbPujas.findOne({where:{product:'Mansion'}, order:[['amount','desc']],limit:1});
   const maxislas    = await TbPujas.findOne({where:{product:'Isla'}, order:[['amount','desc']],limit:1});
   const maxdiamons  = await TbPujas.findOne({where:{product:'Diamante'}, order:[['amount','desc']],limit:1});
   res.render('result.ejs',{usuarios,maxmansions,maxislas,maxdiamons});
})


//* ruta de testeo
router.get('/testeo', async (req, res) => { console.log('***** Ingresa a testear'); const user= req.session.user; const preguntas = await TbPreguntas.findAll(); res.render('testeo.ejs',{preguntas});});

module.exports = router;

//1:31 mensaje alerta a 1:33