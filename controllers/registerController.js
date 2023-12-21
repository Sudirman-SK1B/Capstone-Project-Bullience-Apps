const bcrypt = require('bcrypt');
const saltRounds = 10;
const gensalt = bcrypt.genSaltSync(saltRounds); 
const db = require('../middleware/dbConnection');

exports.registerUser = async (req,res) =>{
    const {email,username,password,confirmasiPassword} = req.body;
    if(!email||!username||!password||!confirmasiPassword){
        return res.status(400).json({
          status:"Gagal",
          msg:"Harap isi form yang diperlukan"
        });
    }

    if(confirmasiPassword !== password){
        return res.status(400).json({
          status:"Gagal",
            message:"Password yang Anda masukan tidak cocok"
        })
    }

    const queryEmail = "SELECT * FROM db_user WHERE email=?";
    db.query(queryEmail,[email],(err,result) =>{
        if(err) throw err;
        if(result.length> 0){
            return res.status(400).json({
              status:"Gagal",
              msg:"Email yang Anda masukan sudah pernah didaftarkan"});
        }
  
        const query = "INSERT INTO db_user(email,username,password) VALUES (?,?,?)";
        db.query(query,[email,username,bcrypt.hashSync(password,saltRounds)],(err,result) =>{
            if(err) throw err;
            return res.status(201).json({
              status:"Sukses",
              msg:"Akun berhasil didaftarkan"});
        })
    })  
    
  }

  exports.getUsers = async (req, res) => {
    const query = "SELECT * FROM db_user";
    db.query(query, (err, result) => {
      if (err) throw err;
      return res.status(200).json({ result });
    });
  };
  