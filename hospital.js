'use strict'
const readline = require('readline');
const fs = require('fs');

class Patient {
    constructor(component) {
        this.id = component['id']
        this.name = component['name']
        this.diagnosis = component['diagnosis']
    }
}

class Employee {
    constructor(component) {
        this.name = component['name']
        this.position = component['position']
        this.username = component['username']
        this.password = component['password']
    }
}

class Hospital {
    constructor(name, location, employees, patients) {
        this.name = name
        this.employees = employees
        this.patients = patients
        this.location = location
        this._tempUser = []
        this.view_hospital = new HospitalView()
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    home() {
        this.view_hospital.displayHome(this.name)
        this.login()
    }

    login() {
        this._rl.question(this.view_hospital.messageEnterUsername(), (answer) => {
            for (let i = 0; i < this.employees.length; i++) {
                if (this.employees[i].username == answer) {
                    this._tempUser.push({
                        name: this.employees[i].name,
                        position: this.employees[i].position,
                        password: this.employees[i].password
                    })
                    this.inputPassword(this._tempUser);
                    i += this.employees.length
                }
                if (i <= this.employees.length - 1 && this.employees[i].username != answer) { //update
                    this.view_hospital.messageIncorrectUsername()
                    i += this.employees.length
                    this.login()
                }
            }
        })
    }

    inputPassword() {
        this._rl.question(this.view_hospital.messageEnterPassword(), (answer) => {
            if (answer == this._tempUser[0].password) {
                this.welcome(this._tempUser)
            } else {
                this.view_hospital.messageIncorrectPassword()
                this.password(this._tempUser)
            }
        })
    }

    welcome(tempUser) {
        this.view_hospital.displayWelcome(tempUser.name, tempUser.position)
        this.roleMenu()
    }

    roleMenu() {
        this.view_hospital.displayListMenu()
        if (this.tempUser[0].position == 'Admin') {
            this.view_hospital.displayListMenuAdmin()
        } else if (this.tempUser[0].position == 'Doctor') {
            this.view_hospital.displayListMenuDoctor()
        } else if (this.tempUser[0].position == 'Receptionist') {
            this.view_hospital.displayListMenuReceptionist()
        } else if (this.tempUser[0].position == 'OB') {
            this.view_hospital.displayListMenuOB()
        }
        this.chooseMenu()
    }

    chooseMenu() {
        rl.question(this.view_hospital.displayListMenu(), (answer) => {
            if (answer.length > 0) {
                if (answer.split(' ' [0]) == 'list_employees') {
                    this.list_employees()
                } else if (answer.split(' ' [0]) == 'add_employee') {
                    this.add_employee()
                } else if (answer.split(' ' [0]) == 'list_patients') {
                    this.list_patients()
                } else if (answer.split(' ' [0]) == 'view_records') {
                    this.view_records(answer.split(' ' [1]))
                } else if (answer.split(' ' [0]) == 'add_record') {
                    this.add_record()
                } else if (answer.split(' ' [0]) == 'remove_record') {
                    this.remove_record()
                } else if (answer.split(' ' [0]) == 'logout') {
                    this.logout()
                }
            } else {
                this.view_hospital.messageCommandErr()
            }
        })
    }

    list_employees() {
        if (this.employees.length >= 0) {
            this.view_hospital.headerListEmployees()
            for (let i = 0; i < this.employees.length; i++) {
                this.view_hospital.displayListEmployees(i + 1, this.employees[i].name, this.employees[i].position, this.employees[i].username)
            }
        } else {
            this.view_hospital.messageListEmployeeErr()
        }
        this.roleMenu()
    }

    add_employee() {
        this._rl.question(this.view_hospital.displayAddEmployeeQues(), (answer) => {
            if (answer.length > 0) {
                let tempAnswer = answer.split(',')
                let objEmployee = {
                    name: tempAnswer[0],
                    position: tempAnswer[1],
                    username: tempAnswer[2],
                    password: tempAnswer[3]
                }
                this.employees.push(objEmployee)
                this.view_hospital.messageAddNewEmplSuccess()
                fs.writeFileSync('data_employee.json', JSON.stringify(this.employees))
                this.list_employees() // update
            } else {
                this.view_hospital.messageAddNewEmplEmpty()
                this.add_employee()
            }
        })
    }

    view_records(id_patient) {
        let index = id_patient - 1
        let dataPatient = this.patients[index]
        this.view_hospital.displayListEmployees(dataPatient.id, dataPatient.name, dataPatient.diagnosis)
        this.roleMenu()
    }

    add_record() {
        this.listPasien2()
        rl.question(this.view_hospital.displayAddRecordQues(), (answer) => {
            if (answer.length > 0) {
                let tempAnswer = answer.split(' ');
                let id_last = this.patients.length - 1
                let id_patient = this.patients[id_last].id + 1
                this.patients.push({
                    id: id_patient,
                    name: tempAnswer[0],
                    diagnosis: tempAnswer[1]
                })
                this.view_hospital.messageAddNewRecord()
                fs.writeFileSync('data_patient.json', JSON.stringify(this.patients));
                this.list_patients()
            } else {
                this.view_hospital.messageAddNewRecordEmpty()
                this.add_record()
            }
        })
    }

    list_patients() {
        if (this.patients.length > 0) {
            this.view_hospital.headerListPatients()
            for (var i = 0; i < this.patients.length; i++) {
                let data_patient = this.patients[i]
                this.view_hospital.displayListPatients(data_patient.id, data_patient.name, data_patient.diagnosis)
            }
        } else {
            this.view_hospital.messageListPatientsErr()
        }
        this.roleMenu()
    }

    remove_record(id_patient) {
        let id_deleted = [+id_patient];
        for (let i = 0; i < this.patients.length; i++) {
            if (id_deleted.indexOf(this.patients[i].id) !== -1) {
                this.patients.splice(i, 1)
            }
        }
        fs.writeFileSync('data_patient.json', JSON.stringify(this.patients))
        this.list_patients();
    }

    logout() {
        this.tempUser = [];
        this.home();
    }

}

class HospitalView {
    constructor() {

    }

