const db = require('../database/connection').db

//crio e exporto a função register para registro de usuários
exports.register = (req, res, next)=>{
 
    const{name,email,password,password2} = req.body
    
    db.query('SELECT email_usuario FROM usuario WHERE email_usuario = ?',[email], async(erro,results)=>{
        if(erro){
            console.log(erro)
        }
        if(results.length > 0) {
            return res.render('register',{
                ret: true,
                message:'O e-mail ja está em uso'
            })           
        }else if( password !== password2){
            return res.render('register',{
                ret: true,
                message: 'Password nao corresponde!'
            })
        } else{
            
           let hashPassword = await bcrypt.hash(password, 8)
           console.log(hashPassword)

           db.query('insert into usuario set ?', {name_usuario: name, email_usuario:email, senha_usuario:hashPassword}, (error, results)=>{
               if(error){
                   console.log('Erro ao incluir os dados', error)
               }else{
                   console.log(results)                   
                    return res.render('register',{
                        ret: true,
                        message: 'Usuário cadastrado com sucesso!'
                    })
               }
           })
        }
    })    
}

//crio e exporto a função logout para validação de usuário
exports.logout = async (req, res)=>{
    const token = ''
    const cookieOptions = {
        maxAge: -1, // 24 hours
        httpOnly: true
    }
    res.cookie('jwt', token, cookieOptions);
    res.redirect('/') 
}