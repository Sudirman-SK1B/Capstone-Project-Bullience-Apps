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
          msg:"Email belum terdaftar "});
      }
      const cekPassword = bcrypt.compareSync(password,result[0].password);
      if(!cekPassword){
        return res.status(400).json({
          msg:"Password yang Anda masukan salah"});
      }
      const token = jwt.sign({
        id: result[0].id, 
        email: result[0].email},'secret', { expiresIn: '1d' });

      return res.status(200).json({
        msg:"Login berhasil",
        token
        
      });
    })
}

exports.profile = async (req, res) => {
    return res.status(200).json({
      user:req.user
    });
  }


exports.editUser = async (req,res) =>{
  try {
    const {username,email} = req.body;
  if(!username||!email){
      return res.status(400).json({
        msg:"Username atau email yang Anda masukan tidak ditemukan"
      });
  }
  const query = "UPDATE db_user SET username=? WHERE email=?";
  db.query(query,[username,email],(err,result) =>{
      if(err) throw err;
      return res.status(201).json({msg:"Username berhasil di-update"});
  })
  } catch (error) {
    console.log(error.massages);
  }
}