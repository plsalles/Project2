const html = document.querySelector('.container-agenda-middle-section');
const userId = html.getAttribute('user');
const role = html.getAttribute('role');
const week = html.getAttribute('week');

window.addEventListener('load', async () => {
  let weekInteger = parseInt(week)
  await calendarGenerator({week :weekInteger})
  document.getElementById('next-week').addEventListener('click', async function (event) {
    const week = html.getAttribute('week');
    weekInteger = parseInt(week)+1
    html.setAttribute('week',weekInteger.toString())
    await calendarGenerator({week:weekInteger})
  })
  document.getElementById('previous-week').addEventListener('click', async function (event) {
    const week = html.getAttribute('week');
    weekInteger = parseInt(week)-1
    html.setAttribute('week',weekInteger.toString())
    await calendarGenerator({week:weekInteger})
  })

});

const  calendarGenerator = async ({week}) =>{
  const formContainer = document.getElementsByClassName('wrapper')[0];
  let now = moment().add(7*week,'days')
  const weekDay = now.day()
  if(weekDay===0) weekDay=1
  else if(weekDay===6) weekDay=5
  const beginDate = now.subtract(weekDay,'days')
  now = moment()


  const daysWeek =['mon','tue','wed','thu','fri']

  let tempDiv =`<div>Horarios</div>\n`
  let tempDate 
  const consultasAgendas= {}
  for(let j =0;j<daysWeek.length;j++){
    tempDate = beginDate.add(1,'days')
    consultasAgendas[daysWeek[j]] = (await axios.post(`http://localhost:3000/api/agenda`,{
      userId,
      role,
      date:tempDate.format('YYYY-MM-DD'),
    })).data
    if(tempDate.format('DD-MM-YYYY')===now.format('DD-MM-YYYY')){
      tempDiv =tempDiv +`<div class="today">${daysWeek[j]}\n${tempDate.date()}
      </div>\n`
    }else{
      tempDiv =tempDiv +`<div>${daysWeek[j]}\n${tempDate.date()}
      </div>\n`
    }
  }


  const month = {
    '1':'Janeiro',
    '2':'Fevereiro',
    '3':'Março',
    '4':'Abril',
    '5':'Maio',
    '6':'Junho',
    '7':'Julho',
    '8':'Agosto',
    '9':'Setembro',
    '10':'Outubro',
    '11':'Novembro',
    '12':'Dezembro',
  }



tempDiv = tempDiv +`<div>${month[beginDate.month()]}</div>\n`

  let horariosAgendados = {}
  for(let weekDay in consultasAgendas){
    horariosAgendados[weekDay] = consultasAgendas[weekDay].map(consulta=>moment(consulta.date).add(3,"hours").format('HH'))
  }
  let calendarHeader = `
  <div class="calendar__header">
  ${tempDiv}  
  </div>
  `

  const horarios =[`08`,`09`,`10`,`11`,`12`,'13',`14`,`15`,`16`,`17`,`18`]
  const calenderHours = []
  for(let i = 0 ; i<horarios.length;i++){
    let calenderHoursTemp =''
    let tempDiv2=`<div class="horarios">${horarios[i]}:00</div>\n`
    for(let j=0;j<daysWeek.length;j++){
      const elementHour = horariosAgendados[daysWeek[j]].indexOf(horarios[i])
      if(elementHour>=0){
        let consulta =  consultasAgendas[daysWeek[j]][elementHour]
        if(role==='MEDICO'){
          const paciente =(await axios.get(`http://localhost:3000/api/paciente/${consulta.paciente}`)).data
          tempDiv2 =tempDiv2 +`<div class="calendar__day day consulta">
          nome:${paciente.name}</br>
          descricao:${consulta.descricao}
          </div>\n`
        }else if(role==='PACIENTE'){
          const medico =(await axios.get(`http://localhost:3000/api/medico/${consulta.medico}`)).data
          tempDiv2 =tempDiv2 +`<div class="calendar__day day consulta">
          nome:${medico.name}</br>
          especializacao:${medico.especializacao}</br>
          descrição:${consulta.descricao}
          </div>\n`
        }

      }else{
        tempDiv2 =tempDiv2 +`<div class="calendar__day day">
        </div>\n`
      } 

    }
    calenderHoursTemp = calenderHoursTemp + `
    <div class="calendar__week">
    ${tempDiv2}  
    </div>`
    calenderHours.push(calenderHoursTemp)
  } 

  
  formContainer.innerHTML = `
  ${calendarHeader}
  ${calenderHours.join('')}
  `

}
