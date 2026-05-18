const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Configuração do EJS como engine de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota Principal
app.get('/', (req, res) => {
    // Dados dos integrantes
    const time = [
        { nome: 'Giovanna Morais', cargo: 'Desenvolvedor', foto: '/images/giovanna.jpg' },
        { nome: 'Guilherme Mendes', cargo: 'Desenvolvedor', foto: '/images/guilherme.jpg' },
        { nome: 'Mayra Costa', cargo: 'Desenvolvedor', foto: '/images/mayra.jpg' },
        { nome: 'Roberta Costa', cargo: 'Desenvolvedor', foto: '/images/roberta.jpg' }
    ];
    res.render('index', { time });
});

app.post('/contato', (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    console.log(`Nova mensagem de ${nome} (${email}): ${mensagem}`);
    
    res.redirect('/?sucesso=true');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});