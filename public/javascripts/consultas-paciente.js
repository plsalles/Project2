const html = document.querySelector('.container-consultas-middle-section');
const userId = html.getAttribute('user');
const role = html.getAttribute('role');
console.log(html)
console.log(userId)
console.log(role)
let htmlConsultaRealizar = `
  <tr class="table-title">
  <td>Data</td>
  <td>Hora</td>
  <td>Médico</td>
  <td>Descrição</td>
  <td>Exames</td>
  <td>Status</td>
</tr>
`;

let htmlConsultaRealizadas = `
  <tr class="table-title">
  <td>Data</td>
  <td>Hora</td>
  <td>Médico</td>
  <td>Descrição</td>
  <td>Exames</td>
  <td>Status</td>
</tr>
`;



axios.get(`http://localhost:3000/consultas/realizar?_id=${userId}&role=${role}`)
.then(data => {
  const tabela = document.getElementById('inicio-tableta-consultas-realizar');
  const consultasRealizar = data.data;

  consultasRealizar.forEach(element => {
    const dateTime = element.date.split('T'); 
    const date = dateTime[0];
    const time = dateTime[1].split(':00.')[0];
    console.log(time)
    const arrayDate = [];
      date.split('-').forEach(e => {
        arrayDate.unshift(e);
    });

    element.date = arrayDate.join('-');
    element.hora = time;
    htmlConsultaRealizar +=`
      <tr class="consultasRealizar" id="${element._id}" >
        <td>${element.date}</td>
        <td>${element.hora}</td>
        <td>${element.medico.name}</td>
        <td>${element.descricao}</td>
        <td>${element.exames}</td>
        <td>${element.status}</td>
      </tr>
    `
    ;

    tabela.innerHTML= htmlConsultaRealizar;
  });
})
.catch(error => console.log(error));


axios.get(`http://localhost:3000/consultas/realizadas?_id=${userId}&role=${role}`)
      .then(data => {
        const tabela = document.getElementById('inicio-tableta-consultas-realizadas');
        const consultasRealizadas = data.data;

        consultasRealizadas.forEach(element => {
          const dateTime = element.date.split('T'); 
          const date = dateTime[0];
          const time = dateTime[1].split(':00.')[0];
          console.log(time)
          const arrayDate = [];
            date.split('-').forEach(e => {
              arrayDate.unshift(e);
          });

          element.date = arrayDate.join('-');
          element.hora = time;
          htmlConsultaRealizadas +=`
            <tr class="consultasRealizadas" id="${element._id}" >
              <td>${element.date}</td>
              <td>${element.hora}</td>
              <td>${element.medico.name}</td>
              <td>${element.descricao}</td>
              <td>${element.exames}</td>
              <td>${element.status}</td>
            </tr>
          `
          ;

          tabela.innerHTML= htmlConsultaRealizadas;
        });
      })
      .catch(error => console.log(error));
         



/*

consultasRealizar.forEach(element => {
const date = element.date.split('T')[0];
const time = element.date.split(':00.')[1];
const arrayDate = [];
date[0].split('-').forEach(e => {
  arrayDate.unshift(e);
});
    
element.date = arrayDate.join('-');
element.hora = time[0];
});


consultasRealizadas.forEach(element => {
const date = element.date.split('T');
const time = date[1].split(':00.');
  element.date = date[0];
  element.hora = time[0];
});




*/
