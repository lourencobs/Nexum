const apiKey = 'b09a0e601410cdd3d11050e8';  // Insira sua chave de API aqui
const url = `https://api.exchangerate-api.com/v4/latest/USD`;
let taxaDolar = 0;
let grafico; // Variável para armazenar o gráfico
let modoVisualizacao = 'mensal'; // Modo inicial

function atualizarCotacao() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            taxaDolar = data.rates.BRL;
            document.getElementById('cotacao-dolar').innerText = `R$ ${taxaDolar.toFixed(2)}`;
            document.getElementById('ultima-atualizacao').innerText = `Última atualização: ${data.date}`;
            atualizarGrafico();
        })
        .catch(error => console.error('Erro ao buscar a cotação:', error));
}

function atualizarGrafico() {
    const ctx = document.getElementById('graficoCotacao').getContext('2d');
    const labels = modoVisualizacao === 'mensal' ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] : ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const valores = modoVisualizacao === 'mensal' 
        ? [5.20, 5.30, 5.10, 5.40, 5.25, 5.15, 5.35, 5.50, 5.45, 5.60, 5.55, 5.70] // Dados mensais
        : [5.25, 5.30, 5.10, 5.40, 5.20, 5.35, 5.50]; // Dados semanais simulados

    // Se o gráfico já existir, destrua-o antes de criar um novo
    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cotação do Dólar (BRL)',
                data: valores,
                backgroundColor: '#28a745',
                borderColor: '#155724',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor em R$'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: modoVisualizacao === 'mensal' ? 'Meses' : 'Dias da Semana'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });
}

// Funções de conversão
function converterDolarParaReal() {
    const quantidadeDolar = parseFloat(document.getElementById('quantidade-dolar').value);
    if (!isNaN(quantidadeDolar) && quantidadeDolar > 0) {
        const resultado = quantidadeDolar * taxaDolar;
        document.getElementById('resultado-texto').innerText = `R$ ${resultado.toFixed(2)}`;
    } else {
        document.getElementById('resultado-texto').innerText = 'Digite uma quantidade válida de dólares.';
    }
}

function converterRealParaDolar() {
    const quantidadeReal = parseFloat(document.getElementById('quantidade-real').value);
    if (!isNaN(quantidadeReal) && quantidadeReal > 0) {
        const resultado = quantidadeReal / taxaDolar;
        document.getElementById('resultado-texto').innerText = `${resultado.toFixed(2)} USD`;
    } else {
        document.getElementById('resultado-texto').innerText = 'Digite uma quantidade válida de reais.';
    }
}

document.getElementById('converter-dolar').addEventListener('click', converterDolarParaReal);
document.getElementById('converter-real').addEventListener('click', converterRealParaDolar);

// Adicionar eventos para alternar a visualização
document.getElementById('view-mensal').addEventListener('click', () => {
    modoVisualizacao = 'mensal';
    document.getElementById('view-mensal').classList.add('active');
    document.getElementById('view-semanal').classList.remove('active');
    atualizarGrafico();
});

document.getElementById('view-semanal').addEventListener('click', () => {
    modoVisualizacao = 'semana';
    document.getElementById('view-semanal').classList.add('active');
    document.getElementById('view-mensal').classList.remove('active');
    atualizarGrafico();
});

// Atualiza a cotação ao carregar
atualizarCotacao();
setInterval(atualizarCotacao, 3600000); // Atualiza a cada 1 hora





