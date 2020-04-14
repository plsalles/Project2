window.addEventListener('load', () => {
  document.getElementById('medico-sign-up-buttom').addEventListener('click', function (event) {
    console.log('TA ENTRANDO')
    const formContainer = document.getElementById('addition-inputs');
    formContainer.innerHTML = `
      <input type="text" name="role" value="MEDICO" hidden>
      <input type="text" name="crm" placeholder="Digite seu CRM">
      <div>
        <h3>Principal Endereço de endereço de atendimento</h3>
        <input type="text" name="cep" placeholder="Digite seu CEP">
        <input type="text" name="logradouro" placeholder="Digite o nome da rua">
        <input type="text" name="bairro" placeholder="Digite o nome do bairro">
        <input type="text" name="cidade" placeholder="Digite o nome do cidade">
        <select name="estado" >
          <option value="AC">AC</option>
          <option value="AL">AL</option>
          <option value="AM">AM</option>
          <option value="AP">AP</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MG">MG</option>
          <option value="MS">MS</option>
          <option value="MT">MT</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="PR">PR</option>
          <option value="RJ">RJ</option>
          <option value="RN">RN</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="RS">RS</option>
          <option value="SC">SC</option>
          <option value="SE">SE</option>
          <option value="SP">SP</option>
          <option value="TO">TO</option>
        </select>
        <input type="text" name="numero" placeholder="Digite o número do endereço">
      </div>
      <button  type="submit">Finalizar Cadastro</button>
      `
  });

  document.getElementById('paciente-sign-up-buttom').addEventListener('click', function (event) {
    const formContainer = document.getElementById('addition-inputs');
    formContainer.innerHTML = `
      <input type="text" name="role" value="PACIENTE" hidden>
      <input type="text" name="cpf" placeholder="Digite seu CPF">
      <div>
        <h3>Principal Endereço de endereço do paciente</h3>
        <input type="text" name="cep" placeholder="Digite seu CEP">
        <input type="text" name="logradouro" placeholder="Digite o nome da rua">
        <input type="text" name="bairro" placeholder="Digite o nome do bairro">
        <input type="text" name="cidade" placeholder="Digite o nome do cidade">
        <select name="estado" >
          <option value="AC">AC</option>
          <option value="AL">AL</option>
          <option value="AM">AM</option>
          <option value="AP">AP</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MG">MG</option>
          <option value="MS">MS</option>
          <option value="MT">MT</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="PR">PR</option>
          <option value="RJ">RJ</option>
          <option value="RN">RN</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="RS">RS</option>
          <option value="SC">SC</option>
          <option value="SE">SE</option>
          <option value="SP">SP</option>
          <option value="TO">TO</option>
        </select>
        <input type="text" name="numero" placeholder="Digite o número do endereço">
      </div>
      <div>
      <h3>Médico de confiança (opcional)</h3>
        <input type="text" name="medico" placeholder="Digite o nome do médico de confiança">
      </div>
      <button  type="submit">Finalizar Cadastro</button>
      `
  });
});