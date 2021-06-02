
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const db = require('../database/connection').db;

//função para validação do usuário e envio do token de acesso
exports.login = async (req, res)=>{
    try {    
        const{email,password} = req.body
        if(!email || !password){            
            return res.status(400).render('login', {
                ret: true,
                message:'Informe seu usuário e sua senha'
            })
        }            
            db.query('select * from usuario where email_usuario = ?',[email], async (error, results)=>{
                if(results.length !== 1){
                    console.log(results.length)
                    res.status(401).render('login', {
                        ret:true,
                        message: 'Usuário não existe na base de dados'
                    })
                }else if(!results || !(await bcrypt.compare(password, results[0].senha_usuario))){
                    res.status(401).render('login', {
                        ret:true,
                        message: 'Usuário ou senha incorreto'
                    })                    
                }else{
                    const id = results[0].id_usuario;
                    const token = jwt.sign({userId: id}, process.env.JWT_SECRET, {
                        expiresIn: 1 * 60 * 60 * 12  
                    })
                    
                    const cookieOptions = {
                        maxAge: 12 * 60 * 60 * 1000, // 24 hours
                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookieOptions);
                    res.redirect('/pages/home') 
                   
                }
            })

    } catch (error) {
        console.log(error)
    }    
}
