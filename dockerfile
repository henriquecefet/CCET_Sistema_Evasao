# Use uma imagem base do Python
FROM python:3.12.7

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY . .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta 5000 (ou outra usada pela aplicação Flask)
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["python", "app.py"]
