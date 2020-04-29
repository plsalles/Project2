const html = document.querySelector('.container-consultas-middle-section');
const userId = html.getAttribute('user');
const role = html.getAttribute('role');

let htmlConsultaRealizar = `
`;

let htmlConsultaRealizadas = `
`;



axios.get(`http://localhost:3000/api/consultas/realizar?_id=${userId}&role=${role}`)
.then(data => {
  const tabela = document.getElementById('inicio-tableta-consultas-realizar');
  const consultasRealizar = data.data;
  
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
              <a class="links-consulta-realizar" href="/consultas/editar/realizar/${element._id}">Editar</a>
              <a class="links-consulta-realizar" href="/consultas/deletar/realizar/${element._id}">Deletar</a>
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
            <a class="links-consulta-realizar" href="/consultas/editar/realizar/${element._id}">Editar</a>
            <a class="links-consulta-realizar" href="/consultas/deletar/realizar/${element._id}">Cancelar</a>
            <a class="links-consulta-realizar" href="/consultas/finalizar/realizar/${element._id}">Finalizar</a>
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
                  <button class="consulta-botao-detalhes-mais" type="submit" id="ata-${element._id}">
                    <img src="/images/plus-square-solid.svg" alt="Detalhes">
                  </button>
                </td>
              </tr>
              <tr class="consulta-ata" id="detalhes-ata-${element._id}" hidden><td colspan="6"><span>ATA CONSULTA:</span> ${element.ata}</td></tr>
              
            `
            ;
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
                <button class="consulta-botao-detalhes-mais" type="submit" id="ata-${element._id}">
                  <img src="/images/plus-square-solid.svg" alt="Detalhes">
                </button>
              </td>
            </tr >
            <tr class="consulta-ata" id="detalhes-ata-${element._id}" hidden><td colspan="6"><span>ATA CONSULTA:</span> ${element.ata}</td></tr> 
          `
          ;
          
          tabela.innerHTML= htmlConsultaRealizadas;
       
      }
     

      });

      document.querySelectorAll('.consulta-botao-detalhes-mais').forEach(e => {
        e.addEventListener('click', () => {
          console.log(e);
          const id = e.id.split('ata-')[1];
          const idAta = `detalhes-ata-${id}`;
          document.getElementById(idAta).toggleAttribute('hidden');
          document.getElementById(e.id).classList.toggle('consulta-botao-detalhes-menos');


          
                
          })






        })
      
      

      })
      .catch(error => console.log(error));

      
     
       
          
          
          
            
        
      
 
         




