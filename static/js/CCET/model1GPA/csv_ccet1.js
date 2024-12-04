document.getElementById('processButton').addEventListener('click', processCSV);

async function processCSV() {
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('progressBar');

    if (!fileInput.files.length) {
        alert('Por favor, primeiro, carregue um arquivo CSV.');
        return;
    }

    // Exibir a barra de progresso
    progressBar.style.display = 'block';
    progressBar.value = 0;

    const file = fileInput.files[0];
    Papa.parse(file, {
        header: true,
        complete: async function(results) {
            const data = results.data;
            const totalRows = data.length;

            const updatedData = await Promise.all(
                data.map(async (row, index) => {
                    try {
                        const response = await fetch('http://localhost:5000/ccet/model1GPA/predict', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                CR_ATUAL: row.CR_ATUAL,
                                GPA1: row.GPA1,
                                ingresso_atual: row.ingresso_atual,
                                IsTheyBusinessperson: row.IsTheyBusinessperson,
                                Categoria: row.Categoria,
                                SEXO: row.SEXO,
                                employee_student: row.employee_student,
                                NOME_CURSO: row.NOME_CURSO,
                                matricula: row.MATR_ALUNO,
                                bolsista: row.bolsista,
                            }),
                        });
                        const prediction = await response.json();
                        if (prediction.prediction === 1) {
                            prediction.prediction = "Provavelmente vai se formar";
                        } else if (prediction.prediction === 0) {
                            prediction.prediction = "Provavelmente vai evadir";
                        } else {
                            console.log("Unexpected response from server");
                        }
                        // Atualizar a barra de progresso
                        progressBar.value = ((index + 1) / totalRows) * 100;
                        return { ...row, Prediction: prediction.prediction };
                    } catch (error) {
                        console.error('Error during fetch:', error);
                        return { ...row, Prediction: 'Error' };
                    }
                })
            );

            // Ocultar a barra de progresso
            progressBar.style.display = 'none';

            generateNewCSV(updatedData);
        },
    });
}

function generateNewCSV(data) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.style.display = 'block';
    downloadLink.download = 'predicted_data.csv';
    downloadLink.textContent = 'Download New CSV';
}
