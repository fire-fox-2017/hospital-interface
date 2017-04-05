const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


class Hospital {
  constructor(name, location) {
    this.name = name
    this.location = location;
    this.employees = [];
    this.patients = [];
    this.hospitalDatabase = [];
    this.role;
    this.employeesIdx;
    this.employeesUserName;
    this.employessPass;
    this.passIsWrong = true;
    this.userNameIsWrong = true;
  }

  userLogin() {
    
    console.log(`==========================\nWELCOME TO\n${this.name} Hospital\n${this.location}\n==========================\n`)
      //input user response
      rl.question(`Please insert your username: `, (userInput) => {
        this.checkUserName(userInput);

      }); 

  
  }
  

  checkUserName(userInput) {
    for(var i = 0; i < this.employees.length; i++) {
          if(userInput === this.employees[i].username) {
            this.employeesUserName = this.employees[i].username;
            this.role = this.employees[i].role;
            this.employessPass = this.employees[i].password;
            this.employeesIdx = i;
            this.userNameIsWrong = false;
          } else {
            this.userNameIsWrong = true;
          }

          if(!this.userNameIsWrong) {
            this.checkPassword(userInput);
          }
        }
  }

  checkPassword() {
    rl.question(`Username ${this.employeesUserName} is registered. Insert your password: `, (userInput) => {
      if(userInput == this.employessPass) {
        this.passIsWrong = false;
        console.log(`Welcome to ${this.name} Hospital database, ${this.employees[this.employeesIdx].name}! You login as: ${this.role}`);
        this.listMenu();
      } else {
        console.log(`Password is wrong!`)
        this.checkPassword();
      }
    });
  }

  listMenu() {
    console.log(`==========================\nWhat do you need, ${this.employees[this.employeesIdx].name}?\n==========================\n`);
    console.log(`-- view_patient\n-- details_patient\n-- add_patient\n-- delete_patient\n-- add_employees\n-- list_employees\n==========================`);
    this.menuDetails();
  }

  addEmployeeData(data) {
    this.employees.push(data);
  }

  menuDetails() {
    rl.question(`Enter your option from above here: `, (userInput) => {
      switch(userInput) {
        case 'view_patient':
        this.viewPatient();
        break;

        case 'details_patient':
        this.detailsPatient();
        break;

        case 'add_patient':
        this.addPatient();
        break;

        case 'delete_patient':
        this.deletePatient();
        break;

        case 'add_employees':
        this.addEmployee();
        break;

        case 'list_employees':
        this.listEmployee();
        break;

        case 'quit':
        rl.close();

        default:
        this.menuDetails();
      }
    });
  }

  viewPatient() {
    if(this.role === 'ob') {
      console.log(`\nYOU CAN'T ACCESS PATIENT LIST\n`);
    } else if(this.patients.length === 0) {
      console.log('no patient in this hospital.');
    } else {
      for(var i = 0; i < this.patients.length; i++) {
        console.log(`ID:${this.patients[i].id} NAME: ${this.patients[i].name} DIAGNOSIS: ${this.patients[i].diagnosis}`);
      }
      
    }
    this.listMenu();
  }

  detailsPatient() {
    rl.question(`Enter patient id or exit to quit: `, (userInput) => {
      if(userInput > 0 && userInput <= this.patients.length) {
        if(this.role === 'ob') {
          console.log(`\nYOU CAN'T ACCESS PATIENT DETAILS\n`);
        } else if(this.role === 'rc') {
          console.log(`\nID: ${this.patients[userInput - 1].id}\nNAME: ${this.patients[userInput - 1].name}\n`);
          this.listMenu();
        } else {
          console.log(`\nID: ${this.patients[userInput - 1].id}\nNAME: ${this.patients[userInput - 1].name}\nDIAGNOSA: ${this.patients[userInput - 1].diagnosis}`);
          this.listMenu();
        }
      } else if(userInput === 'exit') {
        this.listMenu();
      } else {
        console.log(`Patient ID not found`);
        this.detailsPatient();
      }
    });
  }

  addPatient() {
    let newPatientName;
    let newPatientDiagnosis;

    if(this.role === 'ob') {
      console.log(`Access denied! Office boy can't add new patient`);
      this.listMenu();
    } else {
      // name
      rl.question(`Enter the patient name: `, (userInput) => {
        newPatientName = userInput;
        console.log(`${newPatientName}'s added.`);
        // diagnosis
        rl.question(`Enter diagnosis for ${newPatientName}: `, (userInput) => {
          newPatientDiagnosis = userInput;
          console.log(`${newPatientDiagnosis} is added for ${newPatientName}.`);
          this.patients.push(new Patient(this.patients.length + 1, this.name = newPatientName, this.diagnosis = newPatientDiagnosis));
          console.log(`${newPatientName} is successfully added.`);
          this.listMenu();
        });
      });
    }
  }

