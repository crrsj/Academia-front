  function salvarNoBanco() {
    // Obtém todos os elementos de input do tipo radio com name="gender"
    var radioButtons = document.getElementsByName('sexo');
  
    // Itera sobre os botões de rádio para encontrar o selecionado
    var selectedGroup1;
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        selectedGroup1 = radioButtons[i].value;
        break;
      }
    }
  
    // Verifica se um botão de rádio foi selecionado
    if (selectedGroup1) {
      // Aqui você pode enviar o valor para o backend e salvar no banco de dados
      console.log('Valor selecionado: ' + selectedGroup1);
      // Adicione sua lógica para salvar no banco de dados aqui
    } else {
      alert('Selecione uma opção de gênero');
      }
   
   }
        const form = document.getElementById('form');
    
        form.addEventListener('submit',event =>{
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        fetch('http://localhost:8080/aluno/cadastro',{
         method:'POST',
         headers:{
            'content-Type': 'application/json'
         },
         body: JSON.stringify(data)
        }).then(res => res.json()).then(data => console.log(data))
        alert('Formulário válido. Enviando...');
        fetchDataAndPopulateTable();
    })
    
   
    
        
        async function deletarRegistro(id) {
          try {
            // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
            const response = await fetch(`http://localhost:8080/aluno/deletar/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                // Adicione cabeçalhos adicionais, se necessário
              },
            });
    
            if (response.ok) {
              console.log(`Registro com ID ${id} deletado com sucesso.`);
              // Atualiza a tabela após a exclusão
              fetchDataAndPopulateTable();
            } else {
              console.error('Erro ao deletar registro:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao deletar registro:', error);
          }
        }


        async function fetchAndFillForm() {
          const idInput = document.getElementById('id');
          const nomeInput = document.getElementById('nome');
          const sobrenomeInput = document.getElementById('sobrenome');
          const cpfInput = document.getElementById('cpf');
          const dataNascInput = document.getElementById('dataNasc');
          const emailInput = document.getElementById('email');
          const celularInput = document.getElementById('celular');
          const dataMensInput = document.getElementById('dataMens');
          const valorMensalidade = document.getElementById('valorMensalidade');
          const statusInput = document.getElementById('status');  
          idInput.value = prompt( 'Por favor, insira um ID de usuário válido.');      
          const id =  idInput.value
          
        /*  if (!id) {
            
            return;
          }
         */
          try {              
           

            const response = await fetch(`http://localhost:8080/aluno/buscar/${id}`);
            
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
        
            // Parsear a resposta como JSON
            const userData = await response.json();
        
            //  Preencher o formulário com os dados do usuário
           
            idInput.value = userData.id;            
            nomeInput.value = userData.nome;
            sobrenomeInput.value = userData.sobrenome;
            cpfInput.value = userData.cpf;
            dataNascInput.value = userData.dataNasc;
            emailInput.value = userData.email;
            celularInput.value = userData.celular;
            dataMensInput.value = userData.dataMens;
            valorMensalidade.value = userData.valorMensalidade;
            statusInput.value = userData.status;
          } catch (error) {
            console.error(`Erro durante a busca e preenchimento do formulário: ${error.message}`);
          }
        }
    
          // Função para atualizar um registro
        /*  async function atualizarRegistro(id) { 
          try {
      // Implemente a lógica para obter os novos dados do registro a ser atualizado
         const novoid = id;
         const novoNome = prompt('Digite o novo nome:');
         const novoSobrenome = prompt('Digite o novo sobrenome:');
         const novoEmail = prompt('Digite o novo email:');
         const novoFone = prompt('Digite o novo telefone:');
         const vencimento = prompt('Digite a nova data de vencimento:');
         const mensalidade = prompt('Digite o novo valor da mensalidade:');
         const novoStatus = prompt('Digite o novo status:');
      
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API para atualizar 
         const response = await fetch(`http://localhost:8080/aluno/atualiza` , {
         method: 'PUT', // ou 'PATCH' dependendo da sua API
         headers: {
          'Content-Type': 'application/json',
          
          // Adicione cabeçalhos adicionais, se necessário
        },   
         
        body: JSON.stringify({ id:novoid ,nome:novoNome}),
        body: JSON.stringify({ id:novoid ,sobrenome:novoSobrenome}),
        body: JSON.stringify({ id:novoid ,email:novoEmail}),
        body: JSON.stringify({ id:novoid ,celular:novoFone}),
        body: JSON.stringify({ id:novoid ,dataMens:vencimento}),
        body: JSON.stringify({ id:novoid ,valorMensalidade:mensalidade}),
        body: JSON.stringify({ id:novoid ,status:novoStatus}),
      });

      if (response.ok) {
        console.log(`Registro com ID ${id} atualizado com sucesso.`);
        // Atualiza a tabela após a atualização
        fetchDataAndPopulateTable();
      } else {
        console.error('Erro ao atualizar registro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
    }
  }
  */
 
  async function updateUserData() {    
    const idInput = document.getElementById('id');
    const nomeInput = document.getElementById('nome');
    const sobrenomeInput = document.getElementById('sobrenome');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const celularInput = document.getElementById('celular');
    const dataMensInput = document.getElementById('dataMens');
    const valorMensalidade = document.getElementById('valorMensalidade');
    const statusInput = document.getElementById('status');     
      
    const updateId =  idInput.value
    const updateNome = nomeInput.value 
    const updateSobrenome = sobrenomeInput.value
    const updateCpf = cpfInput.value 
    const updateEmail = emailInput.value 
    const updateCelular = celularInput.value 
    const updateDataMens = dataMensInput.value
    const updateValorMensalidade = valorMensalidade.value 
    const updateStatus = statusInput.value 
  
    try {
      const response = await fetch(`http://localhost:8080/aluno/atualiza`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,
          nome: updateNome,
          sobrenome: updateSobrenome,
          cpf: updateCpf,
          email: updateEmail,
          celular: updateCelular,
          dataMens: updateDataMens,
          valorMensalidade: updateValorMensalidade,
          status: updateStatus
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Dados do usuário atualizados com sucesso!');
      fetchDataAndPopulateTable();
      limparCampos();
    } catch (error) {
      console.error(`Erro durante a atualização dos dados: ${error.message}`);
    }
  }
     
         
            // Função para buscar dados da API e preencher a tabela
            async function fetchDataAndPopulateTable() {
              try {
                // Substitua 'URL_DA_SUA_API' pela URL real da sua API
                const response = await fetch( 'http://localhost:8080/aluno/busca');
                const data = await response.json();
        
                // Limpa a tabela antes de inserir novos dados
                const tbody = document.querySelector('#tabela tbody');
                tbody.innerHTML = '';
        
                // Preenche a tabela com os dados recebidos da API
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.sobrenome}</td>
                    <td>${item.email}</td>
                    <td>${item.celular}</td>
                    <td>${item.dataMens}</td>
                    <td>${item.valorMensalidade}</td>
                    <td>${item.status}</td>                    
                    <td><button  class="btn btn-success"  onclick="deletarRegistro(${item.id})">Excluir</button></td>`;
                    
                  tbody.appendChild(row);
                });
              } catch (error) {
                console.error('Erro ao buscar e preencher dados:', error);
              }
            }
            document.addEventListener('DOMContentLoaded', () => {
            // Chama a função para buscar e preencher os dados quando a página carrega
             fetchDataAndPopulateTable();
          });


          function validarFormulario() {
            // Obtenha os valores dos campos
            const nome = document.getElementById('nome').value.trim();
            const sobrenome = document.getElementById('sobrenome').value.trim();
            const email = document.getElementById('email').value.trim();
            const celular = document.getElementById('celular').value.trim();
            const dataMens = document.getElementById('dataMens').value.trim();
            const valorMensalidade = document.getElementById('valorMensalidade').value.trim();
            const status = document.getElementById('status').value.trim();
            
        
            // Validação simples: Verifica se os campos obrigatórios estão preenchidos
            if (nome === ''|| sobrenome === '' || email === '' || celular === '' 
            || dataMens === '' || valorMensalidade === '' || status === '') {
              alert('Por favor, preencha todos os campos obrigatórios.');
              return false; // Impede o envio do formulário
            }
        
            // Pode adicionar lógica de validação adicional aqui, como verificar o formato do email, etc.
        
            // Se a validação passou, o formulário pode ser enviado
            alert('Formulário válido. Enviando...');
            return true;
          }
           
          function limparCampos() {
            // Obtém os elementos de input e textarea do formulário
            const inputs = document.querySelectorAll('input, textarea');
        
            // Itera sobre os elementos e define o valor para uma string vazia
            inputs.forEach(input => {
              input.value = '';
            });
          }