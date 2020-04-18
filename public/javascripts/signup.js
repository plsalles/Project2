
window.addEventListener('load', () => {
  document.getElementById('medico-sign-up-buttom').addEventListener('click', function (event) {
    const formContainer = document.getElementById('addition-inputs');
    formContainer.innerHTML = `
      <input type="text" name="role" value="MEDICO" disabled style="display:none">
      <div>
        <div>
          <label for="crm">CRM</label><br>
          <input type="text" name="CRM" placeholder="Digite seu CRM">
        </div>
        <div>
        <label for="especializacao">Especialização</label><br>
        <input type="text" name="especializacao" placeholder="Digite a sua especialização">
        </div>
      </div>
      <div>
        <button  type="submit">Finalizar Cadastro</button>
      </div>`
  });

  document.getElementById('paciente-sign-up-buttom').addEventListener('click', function (event) {
    const formContainer = document.getElementById('addition-inputs');
    formContainer.innerHTML = `
      <input type="text" name="role" value="PACIENTE" disabled style="display:none">
      </div>
        <div>
          <label for="cpf">CPF</label><br>
          <input type="text" name="CPF" placeholder="Digite seu CPF">
        </div>
      </div>
      <h3>Médico de confiança (opcional)</h3>
        <input type="text" name="medico" placeholder="Digite o nome do médico de confiança">
      </div>
      <div>
        <button  type="submit">Finalizar Cadastro</button>
      </div>`
  })
  document.getElementById('procura-cep').addEventListener('click', async function (event) {
    const cepTag = document.getElementsByClassName('cep')[0]
    const msgCep = document.getElementById('msg-cep')
    msgCep.innerText = ''
    const cepValue = cepTag.value.split('-').join('')
    if(cepValue===''){
      msgCep.innerText = 'Digite um CEP para continuar'
    }
    else if(cepValue.length!==8){
      msgCep.innerText = 'CEP invalido, por favor tente novamente'
    }
    else{
      try {
        const cepObj = await cep(cepTag.value)
        const addressInputs = document.getElementById('address-inputs')
        const states = ["AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
        let estados = ''
        for(let i=0;i<states.length;i++){
          if(states[i]===cepObj.state){
            estados = estados+`<option value="${states[i]}" selected="selected">${states[i]}</option>`
          }else  estados = estados+`<option value="${states[i]}">${states[i]}</option>`
        }
        addressInputs.innerHTML =  `
        <div>
        <h3>Endereço</h3>
        </div>
        <div>
          <label for="logradouro">Logradouro</label><br>
          <input type="text" name="logradouro" value="${cepObj.street}" placeholder="Digite o nome da rua">
        </div>
        <div>
        <label for="numero">Numero</label><br>
        <input type="text" name="numero" placeholder="Digite o número do endereço">
       </div>
        <div>
          <label for="complemento">Complemento</label><br>
          <input type="text" name="complemento" placeholder="Digite o complemento do endereço">
        </div>
        <div>
          <label for="bairro">Bairro</label><br>
          <input type="text" name="bairro" value="${cepObj.neighborhood}" placeholder="Digite o nome do bairro">
        </div>
        <div>
          <label for="cidade">Cidade</label><br>
          <input type="text" name="cidade" value="${cepObj.city}" placeholder="Digite o nome do cidade">
        </div>
        <div>
          <label for="estado">Estado</label><br>
          <select name="estado">
          ${estados}
          </select>
        </div>
      </div>`
       
        console.log(cepObj)
      }catch (error) {
        msgCep.innerText = 'CEP não encontrado'
      }
    }
  })
});