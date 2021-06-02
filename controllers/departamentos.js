
const db = require('../database/connection').db;
let message = ''

exports.listdepartamentos = async(req, res)=>{
    try {
        db.query('SELECT * FROM departamentos', async(erro, results)=>{
            if(erro){
                console.log(erro)
            }
            if(results.length < 1) {
                return res.render('departamentos',{
                    ret: false,
                    message:'Nenhum registro encontrado'
                })           
            }else{                                   
                    res.render('departamentos',{
                    departamento : results,
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
            return res.status(400).render('departamentos', {
                ret: true,
                message:'Não foi possivel cadastrar departamento, dados incompletos'
            })
        }            
        db.query('insert into departamentos set ?', {desc_departamento: desc, status_departamento: 'A'}, (error, results)=>{
            if(error){
                console.log('Erro ao incluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados incluído com sucesso!'
                return res.redirect('/pages/departamentos')                                                       
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
            return res.status(400).render('departamentos', {
                ret: true,
                message:'Não foi possivel excluir departamento, dados incompletos'
            })
        }            
        db.query('delete from departamentos where id_departamento = ?', [id] , (error, results)=>{
            if(error){
                console.log('Erro ao excluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados excluído com sucesso!'
                return res.redirect('/pages/departamentos')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}
