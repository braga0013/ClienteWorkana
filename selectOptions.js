document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('dynamic-select');
    const apiUrl = 'https://script.google.com/macros/s/AKfycbzECZ_kCWWoYdLZsvnWdeoJl7WOtjkPa5oxN-ReDXX90y_9kvuiFt7mhiNl19RUf5g/exec';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Log dos dados recebidos
            if (data.output && Array.isArray(data.output)) {
                data.output.forEach(item => {
                    if (item.Ativos) { // Verifica se a propriedade "Ativos" existe
                        const option = document.createElement('option');
                        option.value = item.Ativos;
                        option.text = item.Ativos;
                        selectElement.appendChild(option);
                    }
                });

                // Mostra o conteúdo principal do site após os itens do select serem carregados
                document.getElementById('main-content').style.display = 'block';
            } else {
                console.error('Formato de dados inesperado:', data);
            }
        })
        .catch(error => {
            console.error('Houve um problema com a requisição fetch: ', error);
        });
});