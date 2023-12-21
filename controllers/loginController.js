const bcrypt = require('bcrypt');
const saltRounds = 10;
const gensalt = bcrypt.genSaltSync(saltRounds); 
const jwt = require('jsonwebtoken'); 
const db = require('../middleware/dbConnection');


exports.loginUser = async (req,res) =>{
    const {email,password} = req.body;

    const cekEmail = "SELECT * FROM db_user WHERE email=?";
    db.query(cekEmail,[email],(err,result) =>{
      if(err) throw err;
      if(result.length === 0){
        return res.status(400).json({
          status :"Gagal",
          msg:"Email belum terdaftar "});
      }
      const cekPassword = bcrypt.compareSync(password,result[0].password);
      if(!cekPassword){
        return res.status(400).json({
          status: "Gagal",
          msg:"Password yang Anda masukan salah"});
      }
      const token = jwt.sign({
        id: result[0].id, 
        username : result[0].username,
        email: result[0].email},'secret', { expiresIn: '1d' });

      return res.status(200).json({
        status:"Sukses",
        msg:"Login berhasil",
        token
        
      });
    })
}

exports.profile = async (req, res) => {
    return res.status(200).json({
      status:"Sukses",
      user:req.user
    });
  }


exports.editUser = async (req,res) =>{
  try {
    const {username,email} = req.body;
  if(!username||!email){
      return res.status(400).json({
        status:"Gagal",
        msg:"Username atau email yang Anda masukan tidak ditemukan"
      });
  }
  const query = "UPDATE db_user SET username=? WHERE email=?";
  db.query(query,[username,email],(err,result) =>{
      if(err) throw err;
      return res.status(201).json({
        status : "Success",
        msg:"Username berhasil di-update",
      });
  })
  } catch (error) {
    console.log(error.massages);
  }
}