
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

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

class Hospital {
  constructor(name, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.dataPatients = []
    this.dataEmployee = []
    this.Access = []
  }

  addPatient(data){
    if (data != undefined) {
      this.dataPatients.push(data)
    } else {
      rl.question('\nPlease input ID,Name,and Diagnosis, (ex: 2,ronald,stress kebanyakan tugas dari tempat les) : ', (answer)=>{
        let a = answer.split(",")
        console.log(a);
        this.addPatient(new Patient(a[0], a[1], a[2]))
        this.clean()
        this.welcome(this.Access)
      })
    }
  }

  addEmployee(data){
    if (data != undefined) {
      this.dataEmployee.push(data)
    } else {
      rl.question('\nPlease input Name, Position, Username, and Password, (ex: otong,ob,bangtoyib,gakpulangpulang) : ', (answer)=>{
        let a= answer.split(",")
        console.log(a);
        this.addEmployee(new Employee(a[0], a[1], a[2], a[3]))
        this.clean()
        this.welcome(this.Access)
      })
    }
  }

  add_record(patient_id){
    rl.question('\nPlease input date and progress, (ex: 23-04-1017 : kanker membaik setelah lulus 1 phase dari Hacktiv8) : ', (answer) => {
      this.dataPatients.forEach((data) => {
        if(data.id == patient_id){
          data.records = (data.records || [])
          data.records.push(answer)
          this.back()
        }
      })
    })
  }

  view_records(patient_id) {
      this.dataPatients.forEach((data) => {
        if(data.id.toString() === patient_id){
          console.log(`Patient records, Name : ${data.name}\n-----------------------------------------`);
          // if (data.records === null || data.records === undefined){
          //   console.log("Please input the patient records first")
          //   this.back()
          // }
          // else {
          for(let i = 0; i < data.records.length; i++) {
            console.log(`${i+1.} ${data.records[i]}`);
          }// }
          this.back()
        }
      })
  }
  remove_record(patient_id, record_id) {
    this.dataPatients.forEach((data) => {
      if(data.id.toString() == patient_id){
        data.records.splice(record_id-1, 1)
        this.back()
      }
      else {
        console.log("Invalid ID / record ID!")
        this.back()
      }
    })
  }

  Start(){
    console.log(`\nWELCOME TO "${this.name}" HOSPITAL \n----------------------------------\n`);
    rl.question('\n> login as: [1] Patient || [2] Employee\n> ', (answer)=> {
      if(answer == '1')
        this.patientLogin()
      else if (answer == '2')
        this.employeeLogin()
      else
        this.clean()
        console.log('> you must choose "1" or "2"');
        this.Start()
    })
  }

  patientLogin(){
    this.clean()
    rl.question('> Please enter your Patient Name :', (answer) => {
    this.Access = [answer," ","patient"]
    this.welcome(this.Access)
      })
      if (!this.welcome.length) {
        this.clean()
        console.log('> there is no user with name '+answer+' !!');
        this.Start()
      }
  }

  employeeLogin() {
    this.clean()
    rl.question('> Please enter your Username :', (answer) => {
      this.dataEmployee.forEach((data) => {
        if(data.username == answer){
          this.Access.push(data.name, data.password, data.position)
          this.password()
        }
      })
      if (!this.Access.length) {
        this.clean()
        console.log('> there is no user with name '+answer+' !!');
        this.Start()
      }
    })
  }
  password() {
    rl.question('\n> Please Enter your password : ', (answer) => {
      console.log(this.Access[1]);
      if(answer == this.Access[1]){
        this.welcome(this.Access)
      } else {
        console.log('> wrong password');
        this.password()
      }
    })
  }
  welcome(user) {
    this.clean()
    console.log(`> Welcome ${user[0]}! your access level is : ${user[2]}`);
    this.menu(user[2])
  }
  menu(user){
    console.log('===================================\nPlease input the menu number\nOptions : ');
    switch(user){
      case 'admin' : console.log(' 1> logout\n 2> list_patients\n 3> view_records <patient_id>\n 4> add_record <patient_id>\n 5> remove_record <patient_id> <record_id>\n 6> add_patient\n 7> add_employee\n 8> list_employee');break
      case 'dokter' : console.log(' 1> logout\n 2> list_patients\n 3> view_records <patient_id>\n 4> add_record <patient_id>\n 5> remove_record <patient_id> <record_id>');break
      case 'ob' : console.log(' 1> logout\n 2> list_patients');break
      case 'patient' : console.log(' 1> logout\n 2> list_patients');break
      default : console.log(' 1> logout');break
    }
    this.command()
  }
  command(){
    rl.question('\ncommand > ', (answer)=>{
      switch(answer.split(' ')[0]){
        case '1': this.Access = []; this.clean();this.Start(); break
        case '2': this.list_patients();this.back(); break
        case '3': this.view_records(answer.split(' ')[1]); break
        case '4': this.add_record(answer.split(' ')[1]); break
        case '5': this.remove_record(answer.split(' ')[1],answer.split(' ')[2]); break
        case '6': this.addPatient(); break
        case '7': this.addEmployee(); break
        case '8': this.list_employee();this.back(); break
        default: console.log('Action not Found!!'); this.menu(this.Access[2])
      }
    })
  }
  list_employee(){
    this.clean()
    console.log("Employee list\n---------------------------------\nNO.  | NAME   | POSITION");
    let n = 0
    this.dataEmployee.forEach((data) => {
      n++
      console.log(`${n}.   | ${data.name} | ${data.position}`);
    })
  }
  list_patients(){
    this.clean()
    console.log("Patients list\n---------------------------------\nNO.  | NAME   | DIAGNOSIS");
    let n = 0
    this.dataPatients.forEach((data) => {
      n++
      console.log(`${data.id}   | ${data.name} | ${data.diagnosis}`);
    })
  }
  back(){
    rl.question('\npress enter to go back > ', (answer)=>{
      if(!answer){
        this.welcome(this.Access)
      }
    })
  }
  clean() {
    console.log("\x1B[2J")
  }
}


let newHospital = new Hospital("Stress")
newHospital.addPatient(new Patient(1, "Ahok",         "stress kebanyakan didemo"))
newHospital.addPatient(new Patient(2, "Jokowi",    "sakit kepala mikirin utang negara nambah trus"))
newHospital.addEmployee(new Employee("Imeda", "admin", "imeda", "123"))
newHospital.addEmployee(new Employee("Yulius Stedy Tiolamon", "dokter", "stedy", "keren"))
newHospital.addEmployee(new Employee("tole bahlul suparman", "ob", "tole", "bahlul"))
newHospital.Start()
