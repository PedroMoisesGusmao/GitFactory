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

        return res.json(telas);
    }

    async store(req, res){
        const { tipo } = req.body;
        if (tipo === 'exemplo') {
            if (!req.body.exemplo) {
                return res.status(400).json({ error: "Atributo 'exemplo' é obrigatório para tela de tipo 'exemplo'" });
            }
        } else if (tipo === 'terminal') {
            if (!req.body.terminal) {
                return res.status(400).json({ error: "Atributo 'resposta' é obrigatório para tela de tipo 'terminal'"});
            }
        }

        const { grupoTela, titulo, descricao, imagem = undefined } = req.body;
        
        const atributosObrigatorios = ["grupoTela", "tipo", "titulo", "descricao"];
        const naoObrigatorios = ["imagem", "exemplo", "desafio"];
        const erros = [];
        for (const atributo in req.body) {
            if (atributosObrigatorios.filter(elemento => elemento == atributo).length != 1
            && !(naoObrigatorios.includes(atributo))) {
                erros.push(atributo);
            }
        }
        if (erros.length > 0) {
            return res.status(400).json({
                error: `Os campos ${erros.join(', ')} não corresponderam aos atributos obrigatórios.`,
                atributosObrigatorios
            });
        }
        const find = await Tela.find({grupoTela, tipo});
        if (find.length > 0) {
            return res.status(400).json({error: "Essa tela já foi inserida"});
        }
        const insercao = {
            grupoTela,
            tipo,
            titulo,
            descricao
        };
        if (!imagem){
            insercao.imagem = imagem;
        }

        const tela = await Tela.create(insercao);
        return res.json({ tela });
    }
}

export default new TelaController();