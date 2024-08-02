document.addEventListener('DOMContentLoaded', () => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cotação', 'Osc', 'Maxima52', 'Minima52', '90', 'Entrada', 'Dist ent', 'Mi38060', 'Min100420', 'Min30120', 'Min536', 'Max380600', 'Max100420', 'Max30120', 'Max536'],
            datasets: [{
                label: 'Valores',
                data: [], // Os dados serão substituídos aqui
                backgroundColor: 'rgba(0, 0, 128, 0.2)',
                borderColor: 'rgba(0, 0, 128, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const apiUrl = 'https://script.google.com/macros/s/AKfycbzECZ_kCWWoYdLZsvnWdeoJl7WOtjkPa5oxN-ReDXX90y_9kvuiFt7mhiNl19RUf5g/exec';

    // Função para buscar e exibir dados da API
    function fetchData(selectedOption) {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados recebidos da API:', data);
                
                // Filtrar os dados para o ativo selecionado
                const selectedData = data.output.find(item => item.Ativos === selectedOption);
                if (selectedData) {
                    displayData(selectedData);
                } else {
                    console.error(`Dados para o ativo ${selectedOption} não encontrados.`);
                }
            })
            .catch(error => {
                console.error('Houve um problema com a requisição fetch: ', error);
            });
    }

    // Adicionando evento para quando o valor do select mudar
    const selectElement = document.getElementById('dynamic-select');
    selectElement.addEventListener('change', () => {
        const selectedOption = selectElement.value;
        fetchData(selectedOption);
    });

    // Chamar fetchData com a primeira opção ao carregar a página
    fetchData(selectElement.value);

    function displayData(data) {
        // Extrair os valores da resposta da API e converter para números
        const apiValues = [
            convertToNumber(data.cotacao),
            convertToNumber(data.osc),
            convertToNumber(data.maxima52),
            convertToNumber(data.minima52),
            convertToNumber(data['90']),
            convertToNumber(data.entrada),
            convertToNumber(data['dist ent']),
            convertToNumber(data.mi38060),
            convertToNumber(data.min100420),
            convertToNumber(data.min30120),
            convertToNumber(data.min536),
            convertToNumber(data.max380600),
            convertToNumber(data.max100420),
            convertToNumber(data.max30120),
            convertToNumber(data.max536)
        ];

        console.log('Valores extraídos e convertidos:', apiValues);

        // Verificar se todos os valores foram convertidos corretamente
        apiValues.forEach((value, index) => {
            if (isNaN(value)) {
                console.error(`Valor na posição ${index} não é um número:`, value);
            }
        });

        // Atualizar os dados do gráfico
        if (myChart) {
            myChart.data.datasets[0].data = apiValues;
            myChart.update();
            console.log('Dados do gráfico atualizados:', myChart.data.datasets[0].data);
        } else {
            console.error('Gráfico não inicializado corretamente.');
        }

        // Atualizar os valores nos elementos <p>
        document.getElementById('cotacao').textContent = data.cotacao;
        document.getElementById('osc').textContent = data.osc;
        document.getElementById('maxima52').textContent = data.maxima52;
        document.getElementById('minima52').textContent = data.minima52;
        document.getElementById('90').textContent = data['90'];
        document.getElementById('entrada').textContent = data.entrada;
        document.getElementById('dist-ent').textContent = data['dist ent'];
        document.getElementById('mi38060').textContent = data.mi38060;
        document.getElementById('min100420').textContent = data.min100420;
        document.getElementById('min30120').textContent = data.min30120;
        document.getElementById('min536').textContent = data.min536;
        document.getElementById('max380600').textContent = data.max380600;
        document.getElementById('max100420').textContent = data.max100420;
        document.getElementById('max30120').textContent = data.max30120;
        document.getElementById('max536').textContent = data.max536;
    }

    function convertToNumber(value) {
        // Função auxiliar para converter valores para números
        if (typeof value === 'string' || typeof value === 'number') {
            return Number(value);
        } else {
            return NaN;
        }
    }
});