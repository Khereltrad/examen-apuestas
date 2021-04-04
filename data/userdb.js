const { hasMany,belongsTo } = require('sequelize');
const Sequelize = require('sequelize');
const sql = new Sequelize('apuestas', 'root','Mirune.1812#265464', { host: 'localhost', dialect: 'mysql'});

const TbUsuario = sql.define('Usuarios',{
   id:         {type: Sequelize.INTEGER ,primaryKey: true,autoIncrement:true},
   fullname:   {type: Sequelize.STRING,allowNull:false,validate:{notNull:{msg:'Debe ingresar un Nombre'},len:{args:[3],msg:'El largo del nombre debe ser de al menos 3 digitos'}}},
   rol:        {type: Sequelize.STRING,allowNull:false,defaultValue:"Normal"},
   email:      {type: Sequelize.STRING,allowNull:false,unique:true,validate:{notNull:{msg:'Debe ingresar un Email'},len:{args:[6],msg:'El largo del correo debe ser de al menos 6 digitos'},isEmail:{msg:'Favor revise si el correo este bien escrito'}}},
   password:   {type: Sequelize.STRING,allowNull:false,validate:{notNull:{msg:'Debe ingresar una Contraseña'},len:{args:[6],msg:'El largo de la contraseña  debe ser de al menos 6 digitos'}}}         
},{ timestramps: true });

const TbPujas = sql.define('Apuestas',{
   id:          {type: Sequelize.INTEGER ,primaryKey: true,autoIncrement:true},
   product:     {type: Sequelize.STRING ,allowNull:false,validate:{notNull:{msg:'Falta ingresar el producto'},len:{args:[1]}}},
   amount:      {type: Sequelize.INTEGER,allowNull:false,validate:{notNull:{msg:'Falta ingresar la puja'},len:{args:[1]}}},
   // name:        {type: Sequelize.STRING,allowNull:false,validate:{notNull:{msg:'Debe ingresar un Nombre'},len:{args:[3],msg:'El largo del nombre debe ser de al menos 3 digitos'}}},
},{ timestramps: true });

TbUsuario.hasMany(TbPujas)
TbPujas.belongsTo(TbUsuario)

sql.sync().then(() =>{console.log('***** Tablas sincronizada');});
module.exports = { TbUsuario,TbPujas};
