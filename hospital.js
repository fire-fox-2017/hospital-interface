class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  addPatients(name, diagnosis) {

  }

  isUsernameExist(username) {
    for (let i = 0 ; i < this.employees.length ; i++) {
      if (this.employees[i].username == username)
        return true;
    }
    return false;
  }

  checkPassword(username, password) {
    for (let i = 0 ; i < this.employees.length ; i++) {
      if (this.employees[i].username == username)
        return (this.employees[i].password == password) ? true : false;
    }
    return false;
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

class Admin extends Employee {
  constructor(name, username, password) {
    super(name, "ADMIN", username, password);
  }
}

class Doctor extends Employee {
  constructor(name, username, password) {
    super(name, 'DOCTOR', username, password);

  }
}

class Receptionist extends Employee {
  constructor(name, username, password) {
    super(name, 'RECEPTIONIST', username, password);
  }
}

class OfficeBoy extends Employee {
  constructor(name, username, password) {
    super(name, 'OFFICEBOY', username, password);
  }
}


// Initialization ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// create employees
let admin = new Admin("Rudy", "rudy", "haha" );
let doctor = new Doctor("James", "james", "haha" );
let receptionist = new Receptionist("Sharla", "sharla", "haha" );
let ob = new OfficeBoy("Toby", "toby", "haha");

let employees = [];
employees.push(admin);
employees.push(doctor);
employees.push(receptionist);
employees.push(ob);

// create patients
let p1 = new Patient(1, "Baba", "Hamstring");
let patients = [];
patients.push(p1);

let hos_name = "HoHoHo Hospital";
let hos_address = "Jalan Sultan 4040, Jakarta Selatan";
// create hospital
let hospital = new Hospital(hos_name, hos_address, employees, patients);

console.log(hospital);

// Hospital Interface ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let str = '';

str = `Welcome to ${hospital.name}\n`;
str += "--------------------------\n";
console.log(str);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("Please enter your username: ");
rl.prompt();

let is_username_valid = false;
let is_password_valid = false;
let ask_for_pass = false;

let username = "";
let password = "";
rl.on('line', (input) => {
  // find username

  if (hospital.isUsernameExist(input) && !is_username_valid) {
    username = input;
    console.log("hore");
    is_username_valid = true;
    rl.setPrompt("Please enter your password:");
    rl.prompt();

  }
  else if (!hospital.isUsernameExist(input) && !is_username_valid) {
    console.log("Incorrect Username");
    rl.setPrompt("Please enter your username:");
    rl.prompt();
  }

  if(is_username_valid && !is_password_valid) {
    if (hospital.checkPassword(username, input)) {
      console.log("password correct");
      is_password_valid = true;
    }
    else {
      rl.setPrompt("Please enter your password:");
      rl.prompt();
    }
  } else if (is_username_valid && is_password_valid) {
    console.log("hahaha");
  }




});






//
