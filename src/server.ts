import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config"

(async () => {

    await AppDataSource.initialize()
    .catch(( error ) => {
        console.error( "Erro na hora de iniciar o DATASOURCE!", error )
    })

    const PORT = process.env.PORT || 3000  
    
    app.listen( PORT, () => {
        console.log( `SERVER FUNFANDO NA =>${ PORT }<=` )
    });
})();