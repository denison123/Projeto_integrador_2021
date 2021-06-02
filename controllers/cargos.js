
const db = require('../database/connection').db;
let message = ''

exports.listacargos = async(req, res)=>{
    try {
        db.query('SELECT * FROM cargos', async(erro, results)=>{
            if(erro){
                console.log(erro)
            }
            if(results.length < 1) {
                return res.render('cargos',{
                    ret: false,
                    message:'Nenhum registro encontrado'
                })           
            }else{                                   
                    res.render('cargos',{
                    cargo : results,
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
            return res.status(400).render('cargos', {
                ret: true,
                message:'Não foi possivel cadastrar cargo, dados incompletos'
            })
        }            
        db.query('insert into cargos set ?', {desc_cargo: desc, status_cargo: 'A'}, (error, results)=>{
            if(error){
                console.log('Erro ao incluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados incluído com sucesso!'
                return res.redirect('/pages/cargos')                                                       
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
            return res.status(400).render('cargos', {
                ret: true,
                message:'Não foi possivel excluir cargos, dados incompletos'
            })
        }            
        db.query('delete from cargos where id_cargo = ?', [id] , (error, results)=>{
            if(error){
                console.log('Erro ao excluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados excluído com sucesso!'
                return res.redirect('/pages/cargos')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}
