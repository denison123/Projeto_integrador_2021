
const db = require('../database/connection').db;
let message = ''


exports.listamarcas = async(req, res)=>{
    try {
        db.query('SELECT * FROM marcas', async(erro, results)=>{
            if(erro){
                console.log(erro)
            }
            if(results.length < 1) {
                return res.render('marcas',{
                    ret: false,
                    message:'Nenhum registro encontrado'
                })           
            }else{                                   
                    res.render('marcas',{
                    marca : results,
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
            return res.status(400).render('empresas', {
                ret: true,
                message:'Não foi possivel cadastrar marca, dados incompletos'
            })
        }            
        db.query('insert into marcas set ?', {desc_marca: desc, status_marca: 'A'}, (error, results)=>{
            if(error){
                console.log('Erro ao incluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados incluído com sucesso!'
                return res.redirect('/pages/marcas')                                                       
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
            return res.status(400).render('marcas', {
                ret: true,
                message:'Não foi possivel excluir marcas, dados incompletos'
            })
        }            
        db.query('delete from marcas where id_marca = ?', [id] , (error, results)=>{
            if(error){
                console.log('Erro ao excluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados excluído com sucesso!'
                return res.redirect('/pages/marcas')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}
