
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.dataPatients = []
    this.dataEmployee = []
    this.aksesUser = []
  }

  addPatient(data){
    if (data != undefined) {
      this.dataPatients.push(data)
    } else {
      rl.question('\nMasukan id,name,diadnosis, (ex: 3,budi maulana,kurang gizi) : ', (answer)=>{
        // console.log(answer);
        let a= answer.split(",")
        console.log(a);
        this.addPatient(new Patient(a[0], a[1], a[2]))
        this.clean()
        this.welcome(this.aksesUser)
      })
    }
  }

  addEmployee(data){
    if (data != undefined) {
      this.dataEmployee.push(data)
    } else {
      rl.question('\nMasukan nama,position,username,password, (ex: budi doremi,doctor,budi,1234) : ', (answer)=>{
        // console.log(answer);
        let a= answer.split(",")
        console.log(a);
        this.addEmployee(new Employee(a[0], a[1], a[2], a[3]))
        this.clean()
        this.welcome(this.aksesUser)
      })
    }
  }

  add_record(patient_id){
    // this.list_patients()
    rl.question('\nMasukkan tanggal & progress, (ex: 23-04-1017 : sudah bisa makan sendiri) : ', (answer) => {
      this.dataPatients.forEach((data) => {
        if(data.id == patient_id){
          data.records = (data.records || [])
          data.records.push(answer)
          this.back()
        }
        // console.log(`${data.id}.   | ${data.name} | ${data.diagnosis}`);
      })
    })
  }

  view_records(patient_id) {
      this.dataPatients.forEach((data) => {
        if(data.id == patient_id){
          console.log(`patient records, name : ${data.name}\n--------------------------`);

          for(let i = 0; i < data.records.length; i++) {
            console.log(`${i+1.} ${data.records[i]}`);
          }
          this.back()
        }
      })
  }
  remove_record(patient_id, record_id) {
    this.dataPatients.forEach((data) => {
      if(data.id == patient_id){
        data.records.splice(record_id-1, 1)
        this.back()
      }
    })
  }

  tampilanAwal(){
    // console.log(this.dataEmployee.forEach((data) => { return data.password}));
    console.log(`> welcome to "${this.name}" hospital \n-----------------------\n`);
    rl.question('\n> login as: [1] Patient || [2] Employee\n> ', (answer)=> {
      if(answer == '1')
        this.patientLogin()
      else if (answer == '2')
        this.employeeLogin()
      else
        this.clean()
        console.log('> you must choose "1" or "2"');
        this.tampilanAwal()
    })
  }
  employeeLogin() {
    this.clean()
    console.log(`> welcome to "${this.name}" hospital \n-----------------------\n`);
    rl.question('> Please enter your User name :', (answer) => {
      this.dataEmployee.forEach((data) => {
        if(data.username == answer){
          this.aksesUser.push(data.username, data.password, data.position)
          this.password()
        }
      })
      if (!this.aksesUser.length) {
        this.clean()
        console.log('> theris no user with name '+answer+' !!');
        this.tampilanAwal()
      }
    })
  }
  password() {
    rl.question('\n> Please Enter your password : ', (answer) => {
      console.log(this.aksesUser[1]);
      if(answer == this.aksesUser[1]){
        // console.log('berhasil');
        this.welcome(this.aksesUser)
      } else {
        console.log('> wrong password');
        this.password()
      }
    })
  }
  welcome(user) {
    this.clean()
    console.log(`> welcome "${user[0]}". your access level is : ${user[2]}`);
    this.menu(user[2])
  }
  menu(user){
    console.log('===================================\nWhat would you like to do?\nOptions : ');
    switch(user){
      case 'admin' : console.log('> add_employee\n> add_patient\n> list_employee\n> list_patients\n> view_records <patient_id>\n> remove_record <patient_id> <record_id>\n> logout');break
      case 'dokter' : console.log('> list_patients\n> view_records <patient_id>\n> add_record <patient_id>\n> remove_record <patient_id> <record_id>\n> logout');break
      case 'ob' : console.log('> list_patients\n> logout');break
      default : console.log('> logout');break
    }
    this.command()
  }
  command(){
    rl.question('\ncommand > ', (answer)=>{
      switch(answer.split(' ')[0]){
        case 'list_employee': this.list_employee();this.back(); break
        case 'list_patients': this.list_patients();this.back(); break
        case 'add_employee': this.addEmployee(); break
        case 'add_patient': this.addPatient(); break
        case 'view_records': this.view_records(answer.split(' ')[1]); break
        case 'add_record': this.add_record(answer.split(' ')[1]); break
        case 'remove_record': this.remove_record(answer.split(' ')[1],answer.split(' ')[2]); break
        case 'logout': this.aksesUser = []; this.clean();this.tampilanAwal(); break
        default: console.log('Action not Found!!'); this.menu(this.aksesUser[2])
      }
    })
  }
  list_employee(){
    this.clean()
    console.log("Employee list\n---------------------------------\nno.  | name                 | position");
    let n = 0
    this.dataEmployee.forEach((data) => {
      n++
      console.log(`${n}.   | ${data.name} | ${data.position}`);
    })
  }
  list_patients(){
    this.clean()
    console.log("Patients list\n---------------------------------\nno.  | name                 | diagnosis");
    let n = 0
    this.dataPatients.forEach((data) => {
      n++
      console.log(`${data.id}.   | ${data.name} | ${data.diagnosis}`);
    })
  }
  back(){
    rl.question('\npress enter to go back > ', (answer)=>{
      if(!answer){
        this.welcome(this.aksesUser)
      }
    })
  }
  clean() {
    console.log("\x1B[2J")
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
let i = new Hospital("hacktiv8", "pinggir kali", 10, 10)
i.addPatient(new Patient(1, "oscar hermawan      ", "kurang tidur"))
i.addPatient(new Patient(2, "adzani hermawan     ", "kurang makan"))
i.addEmployee(new Employee("ridho pratama       ", "admin", "ridho", "1234"))
i.addEmployee(new Employee("chopper             ", "dokter", "chopper", "1234"))
i.tampilanAwal()
// console.log(i);