  deletePatient() {
    if(this.role === 'ob') {
      console.log(`ACCESS DENIED! Office boy Can't delete patient data.`);
      this.listMenu();
    } else {
      rl.question(`Enter patient ID to delete it: `, (userInput) => {
        if(userInput > this.patients.length) {
          console.log(`there is no patient with ID: ${userInput}. Delete failed.`);
          this.listMenu();
        } else {
          console.log(`Patient with ID: ${userInput}, NAME: ${this.patients[userInput - 1].name} has been erased.`);
          this.patients.splice(userInput - 1, 1);
          this.listMenu();
        }
        
      });
    }
  }

  addEmployee() {
    var newEmployeeName;
    var newEmployeePos;
    var newEmployeeUserName;
    var newEmployeePass;

    if(this.role === 'adm') {
      console.log(`Welcome ${this.employees[this.employeesIdx].name}! As an admin you can add employee to the Hospital.`);
      rl.question(`First, enter the employee name: `, (userInput) => {
        newEmployeeName = userInput;
        rl.question(`Enter position (dr, adm, ob or rc) for ${newEmployeeName}: `, (userInput) => {
          newEmployeePos = userInput;
          rl.question(`Enter username for ${newEmployeePos} ${newEmployeeName}: `, (userInput) => {
            newEmployeeUserName = userInput;
              rl.question(`Lastly, enter password for ${newEmployeeUserName}: `, (userInput) => {
                newEmployeePass = userInput;
                console.log(`New employee successfully added. ${newEmployeePos} ${newEmployeeName} has USERNAME: ${newEmployeeUserName} PASSWORD: ${newEmployeePass}`);
                this.listMenu();
                let profile = {
                  name: newEmployeeName,
                  role: newEmployeePos,
                  username: newEmployeeUserName,
                  password: newEmployeePass,
                  id: this.employees.length + 1
                }
                // name , pos, username, pass
                switch(newEmployeePos) {

                  case 'dr':
                  this.employees.push(new Doctor(profile));
                  break;

                  case 'adm':
                  this.employees.push(new Admin(profile));
                  break;

                  case 'ob':
                  this.employees.push(new OfficeBoy(profile));
                  break;

                  case 'rc':
                  this.employees.push(new Receptionist(profile));
                  break;
                }
              });
          });
        });
      });
    }
    
  }


  listEmployee() {
    if(this.role = 'adm') {
      console.log(`\n====EMPLOYEE DATABASE====\n`);
      for(var i = 0; i < this.employees.length; i++) {
        console.log(`${i + 1}. ${this.employees[i].role} ${this.employees[i].name}`)
      }
      this.listMenu();
    } else {
      console.log(`ACCESS DENIED! Only Admin can view employee list.`);
      this.listMenu();
    }
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

class Doctor extends Employee {
  constructor(profile, username, password) {
    super(username, password);
    this.name = profile.name;
    this.id = profile.id;
    this.gender = profile.gender;
    this.isSpecialist = profile.isSpecialist;
    super.username = profile.username;
    super.password = profile.password;
    this.role = profile.role;
  }
}

class Admin extends Employee {
  constructor(profile, username, password) {
    super(username, password);
    this.name = profile.name;
    this.id = profile.id;
    this.age = profile.age;
    this.gender = profile.gender;
    super.username = profile.username;
    super.password = profile.password;
    this.role = profile.role;
  }
}

class Receptionist extends Employee {
  constructor(profile, username, password) {
    super(username, password);
    this.name = profile.name;
    this.id = profile.id;
    this.age = profile.age;
    this.gender = profile.gender;
    super.username = profile.username;
    super.password = profile.password;
    this.role = profile.role;
  }
}

class OfficeBoy extends Employee {
  constructor(profile, username, password) {
    super(username, password);
    this.name = profile.name;
    this.id = profile.id;
    this.age = profile.age;
    this.gender = profile.gender;
    super.username = profile.username;
    super.password = profile.password;
    this.role = profile.role;
    }
}


let newAdmin = new Admin({
  name:'dono',
  id:1,
  age:40,
  gender:'male',
  username:'admin',
  password:12345,
  role: 'adm'
});

let newDoctor = new Doctor ({
  name: 'susi',
  id:2,
  age:54,
  gender: 'female',
  username: 'doctor',
  password: 11111,
  role: 'dr'
});

let newReceptionist = new Receptionist ({
  name: 'jane',
  id: 3,
  age: 27,
  gender: 'female',
  username: 'jane',
  password: 12345,
  role: 'rc'
});

let newOfficeBoy = new OfficeBoy ({
  name: 'budi',
  id: 4,
  age: 15,
  gender: 'male',
  username: 'budi',
  password: 12345,
  role: 'ob'
})

let myHospital = new Hospital('Cerdas Sehat', 'Jakarta Pusat');

myHospital.addEmployeeData(newAdmin);
myHospital.addEmployeeData(newDoctor);
myHospital.addEmployeeData(newReceptionist);
myHospital.addEmployeeData(newOfficeBoy);
myHospital.userLogin();



// console.log(newAdmin.role, newDoctor.role, newReceptionist.role, newOfficeBoy.role);
