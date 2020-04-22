const html = document.querySelector('.container-consultas-middle-section');
const userId = html.getAttribute('user');
const role = html.getAttribute('role');
console.log(html)
console.log(userId)
console.log(role)
let htmlConsultaRealizar = `
`;

let htmlConsultaRealizadas = `
`;



axios.get(`http://localhost:3000/api/consultas/realizar?_id=${userId}&role=${role}`)
.then(data => {
  const tabela = document.getElementById('inicio-tableta-consultas-realizar');
  const consultasRealizar = data.data;
  console.log(consultasRealizar);
  if(role==='PACIENTE'){
    htmlConsultaRealizar +=`
      <tr class="table-title">
        <td>Data</td>
        <td>Hora</td>
        <td>Médico</td>
        <td>Descrição</td>
        <td>Exames</td>
        <td>Status</td>
      </tr>`;
  } else{
    htmlConsultaRealizar +=`
      <tr class="table-title">
        <td>Data</td>
        <td>Hora</td>
        <td>Paciente</td>
        <td>Descrição</td>
        <td>Exames</td>
        <td>Status</td>
      </tr>`;
  }

  if(consultasRealizar.length===0){
    tabela.innerHTML= htmlConsultaRealizar;
    return;
  } 

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
    if(role==='PACIENTE'){
          htmlConsultaRealizar+=`
          <tr class="consultasRealizar" id="${element._id}" >
            <td>${element.date}</td>
            <td>${element.hora}</td>
            <td>${element.medico.name}</td>
            <td>${element.descricao}</td>
            <td>${element.exames}</td>
            <td>
              ${element.status}
              <a href="/consultas/editar/realizar/${element._id}">Editar</a>
              <a href="/consultas/deletar/realizar/${element._id}">Deletar</a>
            </td>
    
          </tr>
        `
        ;
    
        tabela.innerHTML= htmlConsultaRealizar;
    }
    if(role==='MEDICO'){
      htmlConsultaRealizar +=`
        <tr class="consultasRealizar" id="${element._id}" >
          <td>${element.date}</td>
          <td>${element.hora}</td>
          <td>${element.paciente.name}</td>
          <td>${element.descricao}</td>
          <td>${element.exames}</td>
          <td>
            ${element.status}
            <a href="/consultas/editar/realizar/${element._id}">Editar</a>
            <a href="/consultas/deletar/realizar/${element._id}">Deletar</a>
          </td>
  
        </tr>
      `
      ;
  
      tabela.innerHTML= htmlConsultaRealizar;
  }

  });
})
.catch(error => console.log(error));


axios.get(`http://localhost:3000/api/consultas/realizadas?_id=${userId}&role=${role}`)
      .then(data => {
        const tabela = document.getElementById('inicio-tableta-consultas-realizadas');
        const consultasRealizadas = data.data;
        if(role==='PACIENTE'){
          htmlConsultaRealizadas +=`
            <tr class="table-title">
              <td>Data</td>
              <td>Hora</td>
              <td>Médico</td>
              <td>Descrição</td>
              <td>Exames</td>
              <td>Status</td>
            </tr>`;
        } else{
          htmlConsultaRealizadas +=`
            <tr class="table-title">
              <td>Data</td>
              <td>Hora</td>
              <td>Paciente</td>
              <td>Descrição</td>
              <td>Exames</td>
              <td>Status</td>
            </tr>`;
        }
        
        if(consultasRealizadas.length===0){
          tabela.innerHTML= htmlConsultaRealizadas;
          return;
        } 

        consultasRealizadas.forEach(element => {
          const dateTime = element.date.split('T'); 
          const date = dateTime[0];
          const time = dateTime[1].split(':00.')[0];
     
          const arrayDate = [];
            date.split('-').forEach(e => {
              arrayDate.unshift(e);
          });

          element.date = arrayDate.join('-');
          element.hora = time;
          
          if(role==='PACIENTE'){
            htmlConsultaRealizadas +=`
              <tr class="consultasRealizadas" id="${element._id}" >
                <td>${element.date}</td>
                <td>${element.hora}</td>
                <td>${element.medico.name}</td>
                <td>${element.descricao}</td>
                <td>${element.exames}</td>
                <td>
                  ${element.status}
                  <a href="/consultas/editar/realizadas/${element._id}">Editar</a>
                  <a href="/consultas/deletar/realizadas/${element._id}">Deletar</a>
                </td>
        
              </tr>
            `
            ;
            console.log(htmlConsultaRealizadas)
            console.log(tabela)
            tabela.innerHTML= htmlConsultaRealizadas;
        }
        if(role==='MEDICO'){
          htmlConsultaRealizadas +=`
            <tr class="consultasRealizadas" id="${element._id}" >
              <td>${element.date}</td>
              <td>${element.hora}</td>
              <td>${element.paciente.name}</td>
              <td>${element.descricao}</td>
              <td>${element.exames}</td>
              <td>
                ${element.status}
                <a href="/consultas/editar/realizadas/${element._id}">Editar</a>
                <a href="/consultas/deletar/realizadas/${element._id}">Deletar</a>
              </td>
      
            </tr>
          `
          ;
      
          tabela.innerHTML= htmlConsultaRealizadas;
      }

        });
      })
      .catch(error => console.log(error));
         




