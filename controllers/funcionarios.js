
const db = require('../database/connection').db;
let message = ''

exports.listafuncionarios = async(req, res)=>{
    try {
        const consultaEmpresas = async()=>{
            db.query('SELECT * FROM empresas', async(erro, results)=>{
                if(erro){
                    console.log(erro)
                }
                if(results.length > 0) {
                    consultaFuncionarios(results)
                }
            })  
        }
        // const consultaDepartamento = async(empresa)=>{
        //     db.query('SELECT * FROM departamentos', async(erro, results)=>{
        //         if(erro){
        //             console.log(erro)
        //         }
        //         if(results.length > 0) {
        //             consultaCargos(empresa,results)
        //         }
        //     })  
        // }
        // const consultaCargos = async(empresa, departamento)=>{
        //     db.query('SELECT * FROM cargos', async(erro, results)=>{
        //         if(erro){
        //             console.log(erro)
        //         }
        //         if(results.length > 0) {
        //             consultaFuncionarios(empresa, departamento ,results)
        //         }
        //     })  
        // }
        const consultaFuncionarios = async(empresa)=>{
            db.query('SELECT * FROM funcionarios', async(erro, results)=>{
                if(erro){
                    console.log(erro)
                }
                if(results.length < 1) {
                    return res.render('funcionarios',{
                        ret: false,
                        message:'Nenhum registro encontrado'
                    })           
                }else{                                   
                        res.render('funcionarios',{
                        funcionarios : results,
                        empresas: empresa,
                        ret: true,
                        message: message                    
                    })                  
                    message=''  
                }
            })  
         }

         consultaEmpresas()
    } catch (error) {
        
    }
}

exports.add = async (req, res)=>{   
    try {    
        const{nome, cpf, idcargo, idempresa, iddepartamento} = req.body        
        if(!desc){            
            return res.status(400).render('funcionarios', {
                ret: true,
                message:'Não foi possivel cadastrar funcionarios, dados incompletos'
            })
        }            
        db.query('insert into funcionarios set ?', {
            nome_funcionario: nome, 
            cpf_funcionario: cpf, 
            id_cargo: idcargo, 
            id_empresa: idempresa, 
            id_departamento: iddepartamento,
            status_funcionario: 'A'}, (error, results)=>{
            if(error){
                console.log('Erro ao incluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados incluído com sucesso!'
                return res.redirect('/pages/funcionarios')                                                       
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
            return res.status(400).render('funcionarios', {
                ret: true,
                message:'Não foi possivel excluir funcionarios, dados incompletos'
            })
        }            
        db.query('delete from funcionarios where id_funcionario = ?', [id] , (error, results)=>{
            if(error){
                console.log('Erro ao excluir os dados', error)
            }else{
                console.log(results)                   
                message = 'Dados excluído com sucesso!'
                return res.redirect('/pages/funcionarios')                                                       
            }
        })
    } catch (error) {
        console.log(error)
    }    
}
