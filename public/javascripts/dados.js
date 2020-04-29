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