# IronMedic Portal

The IronMedic Portal is the system which the patient can manage their medical records, have access to their doctor appointments, exams and agenda. The doctor also has access to the system and also to its patient medical records.

## Acknowledgments

This project would not be possible without the help of our Ironhack Teacher and TA's. Our many thanks to them. 

## Getting Started

Initially, to access the portal we first need to create an user. The initial botton SignUp takes the user to the SignUp page to create a user.

When create the user, we need to provide the following info:

* Name, username, email, address, cpf(for patient), crm (for doctors), personal doctors (for patients, optional)
* username, cpf, crm must be unique

* Link to access the portal => [HERE](https://portal-ironmedic.herokuapp.com/).

## Prerequisites

No hardware prerequisites needed. 

## Introduction to the Portal

Most of us may have more than one doctors and when we need to get the information about each Dr. Appointments or Diagnostics done by different Doctors, it is not an easy task, we need to talk to each Doctor, ask for the medical records for each doctor. 
The portal is here to help you, giving you the access to your medical records.

## IronMedic Portal

After the patient/doctor create an user, they are able to login to our Portal. Once the are logged in, they Portal brings them the following features:

* Assign a personal Doctor. Once a patient assign a doctor to its account, they will be able to see all appointments with that Doctor and also the appt will be populated in the Agenda.
* Patient and Doctor are able to create new appointment to their respective Patient/Doctor.
* Patient/Doctor is able to edit and cancel the appointment.
* Only Doctor is able to finalize the Appointment, including its notes/diagnostic of the appointment. Once an appointment is finalized, no one will be able to edit it.
* Patients are able to edit the information, password, add or remove a doctor in their profile in the Data page. 
* Doctors are able to edit the information, password, but are not able to add/remove patients yet (Application Improvements third item)


## Coding Improvements

During the project we decided to use some framewworks to improve the usability of the Portal. In this case, you can find the following frameworks in our Portal: CepPromise (Populate the address autommatically after the user fill the Zip Code), moment, node, Express, bcrypt, passport, cors and mongoose.

### Application Improvements

* Change the FrontEnd language from Portuguese to English
* Implement token protection to the API routes
* Add the feature add/remove patient to the Doctors 
* Add the feature to upload any time of exam (images, videos...) to the appointment and also to the patient profile
* Work with Relation DB, to improve performance in the scenario where we have a lot of records in the database.


### CODE IMPROVEMENTS/BUGS

* Implement partials in some HBS views to minimize the number of views
* Refactory the CSS Style for some pages, adjust the style code and make easy to understand
* Fix the issue in the agenda when opened in a Ultra Wide Monitor, it got stuck in the 14:00 and does not show the rest



## Contributing

Please feel free to fork/clone this repo to look deeper into this Application. we plan to bring the improvements listed in the Application Improvements section soon.

## Author & Version Control

* **Developed by Joao Juliatti and Paulo Salles** - *IronMedic Portal 1.0* - **Published in May-2nd of 2020**
