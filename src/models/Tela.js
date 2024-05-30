import { Schema, model } from 'mongoose';

const Tela = new Schema({
    grupoTela: String,
    tipo: String,
    titulo: String,
    descricao: Array,
    imagem: String,
    exemplo: Array,
    desafio: Array,
    resposta: String
})

export default model('Tela', Tela);