
const db = require('../database/connection').db;
let message = ''


exports.listaempresas = async(req, res)=>{
    try {
        db.query('SELECT * FROM empresas', async(erro, results)=>{
            if(erro){
                console.log(erro)
            }
            if(results.length < 1) {
                return res.render('empresas',{
                    ret: false,
                    message:'Nenhum registro encontrado'
                })           
            }else{                                   
                    res.render('empresas',{
                    empresas : results,
                    ret: true,
                    message: message                    
                })                  
                message=''  
            }
        })  
    } catch (error) {
        
    }
}

//função para validação do usuário e envio do token de acesso
exports.add = async (req, res)=>{
    try {    
        const{razao,cnpj} = req.body        
        if(!razao || !cnpj){            
            return res.status(400).render('empresas', {
                ret: true,
                message:'Não foi possivel cadastrar empresa, dados incompletos'
            })
        }            
        db.query('insert into empresas set ?', {razsoc_empresa: razao, cnpj_empresa:cnpj}, (error, results)=>{
            if(error){
                console.log('Erro ao incluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados incluído com sucesso!'
                return res.redirect('/pages/empresas')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}

//função para validação do usuário e envio do token de acesso
exports.edit = async (req, res)=>{
    //console.log(req.body)
    try {    
        const{razao,cnpj, id} = req.body        
        if(!razao || !cnpj){            
            return res.status(400).render('empresas', {
                ret: true,
                message:'Não foi possivel cadastrar empresa, dados incompletos'
            })
        }            
        db.query('update empresas set  ?  where id_empresa = ?', [{razsoc_empresa: razao, cnpj_empresa:cnpj}, id] , (error, results)=>{
            if(error){
                console.log('Erro ao incluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados alterado com sucesso!'
                return res.redirect('/pages/empresas')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}


//função para validação do usuário e envio do token de acesso
exports.delete = async (req, res)=>{
//    console.log(req.params.id)
    try {    
        let id = req.params.id      
        if(!id){            
            return res.status(400).render('empresas', {
                ret: true,
                message:'Não foi possivel cadastrar empresa, dados incompletos'
            })
        }            
        db.query('delete from empresas where id_empresa = ?', [id] , (error, results)=>{
            if(error){
                console.log('Erro ao excluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados excluído com sucesso!'
                return res.redirect('/pages/empresas')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}
