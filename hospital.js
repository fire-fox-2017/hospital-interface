const fs = require ('fs');
const readline = require ('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">>> "
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.arr = []
  }
  home(){
    console.log("-----------------------------------")
    console.log(`Welcome to ${this.name} Hospital`)
    console.log("-----------------------------------")
    this.login()
  }
  login(){
    rl.question("Please enter your username :",(answer) => {
        for(let i=0;i<this.employees.length;i++){
          if(this.employees[i].username == answer){
              this.arr.push({
                "name" : this.employees[i].name,
                "position" : this.employees[i].position,
                "username" : this.employees[i].username,
                "password" : this.employees[i].password
              })
          }
        }
        if(this.arr[0].username == answer){
          this.password()
        }
    })
  }
  password(){
    rl.question("Please enter your password :",(answer) => {
      if(this.arr[0].password == answer){
        this.start(this.arr[0].name,this.arr[0].position)
      }else{
        console.log("Password tidak cocok");
        this.password()
      }
    })
  }
  start(access,level){
    this.access = access
    this.level = level
    console.log("-------------------------------------------")
    console.log(`Welcome ${this.access}. Your acces level is: ${this.level}`)
    console.log("-------------------------------------------")
    console.log("What would you like to do?")
    console.log("Option : ")
    if(this.level === "ADMIN"){
      console.log(`- list_employees`);
      console.log(`- list_patient`);
      console.log(`- add_employee`);
      console.log(`- add_patient`);
      console.log(`- remove_employee <id_record>`);
      console.log(`- remove_patient <id_record>`);
      console.log(`- close`);
      this.menuSelect();
    }else if(this.level === "DOKTER"){
      console.log(`- list_patient`);
      console.log(`- add_patient`);
      console.log(`- remove_employees <id_record>`);
      console.log(`- close`);
      this.menuSelect();
    }
    else if(this.level === "RESEPSIONIS"){
      console.log(`- list_patient`);
      console.log(`- add_patient`);
      console.log(`- remove_employees <id_record>`);
      console.log(`- close`);
      this.menuSelect();
    }else{
      console.log(`Access Denided !!!`);
      rl.close()
    }
  }
  menuSelect(){
    rl.prompt();
    rl.on('line',(input) => {
      if(this.level == "ADMIN"){
        switch(input){
          case "list_employees" :
            employeeSys.listEmployee();
            break;
          case "list_patients" :
            patientSys.listPatient()
            break;
          case "add_employee" :
            employeeSys.addEmployee();
            break;
          case "add_patient" :
            patientSys.addPatient()
            break;
          case "remove_employee" :
            employeeSys.removeEmployee();
            break;
          case "remove_patient" :
            patientSys.removePatient();
            break;
          case "close" :
            rl.close();
            break;
        }
      }else {
        switch(input){
          case "list_patients" :
            patientSys.listPatient()
            break;
          case "add_patient" :
            patientSys.addPatient()
            break;
          case "remove_patient" :
            patientSys.removePatient();
            break;
          case "close" :
            rl.close();
            break;
        }
      }
    })
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
    this.dataPatient = objPatient
  }
  listPatient(){
    console.log('\n================= List Patients ===================')
    console.log('id | name | diagnosis                    ')
    console.log('===================================================')
    if(this.dataPatient.length == 0){
      console.log(`Data Patients is Null`);
    }else{
      for(let i=0;i<this.dataPatient.length;i++){
      console.log(`${this.dataPatient[i].id}     ${this.dataPatient[i].name}            ${this.dataPatient[i].diagnosis}`);
      }
    }
  }
  addPatient(){
    rl.question('Entry this data: (ex: 1,Dyan,Flu) => ',(input) => {
      if(input != ''){
        input = input.split(',')
        this.dataPatient.push({
          "id" : input[0],
          "name" : input[1],
          "diagnosis" : input[2]
        })
        console.log("Input success.");
        fs.writeFileSync('patient.json',JSON.stringify(this.dataPatient))
        this.listPatient()
        console.log("\n")
        hospitalSys.menuSelect()
      }else{
        console.log(`Data can not null!!`);
        this.addPatient();
      }
    })

  }
  removePatient(){
    this.listPatient()
    rl.question(`Delete data. Choice Number : (Ex: 1) => `,(input) =>{
      if(input == 0){
        console.log(`Data is empty`);
        tis.removePatient();
      }else if(input <= this.dataPatient.length){
          this.dataPatient.splice(input-1,1)
      }else{
        console.log(`Number not match with data table`);
      }
      console.log(`Delete data Success.`);
      fs.writeFileSync('patient.json',JSON.stringify(this.dataPatient))
      this.listPatient()
      hospitalSys.menuSelect()
    })
  }
}

class Employee {
  constructor(name,position,username,password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.data = objEmployee;
  }
  listEmployee(){
    console.log('\n================= List Employees ===================')
    console.log('id | name | position | username')
    console.log('====================================================')
    if(this.data.length == 0){
      console.log(`Data Employees is Null`);
    }else{
      for(let i=0;i<this.data.length;i++){
      console.log(`${i+1} | ${this.data[i].name} | ${this.data[i].position} | ${this.data[i].username}`);
      }
    }
  }
  addEmployee(){
    rl.question('Entry this data: (ex: dyan,DOKTER,dyan,123) => ',(input) => {
      if(input != ''){
        input = input.split(',')
        this.data.push({
          "name" : input[0],
          "position" : input[1],
          "username" : input[2],
          "password" : input[3]
        })
        console.log("Input success.");
        fs.writeFileSync('employee.json',JSON.stringify(this.data))
        this.listEmployee()
        console.log("\n")
        hospitalSys.menuSelect()
      }else{
        console.log(`Data can not null!!`);
        this.addEmployee();
      }
    })

  }
  removeEmployee(){
    this.listEmployee()
    rl.question(`Delete data. Choice Number : (Ex: 1) => `,(input) =>{
      if(input == 0){
        console.log(`Data is empty`);
        this.removeEmployee();
      }else if(input <= this.data.length){
          this.data.splice(input-1,1)
      }else{
        console.log(`Number not match with data table`);
      }
      console.log(`Delete data Success.`);
      fs.writeFileSync('employee.json',JSON.stringify(this.data))
      this.listEmployee()
      hospitalSys.menuSelect()
    })
  }
}

var objEmployee = JSON.parse(fs.readFileSync('employee.json','utf-8'))
var objPatient = JSON.parse(fs.readFileSync('patient.json','utf-8'))
var employeeSys = new Employee()
var patientSys = new Patient()
var hospitalSys = new Hospital("Hacktiv8","Jakarta Selatan",objEmployee,objPatient)

hospitalSys.home()
