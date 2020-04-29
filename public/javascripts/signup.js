
window.addEventListener('load', () => {
  document.getElementById('medico-sign-up-buttom').addEventListener('click', function (event) {
    const formContainer = document.getElementById('addition-inputs');
    formContainer.innerHTML = `
      <input type="text" name="role" value="MEDICO" style="display:none">
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
      <input type="text" name="role" value="PACIENTE" style="display:none">
      </div>
        <div>
          <label for="cpf">CPF</label><br>
          <input type="text" name="cpf" placeholder="Digite seu CPF">
        </div>
      </div>
        <h3>Médico de confiança (opcional)</h3>
        <input type="text" id="medico-name" name="medico" placeholder="Digite o nome do médico de confiança">
        <button id="procura-medico" type="button">Procurar Médico</button>
        <p id="msg-procura-medico" style='color:red'></p>
        <div id ="medico-select-div"></div>
      </div>
      <div>
      <button  type="submit">Finalizar Cadastro</button>
      </div>`
      document.getElementById('procura-medico').addEventListener('click', async function (event) {
        const medicoNameTag = document.getElementById('medico-name')
        const medicoName = medicoNameTag.value
        const msgProcuraMedico = document.getElementById('msg-procura-medico')
        msgProcuraMedico.innerText = ''
        try{
        if(medicoName===''){
          msgProcuraMedico.innerText = 'Digite o nome de um médico para continuar'
        }
        else if(medicoName.length>=30){
          msgProcuraMedico.innerText = 'Nome invalido, por favor tente novamente'
        }
        else{
          medicos = (await axios.post(`http://localhost:3000/api/medico`,{name:medicoName})).data
          const medicoSelectDiv = document.getElementById('medico-select-div')
          if(medicos.length===0) msgProcuraMedico.innerText = 'Médico não encontrado'
          else{
            let medicoSelect = ''
            for(let i=0;i<medicos.length;i++){
              console.log(medicos[i])
              medicoSelect = medicoSelect+`<option value="${medicos[i]._id}">${medicos[i].name},${medicos[i].especializacao}</option>`
            }
            medicoSelectDiv.innerHTML = `
              <select name="medicoPessoalId">
              ${medicoSelect}
              </select>`
          }
  
        }
      }catch (error) {
        msgProcuraMedico.innerText = 'Médico não encontrado'
      }
    })

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
        msgCep.innerText = 'Médico não encontrado'
      }
    }
  })

});