    displayHome(name) {
        console.log("==================");
        console.log(`Welcome to ${name}`);
        console.log("==================");
    }

    displayWelcome(username, postion) {
        console.log("==================================");
        console.log(`Welcome, ${username}. Your access level is : ${position}`)
    }

    displayListMenu() {
        console.log("===================================");
        console.log('What would you like to do?');
        console.log('Options : ');
    }

    displayAddEmployeeQues() {
        console.log('Please input name, position, username, password (exp: uci, doctor, uci26, uci26): ');
    }

    displayAddRecordQues() {
        console.log('Please input name and diagnosis (ex: dodit flu): ');
    }

    displayListMenuAdmin() {
        console.log('== list_employee');
        console.log('== list_patients');
        console.log('== view_records <record_id>');
        console.log('== add_employee');
        console.log('== add_record');
        console.log('== remove_record <record_id>');
        console.log('== logout');
    }

    displayListMenuDoctor() {
        console.log('== list_patients');
        console.log('== view_records <record_id>');
        console.log('== logout');
    }

    displayListMenuReceptionist() {
        console.log('== list_patients');
        console.log('== view_records <record_id>');
        console.log('== add_record');
        console.log('== remove_record <record_id>');
        console.log('== logout');
    }

    displayListMenuOB() {
        console.log('== logout');
    }

    headerListEmployees() {
        console.log('=============== List Employees =================')
        console.log('id    name        position            username')
        console.log('================================================')
    }

    headerListPatients() {
        console.log('=========== List Patients ==========')
        console.log('id    name        diagnosis')
        console.log('=====================================')
    }

    displayListEmployees(id, name, position, username) {
        console.log(`${id}    ${name}      ${position}           ${username}`)
    }

    displayListPatients(id, name, diagnosis) {
        console.log(`${id}      ${name}      ${diagnosis}`)
    }

    displayListEmployees(id, name, diagnosis) {
        console.log('id      name      diagnosis')
        console.log('=================================')
        console.log(`id      ${name}      ${diagnosis}`)
    }

    messageEnterUsername() {
        return 'Please enter your username: ';
    }

    messageEnterPassword() {
        console.log('Please enter your password: ');
    }

    messageIncorrectUsername() {
        console.log('Username incorrect!');
    }

    messageIncorrectPassword() {
        console.log('Password incorrect!');
    }

    messageCommandErr() {
        console.log('Command is not found!');
    }

    messageListEmployeeErr() {
        console.log('There is no data employees');
    }

    messageListPatientsErr() {
        console.log('There is no data patients');
    }

    messageAddNewEmplSuccess() {
        console.log('Add new employee success !')
    }

    messageAddNewRecord() {
        console.log('Add new record success !')
    }

    messageAddNewEmplEmpty() {
        console.log(`Can't be empty, please input new data employee!`)
    }

    messageAddNewRecordEmpty() {
        console.log(`Can't be empty, please input new data record!`)
    }
}

let data_employee = JSON.parse(fs.readFileSync('data_employee.json'))
let data_patient = JSON.parse(fs.readFileSync('data_patient.json'))

let hospital = new Hospital("Eka Hospital", data_employee, data_patient, "Tangerang")
hospital.login()
