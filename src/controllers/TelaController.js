import Tela from '../models/Tela';

class TelaController{

    async index(req, res){
        const { grupoTela = null, tipo = null} = req.query;
        
        let telas;
        if (grupoTela){
            if (tipo) {
                telas = await Tela.find({ grupoTela, tipo });
            } else {
                telas = await Tela.find({ grupoTela });
            }
        } else {
            telas = await Tela.find();
        }
        console.log("GET realizado com sucesso.")
        return res.json(telas);
    }

    async store(req, res){
        try {
            const { tipo } = req.body;
            if (tipo === 'dialogo' || tipo === 'final') {}
            else if (tipo === 'exemplo') {
                if (!req.body.exemplo) {
                    console.log("Atributo 'exemplo' não foi informado na tela 'exemplo'");
                    return res.status(400).json({ error: "Atributo 'exemplo' é obrigatório para tela de tipo 'exemplo'" });
                }
            } else if (tipo === 'terminal') {
                if (!req.body.resposta || !req.body.desafio) {
                    console.log("Atributo 'resposta' e 'desafio' não foram informados na tela de tipo'exemplo'");
                    return res.status(400).json({ error: "Atributo 'resposta' e 'desafio' são obrigatórios para tela de tipo 'terminal'"});
                }
            } else {
                console.log("Atributo 'tipo' não foi passado.");
                return res.status(400).json({ error: "Atributo 'tipo' precisa ser uma string entre 'dialogo', 'exemplo', 'terminal' e 'final'"})
            }

            const { grupoTela, titulo = '', descricao = [], imagem = [] } = req.body;
            
            const atributosObrigatorios = ["grupoTela", "tipo", "titulo", "descricao", "imagem"];
            const naoObrigatorios = ["exemplo", "desafio", "resposta"];
            const erros = [];
            for (const atributo in req.body) {
                if (atributosObrigatorios.filter(elemento => elemento == atributo).length != 1
                && !(naoObrigatorios.includes(atributo))) {
                    erros.push(atributo);
                }
            }
            if (erros.length > 0) {
                console.log(`Atributos ${erros} não localzados`);
                return res.status(400).json({
                    error: `Os campos ${erros.join(', ')} não corresponderam aos atributos obrigatórios.`,
                    atributosObrigatorios
                });
            }
            const find = await Tela.find({grupoTela, tipo});
            if (find.length > 0) {
                console.log("Tela já foi cadastrada.")
                return res.status(400).json({error: "Essa tela já foi inserida"});
            }
            const insercao = {
                grupoTela,
                tipo,
                imagem
            };

            if (tipo === 'dialogo' || tipo === 'exemplo') {
                insercao.titulo = titulo;
                insercao.descricao = descricao;
            }
            else if (tipo === 'terminal') {
                insercao.desafio = req.body.desafio;
                insercao.resposta = req.body.resposta;
            }
            if (tipo === 'exemplo') {
                insercao.exemplo = req.body.exemplo;
            }
            const tela = await Tela.create(insercao);
            console.log("POST realizado com sucesso.");
            return res.json({ tela });
        } catch (e) {
            console.log("Atributo com tipagem errada.")
            return res.status(400).json({ error: "Atributo com tipagem errada passado"});
        }
    }
}

export default new TelaController();