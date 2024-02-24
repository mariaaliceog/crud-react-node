import { db } from "../db.js";

export const getUsers = (_,res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q,(err,data) => { // query com os parametros de consulta e uma função de callback
        if(err) return res.json(err); // se houver erro, retorna o erro

        return res.status(200).json(data); // se não houver erro, retorna 200 e os dados em json
    });
};

export const addUser = (req, res)  => {
    const q = "INSERT INTO usuarios (`nome`, `email`, `fone`, `data_nascimento`) VALUES (?)";
    
    const values = [
        req.body.nome, 
        req.body.email, 
        req.body.fone, 
        req.body.data_nascimento
    ]; // valores a serem inseridos
    
    db.query(q,[values],(err) => {
        if(err) return res.json(err); // se houver erro, retorna o erro

        return res.status(200).json("Usuário criado com sucesso!");
    });
};

export const updateUser = (req,res) => {
    const q = "UPDATE usuarios SET nome = ?, email = ?, fone = ?, data_nascimento = ? WHERE id = ?";

    const values = [
        req.body.nome, 
        req.body.email, 
        req.body.fone, 
        req.body.data_nascimento,        
    ];

    db.query(q,[...values, req.params.id],(err) => {
        if(err) return res.json(err); // se houver erro, retorna o erro

        return res.status(200).json("Usuário atualizado com sucesso!");
    });
};

export const deleteUser = (req,res) => {
    const q = "DELETE FROM usuarios WHERE id = ?";

    db.query(q,[req.params.id],(err) => {
        if(err) return res.json(err); // se houver erro, retorna o erro

        return res.status(200).json("Usuário deletado com sucesso!");
    });
};