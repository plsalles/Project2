const html = document.querySelector('.container-consultas-middle-section');
const userId = html.getAttribute('user');
const role = html.getAttribute('role');
console.log(html)
console.log(userId)
console.log(role)

axios.get(`http://localhost:3000/consultas/realizar?_id=${userId}&role=${role}`)
                  .then(data => {
                    const consultasRealizar = data.data;
                    console.log(consultasRealizar)
                  })
                  .catch(error => console.log(error));


axios.get(`http://localhost:3000/consultas/realizadas?_id=${userId}&role=${role}`)
                  .then(data => {
                    const consultasRealizadas = data.data;
                    console.log(consultasRealizadas);
                  })
                  .catch(error => console.log(error));
         



/*

consultasRealizar.forEach(element => {
const date = element.date.split('T');
const time = date[1].split(':00.');
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
