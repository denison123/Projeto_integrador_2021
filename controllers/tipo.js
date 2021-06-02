
const db = require('../database/connection').db;
let message = ''

exports.listatipo = async(req, res)=>{
    try {
        db.query('SELECT * FROM tipo', async(erro, results)=>{
            if(erro){
                console.log(erro)
            }
            if(results.length < 1) {
                return res.render('tipo',{
                    ret: false,
                    message:'Nenhum registro encontrado'
                })           
            }else{                                   
                    res.render('tipo',{
                    tipo : results,
                    ret: true,
                    message: message                    
                })                  
                message=''  
            }
        })  
    } catch (error) {
        
    }
}

exports.add = async (req, res)=>{   
    try {    
        const{desc} = req.body        
        if(!desc){            
            return res.status(400).render('tipo', {
                ret: true,
                message:'Não foi possivel cadastrar tipo, dados incompletos'
            })
        }            
        db.query('insert into tipo set ?', {des_tipo: desc, status_tipo: 'A'}, (error, results)=>{
            if(error){
                console.log('Erro ao incluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados incluído com sucesso!'
                return res.redirect('/pages/tipo')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}

exports.delete = async (req, res)=>{
//    console.log(req.params.id)
    try {    
        let id = req.params.id      
        if(!id){            
            return res.status(400).render('tipo', {
                ret: true,
                message:'Não foi possivel excluir tipo, dados incompletos'
            })
        }            
        db.query('delete from tipo where id_tipo = ?', [id] , (error, results)=>{
            if(error){
                console.log('Erro ao excluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados excluído com sucesso!'
                return res.redirect('/pages/tipo')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}
