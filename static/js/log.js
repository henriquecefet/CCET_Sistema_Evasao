// Função para criar e preencher a tabela
function populateTable(logs) {
  const tableBody = document.querySelector('#logs-table tbody');
  
  // Limpa o conteúdo anterior (se houver)
  tableBody.innerHTML = '';

  // Itera sobre os logs e insere cada um na tabela
  logs.forEach(log => {
      const row = document.createElement('tr');

      // Coluna do ID
      const idCell = document.createElement('td');
      idCell.textContent = log.idlog_predicao;
      row.appendChild(idCell);

      // Coluna do usuário
      const usuarioCell = document.createElement('td');
      usuarioCell.textContent = log.usuario;
      row.appendChild(usuarioCell);

      // Coluna da Data
      const dataCell = document.createElement('td');
      dataCell.textContent = new Date(log.data).toLocaleString();  // Formata a data
      row.appendChild(dataCell);

      // Coluna da Matricula do aluno
      const matriculaCell = document.createElement('td');
      matriculaCell.textContent = log.matricula;
      row.appendChild(matriculaCell);

       // Coluna do Curso
       const cursoCell = document.createElement('td');
       cursoCell.textContent = log.curso;
       row.appendChild(cursoCell);

      // Coluna da Predição
      const predicaoCell = document.createElement('td');
      predicaoCell.textContent = log.predicao;
      row.appendChild(predicaoCell);

      // Adiciona a linha à tabela
      tableBody.appendChild(row);
  });
}

// Função para buscar dados do endpoint
function fetchLogs() {
  fetch('http://localhost:5000/pegar_logs')
      .then(response => response.json())
      .then(data => {
          populateTable(data);
      })
      .catch(error => {
          console.error('Erro ao buscar os logs:', error);
      });
}

// Função para exportar a tabela para CSV
function exportTableToCSV(filename) {
  const rows = document.querySelectorAll('#logs-table tr');
  let csv = [];

  rows.forEach(row => {
      let rowData = [];
      row.querySelectorAll('th, td').forEach(cell => {
          rowData.push(cell.textContent);
      });
      csv.push(rowData.join(','));
  });

  // Cria o arquivo CSV
  const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Chama a função para buscar os logs quando a página carrega
document.addEventListener('DOMContentLoaded', fetchLogs);

// Adiciona o evento de clique ao botão de exportação para CSV
document.getElementById('export-csv').addEventListener('click', function () {
  exportTableToCSV('logs_predicoes.csv');
});
