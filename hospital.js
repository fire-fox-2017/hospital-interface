class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
    this.access_level = this.setAccessLevel(position);
  }

  setAccessLevel(position) {
    if (position === "admin") {
      return "admin";
    } else if (position === "doctor") {
      return "doctor";
    } else if (position === "employee"){
      return "employee";
    } else {
      return "none";
    }
  }

}


class Process {
  constructor(hospital) {
    this.hospital = hospital;
    this.employees = this.hospital.employees;
    this.user = "";
    this.access_level = "";
    this.menuList = ["list_patients                                         to show the patients list",
                     "view_records <patient_id>                             to show a patient's record",
                     "add_record <patient_id>                               to add record to a patient",
                     "remove_record <patient_id> <record_id>                to remove a record of a patient",
                     "add_employee <name> <position> <username> <password>  to add an employee to the system"];
  }


  initApp() {
    console.log("WELCOME to " + this.hospital.name.toUpperCase() + " HOSPITAL");
    console.log("------------------------------------------------");
    this.authentUser();
  }

  authentUser() {
    rl.prompt();
    rl.question("Please enter your username: ", (username) => {
      if (this.userCheck(username)) {
          this.requirePass();
        } else {
          console.log("Username is not found.");
          this.authentUser();
        }
    });
  }

  requirePass() {
    rl.prompt();
    rl.question("Please enter your password: ", (password) => {
      if (this.passCheck(password)) {
        this.welcome();
      } else {
        console.log("The password is incorrect.");
        this.requirePass();
      }
    });
  }

  welcome() {
    console.log(`------------------------------------------------`);
    console.log(`Welcome, ${this.user}. Your access level is: ${this.access_level.toUpperCase()}`);
    console.log(`------------------------------------------------`);
    this.menu();
  }

  menu() {
    let question = `What would you like to do?`;
    let optionTitle = `Options: `;
    let fullMenu = this.menuList.length;
    let options = 0;
    if (this.access_level === "admin") {
      console.log(question);
      console.log(optionTitle);
      options = fullMenu;
    } else if (this.access_level === "doctor") {
      console.log(question);
      console.log(optionTitle);
      options = fullMenu - 1;
    } else if (this.access_level === "employee") {
      console.log(question);
      console.log(optionTitle);
      options = fullMenu - 1;
    } else {
      console.log("Thank you for logging in, however you are not authorized to use this terminal.")
      console.log("Logging out..");
      process.exit();
    }
    for (let i = 0; i < options; i++) {
      console.log(this.menuList[i]);
    }
    process.exit();
  }

  userCheck(username) {
    let found = false;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].username === username) {
        found = true;
      }
    }
    return found;
  }

  passCheck(password) {
    let found = false;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].password === password) {
        found = true;
        this.user = this.employees[i].username;
        this.access_level = this.employees[i].access_level;
      }
    }
    return found;
  }



}


// DRIVER CODE

// Creates employees
let employees = [];
let mimin = new Employee("Mimin", "admin", "supermin", "123456");
employees.push(mimin);
let budi = new Employee("Budi", "doctor", "budi", "345678");
employees.push(budi);
let agus = new Employee("Agus", "employee", "agus", "678123");
employees.push(agus);
let anto = new Employee("Anto", "office boy", "anto", "987654");
employees.push(anto);

// Creates patients
let patients = [];
let ucok = new Patient(1, "Ucok", "Malaria");
patients.push(ucok);

// Creates hospital
let hospital = new Hospital("mystic", "somewhere", employees, patients);

//Initializes the interface
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

let hosInt = new Process(hospital);
hosInt.initApp();
