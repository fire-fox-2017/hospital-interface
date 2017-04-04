'use strict'
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hospital {
  constructor(name, employees, patients, location) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.sess = []
  }

  start(){
    // console.log(this.employees[0]);
    console.log("-----------------------");
    console.log(`Welcome to ${this.name}`);
    console.log("-----------------------");
    this.login()
  }

  login(){
    rl.question('\nPlease enter your Username : ', (answer)=>{
      // console.log(typeof(answer))
      for(let i=0; i<this.employees.length; i++){
        // console.log(this.employees[i].username);
        if(this.employees[i].username == answer){
          this.sess.push({
            name: this.employees[i].name,
            position: this.employees[i].position,
            password: this.employees[i].password
          })
          i += this.employees.length
          this.password(this.sess);
        }
        if(i == this.employees.length - 1 && this.employees[i].username != answer){
          console.log('\nUsername Salah!\n');
          i += this.employees.length
          this.login()
        }
      }
    })
  }

  password(sess){
    rl.question('\nPlease Enter Password : ', (answer)=>{
      if(answer == this.sess[0].password){
        this.welcome(this.sess)
      } else {
        console.log('\nPassword Salah\n');
        this.password(this.sess)
      }
    })
  }

  welcome(sess){
    console.log("\n=========================================================");
    console.log(`Welcome ${sess[0].name}. Your access level is : ${sess[0].position}`)
    this.menu()
  }

  menu(){
    console.log("\n===================================");
    console.log('What would you like to do?.');
    console.log('Options : ');
    if(this.sess[0].position == 'Admin'){
      console.log('-- list_employee');
      console.log('-- add_employee');
      console.log('-- list_patients');
      console.log('-- view_records <record_id>');
      console.log('-- add_record');
      console.log('-- remove_record <record_id>');
      console.log('-- Logout');
    }
    if(this.sess[0].position == 'Doctor'){
      console.log('-- list_patients');
      console.log('-- view_records <record_id>');
      console.log('-- Logout');
    }
    if(this.sess[0].position == 'Receptionist'){
      console.log('-- list_patients');
      console.log('-- view_records <record_id>');
      console.log('-- add_record');
      console.log('-- remove_record <record_id>');
      console.log('-- Logout');
    }
    if(this.sess[0].position == 'Ob'){
      console.log('-- Logout');
    }
    this.selectMenu()
  }

  selectMenu(){
    rl.question('\nWhat would you llike to do?\noptions : ', (answer)=>{
      switch(answer.split(' ')[0]){
        case 'list_employee':
          this.list_employee()
          break
        case 'add_employee':
          this.add_employee()
          break
        case 'list_patients':
          this.list_patients()
          break
        case 'view_records':
            this.view_records(answer.split(' ')[1])
            break
        case 'add_record':
          this.add_record()
          break
        case 'remove_record':
          this.remove_record(answer.split(' ')[1])
          break
        case 'Logout':
          this.logout()
          break
        default:
        console.log('Action not Found!!');
        this.menu()
      }
    })
  }

  list_employee(){
    if(this.employees.length == 0){
      console.log('Employees nothing on data');
    } else {
      console.log('\n=========== List Employees ==================')
      console.log('id      name      position            username')
      console.log('===============================================')
      for(let i=0; i<this.employees.length; i++){
        console.log(`[${i+1}]      ${this.employees[i].name}      ${this.employees[i].position}            ${this.employees[i].username}`);
      }
    }
    console.log('\n')
    this.menu()
  }

  list_employee2(){
      if (this.employees.length == 0) {
          console.log('Employees tidak ada !');
      } else {
          console.log('\n=========== List Employees ===================')
          console.log('id      name      position            username')
          console.log('================================================')
          for (var i = 0; i < this.employees.length; i++) {
              console.log(`[${i+1}]      ${this.employees[i].name}      ${this.employees[i].position}            ${this.employees[i].username}`);
          }
      }
  }

  add_employee(){
    this.list_employee2()
    rl.question('\nMasukan nama,position,username,password, (ex: dudi,doctor,admin,1234) : ', (answer)=>{
      if(answer != ''){
        let input = answer.split(',')
        let last = this.employees.length+1
        this.employees.push({
          name:input[0],
          position:input[1],
          username:input[2],
          password:input[3]
        })
        console.log('Insert Success !')
        fs.writeFileSync('employee.json', JSON.stringify(this.employees))
        this.list_employee2()
        console.log('\n')
        this.menu()
      } else {
        console.log('tidak boleh kosong !')
        this.add_employee()
      }
    })
  }

  view_records(id){
    let i = id-1
    console.log('id      name      diagnosis')
    console.log('=================================')
    console.log(`[${this.patients[i].id}]      ${this.patients[i].name}      ${this.patients[i].diagnosis}`);
    console.log('\n')
    this.menu()
  }

  add_record(){
    this.listPasien2()
    rl.question('\nMasukkan nama & diagnosis, (ex: dodit:flu) : ', (answer) => {
        if(answer !== ''){
            let input = answer.split(':');
            let getLast_data_patient = this.patients.length - 1
            let last = this.patients[getLast_data_patient].id + 1
            this.patients.push({id : last, name : input[0], diagnosis : input[1]})
            console.log('Insert Success !')
            fs.writeFileSync('patient.json', JSON.stringify(this.patients), 'utf8');
            this.listPasien2()
            console.log('\n')
            this.menu()
        }else{
          // console.log(this.patients.length);
            console.log('tidak boleh kosong !')
            this.add_record()
        }
    })
  }

  list_patients(){
      if (this.patients.length == 0) {
          console.log('Pasien tidak ada !');
      } else {
          console.log('\n----------- List Patients -----------')
          for (var i = 0; i < this.patients.length; i++) {
              console.log(`[${this.patients[i].id}]      ${this.patients[i].name}      ${this.patients[i].diagnosis}`);
          }
      }
      console.log('\n');
      this.menu()
  }

  listPasien2(){
      if (this.patients.length == 0) {
          console.log('Pasien tidak ada !');
      } else {
          console.log('\n----------- List Patients -----------')
          for (var i = 0; i < this.patients.length; i++) {
              console.log(`[${this.patients[i].id}]      ${this.patients[i].name}      ${this.patients[i].diagnosis}`);
          }
      }
  }

  remove_record(id){
      let listToDelete = [parseInt(id)];
      // console.log(listToDelete)
      for(let i = 0; i < this.patients.length; i++) {
          if(listToDelete.indexOf(this.patients[i].id) !== -1) {
              this.patients.splice(i, 1); // start, jmlHapus
          }
      }
      fs.writeFileSync('patient.json', JSON.stringify(this.patients), 'utf8');
      this.listPasien2();
      console.log('\n')
      this.menu()
  }

  logout(){
      this.sess = [];
      this.start();
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

let dataEmployee = JSON.parse(fs.readFileSync('employee.json','utf-8'))
// console.log(dataEmployee);
let dataPatient = JSON.parse(fs.readFileSync('patient.json','utf-8'))
let hospitalFire = new Hospital("Fire-Hospital", dataEmployee, dataPatient, "Tokyo")

hospitalFire.start()
