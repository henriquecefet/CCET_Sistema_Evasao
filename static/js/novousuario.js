new Vue({
    el: '#app',
    data: {
        nu_novaSenha: '',
        nu_confirmaSenha: '',
        nu_email: ''
    },
    methods: {
        submitForm() {
        if (this.novaSenha !== this.confirmaSenha) {
          alert("As senhas precisam ser iguais");
          return;
        }

        axios.post('/criar_novo_usuario', {
          nu_nova_senha: this.nu_novaSenha,
          nu_confirma_senha: this.nu_confirmaSenha,
          nu_email: this.nu_email
        })
        .then(response => {
          if (response.data.success) {
            alert('Usuário criado com sucesso!');
          } else {
            alert('Erro ao criar usuário: ' + response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
          alert('Erro ao criar usuário.');
        });
      }
    }
  });