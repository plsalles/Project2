const element = document.querySelector('#dados-user');
console.log(element);
const userId = element.getAttribute('user');
const role = element.getAttribute('role');

axios.get(`https://portal-ironmedic.herokuapp.com/api/${role}/${userId}`)
.then(data => {
  const user = data.data;
  const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
  let estados = '';
  for(let i=0;i<states.length;i++){
    if(states[i]===user.endereco.estado){
      estados = estados+`<option value="${states[i]}" selected="selected">${states[i]}</option>`
    }else  estados = estados+`<option value="${states[i]}">${states[i]}</option>`
}

  document.getElementById('estados').innerHTML = estados;
 

})
.catch(error => console.log(error));