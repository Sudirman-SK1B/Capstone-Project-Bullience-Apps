const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const db = require('./db')
const bycrypt = require('bcrypt')
const saltRounds = 10
const gensalt = bycrypt.genSaltSync(saltRounds)
const jwt = require('jsonwebtoken')
const isAuthorized = require('./auth')


app.use(express.json())

app.post('/register',(request, response)=> {
    const {username, email, password, confirmasiPassword} = request.body;
    if (!username || !email || !password || !confirmasiPassword){
        return response.status(400).json({
            message: "Harap isi bidang yang diperlukan"
        })
    }
    if (password !== confirmasiPassword){
        return response.status(400).json({
            message:"Password yang anda masukan tidak sesuai"
        })
    }
    const queryEmail = "SELECT * FROM db_user WHERE email = ?";
    db.query(queryEmail,[email], (err, result)=> {
        if (err) throw err;
        if (result.length > 0) {
            return response.status(400).json({
               message:"Email sudah didaftarkan" 
            })
        }
        const query ="INSERT INTO db_user (username, email, password) VALUES (?,?,?)";
        db.query(query,[username, email, bycrypt.hashSync(password, saltRounds)], (err, result)=> {
            if (err) throw err;
            return response.status(201).json({
                message:"Akun berhasil didaftarkan"
            })

        })
    })
})

app.post('/login', (request, response) => {
    const {email, password} = request.body;
    const Cek_Email = "SELECT * FROM db_user WHERE email = ?";
    db.query(Cek_Email, [email], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return response.status(400).json({
                message: "Email belum terdaftar"
            })
        }
        const Cek_Password = bycrypt.compareSync(password, result[0].password);
        if (!Cek_Password){
            return response.status(400).json({
                message:"Password yang anda masukan salah"
            })
        }
        const token = jwt.sign({
            id: result[0].id,
            email: result[0].email
        }, 'secret', { expiresIn: '1d'})
        return response.status(200).json({
            message:"Anda berhasil login",
            token
        })
    })
})

app.get('/getuser', (request, response)=> {
    const query = "SELECT * FROM db_user";
    db.query(query, (err, result) => {
        if (err) throw err;
        return response.status(200).json({
            data : result
        })
    })

})

app.get('/profile', isAuthorized, (request,response) => {
    return response.status(200).json({
        user: request.user
    })
})

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected')
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

