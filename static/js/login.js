new Vue({
    el: '#app',
    data: {
        formData: {
            email: '',
            senha: ''
        }
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:5000/login', this.formData)
                .then(response => {
                    // Redireciona para a página inicial em caso de sucesso
                    window.location.href = 'http://localhost:5000/index';
                })
                .catch(error => {
                    if (error.response) {
                        // Exibe a mensagem de erro
                        alert(error.response.data.message);
                    } else {
                        alert('Erro ao tentar fazer login. Por favor, tente novamente.');
                    }
                });
        }
    }
});
