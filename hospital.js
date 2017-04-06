const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
  login(){
    console.log(`----------------------------------------------------------------`);
    console.log(`Selamat Datang di ${this.name}\n${this.location}`)
    console.log(`----------------------------------------------------------------`);
    rl.question('Please enter your username:', (answer) => {
        if(this.checkUsername(answer)){
          return this.validatePassword(answer);
        } else {
          console.log('The username that you\'ve entered doesn\'t match any account.')
          return this.login()
          
        }
    })
  }
  validatePassword(username){
    rl.question('Please enter your password:', (line) => {
      if(this.checkPassword(line)){
        console.log(`----------------------------------------------------------------`);
        console.log(`Welcome ${this.findName(username)}! You are logged in as ${this.findPosition(username)}`)
        return this.displayMenu(username)
        
      } else {
        console.log('The password that you\'ve entered is incorrect.')
        return this.login()
        
      }
    })
  }
  checkUsername(username) {
    for (let i=0; i<this.employees.length; i++){
      if (username===this.employees[i].username){
        return true
      }
    }
  }
  checkPassword(password){
    for (let i=0; i<this.employees.length; i++){
      if(password===this.employees[i].password){
        return true
      }
    }
  }
  findName(username){
    for (let i=0; i<this.employees.length; i++){
      if (username===this.employees[i].username){
        return this.employees[i].name
      }
    }
  }
  findPosition(username){
    for (let i=0; i<this.employees.length; i++){
      if (username===this.employees[i].username){
        return this.employees[i].position
      }
    }
  }
  validateAdmin(username){
    if(this.findPosition(username) === 'Admin') {
      return true
    }
  }
  validateDoctorOrAdmin(username){
    if(this.findPosition(username) === 'Doctor' || this.findPosition(username) === 'Admin') {
      return true
    }
  }
  listPatients(){
    console.log(`----------------------------------------------------------------`);
    console.log(`ID | Name | Diagnosis`)
    for (let i = 0; i < this.patients.length ; i++){
      console.log(`${this.patients[i].id} | ${this.patients[i].name} | ${this.patients[i].diagnosis}`)
    }
    console.log(`----------------------------------------------------------------`);
  }
  viewRecords(id){
    console.log(`----------------------------------------------------------------`);
    console.log(`ID | Name | Diagnosis`)
    for (let i = 0; i < this.patients.length ; i++){
      if(this.patients[i].id === id){
        console.log(`${this.patients[i].id} | ${this.patients[i].name} | ${this.patients[i].diagnosis}`)
      }
    }
    console.log(`----------------------------------------------------------------`);
  }
  addRecord(name,diagnosis){
    var patient = new Patient('0'+(Number(this.patients[this.patients.length-1].id)+1).toString(),name,diagnosis)
    this.patients.push(patient)
    console.log('Patient has been successfully added!')
    console.log(`----------------------------------------------------------------`);
  }
  removeRecord(id){
    for (let i = 0; i < this.patients.length ; i++){
      if(this.patients[i].id === id){
        this.patients.splice(i,1)
        console.log('Patient has been successfully removed!')
      }
    }
    console.log(`----------------------------------------------------------------`);
  }
  listEmployees(){
    console.log(`----------------------------------------------------------------`);
    console.log(`Name | Position`)
    for (let i = 0; i < this.employees.length ; i++){
      console.log(`${this.employees[i].name} | ${this.employees[i].position}`)
    }
    console.log(`----------------------------------------------------------------`);
  }
  viewEmployee(name){
    console.log(`----------------------------------------------------------------`);
    console.log(`Name | Position`)
    for (let i = 0; i < this.employees.length ; i++){
      if(this.employees[i].name === name){
        console.log(`${this.employees[i].name} | ${this.employees[i].position}`)
      }
    }
    console.log(`----------------------------------------------------------------`);
  }
  addEmployee(name,position,username,password){
    var employee = new Employee(name,position,username,password)
    this.employees.push(employee)
    console.log('Employee has been successfully added!')
    console.log(`----------------------------------------------------------------`);
  }
  removeEmployee(name){
    for (let i = 0; i < this.employees.length ; i++){
      if(this.employees[i].name === name){
        this.employees.splice(i,1)
        console.log('Employee has been successfully removed!')
      }
    }
    console.log(`----------------------------------------------------------------`);
  }
  displayMenu(username){
    console.log('Options:')
    console.log('1 list_patients')
    console.log('2 view_patient <patient_id>')
    console.log('3 add_patient <patient_name> <diagnosis>')
    console.log('4 remove_patient <patient_id>')
    console.log('5 list_employees')
    console.log('6 view_employee <employee_name>')
    console.log('7 add_employee <name> <position> <username> <password>')
    console.log('8 remove_employee <employee_name')
    console.log('0 logout')
    rl.question('What would you like to do? ', (line) => {
      if (line.trim() === '1'){
        if (this.validateDoctorOrAdmin(username)){
          this.listPatients()
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } else if (line.trim()[0] === '2'){
        if (this.validateDoctorOrAdmin(username)){
          line = line.split(" ")
          this.viewRecords(line[1])
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } else if (line.trim()[0] === '3'){
        if (this.validateDoctorOrAdmin(username)){
          line = line.split(" ")
          this.addRecord(line[1],line[2])
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } else if (line.trim()[0] === '4'){
        if (this.validateDoctorOrAdmin(username)){
          line = line.split(" ")
          this.removeRecord(line[1])
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } if (line.trim() === '5'){
        if (this.validateAdmin(username)){
          this.listEmployees()
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } else if (line.trim()[0] === '6'){
        if (this.validateAdmin(username)){
          line = line.split(" ")
          this.viewEmployee(line[1])
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } else if (line.trim()[0] === '7'){
        if (this.validateAdmin(username)){
          line = line.split(" ")
          this.addEmployee(line[1],line[2],line[3],line[4])
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } else if (line.trim()[0] === '8'){
        if (this.validateAdmin(username)){
          line = line.split(" ")
          this.removeEmployee(line[1])
          return this.displayMenu(username)
        } else {
          console.log('You do not have access to this feature')
          console.log(`----------------------------------------------------------------`);
          return this.displayMenu(username)
        }
      } else if (line.trim() === '0'){
        console.log('You have logged out successfully')
        return this.login()
      }
    })
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
var bobby = new Patient('01', 'Bobby', 'Typhus')
var hendri = new Patient('02', 'Hendri', 'Dengue Fever')
var bill = new Employee('Bill', 'Admin', 'billivan', 'wheneverwhereever')
var bruce = new Employee('Bruce', 'Doctor', 'batman', 'joker')
var clark = new Employee('Clark', 'OB', 'superman', 'louislane')
var hos = new Hospital('RS Pondok Indah', 'Jl. Metro Duta Kav. UE, Pondok Pinang, Kebayoran Lama, Jakarta Selatan', [bill, bruce, clark], [bobby, hendri])
hos.login()

  

