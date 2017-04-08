class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  addEmployee(new_employee) {
    this.employees.push(new_employee);
  }

  addPatients(new_patient) {
    console.log("here");
    console.log(new_patient);
    this.patients.push(new_patient);
  }

  deleteEmployee(username) {
    // delete employee with username
    for (let i = 0 ; i < this.employees.length ; i++) {
      if(this.employees[i].username == username) {
        // console.log(`${i} ${this.employees[i].name}, ${this.employees[i].username}`)
        this.employees.splice(i,1);
        // console.log(this.employees);
        return true;
      }
    }
    return false;
  }

  deletePatient(patient_id) {
    for (let i = 0 ; i < this.patients.length ; i++) {
      if(this.patients[i].id == patient_id) {
        this.patients.splice(i,1);

        return true;
      }
    }
    return false;
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

  getUser(username) {
    for (let i = 0 ; i < this.employees.length ; i++) {
      if (this.employees[i].username == username)
        return this.employees[i];
    }
    return null;
  }

  listEmployees() {
    console.log("Employees");
    console.log("============");
    for (let i = 0 ; i < this.employees.length ; i++) {
      console.log(`${i+1}. ${this.employees[i].name} ${this.employees[i].position} ${this.employees[i].username}`)
    }
  }

  listPatients() {
    console.log("Patients");
    console.log("============");
    for (let i = 0 ; i < this.patients.length ; i++) {
      console.log(`${i+1}. ${this.patients[i].id} ${this.patients[i].name} ${this.patients[i].diagnosis}`)
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
let doctor = new Doctor("Grey", "grey", "haha" );
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


let is_username_valid = false;
let is_password_valid = false;
let ask_for_pass = false;

let username = "";
let password = "";
let user = null;
let user_input = '0';

let user_input2 = "";


function begin() {
  rl.question("Please enter your username: ", (input) => {
    if (hospital.isUsernameExist(input)) {
      username = input;
      askPassword(username);
    }
    else {
      console.log("Invalid username");
      begin();
    }
  });

}

function askPassword(username) {
  rl.question("Please enter your password: ", (input) => {
    if (hospital.checkPassword(username, input)) {
      console.log("hore");
      //get user
      user = hospital.getUser(username);
      displayMenu(user);


    }
    else {
      console.log("Invalid Password");
      askPassword(username);
    }
  });
}

function clear_screen() {
  console.log("\x1B[2J");
}


function displayMenu(user) {
  console.log();
  displayHeader(user);

  if(user.position == 'ADMIN') {
    displayMenuAdmin();
  } else if(user.position == 'DOCTOR') {
      displayMenuDoctor();
  } else if(user.position == 'RECEPTIONIST') {
      displayMenuReceptionist();
  } else if(user.position == 'OFFICEBOY') {
      displayMenuOFFICEBOY();
  }


  // ask for input
  askMenuInput();
}

function displayHeader(user) {
  console.log(`-------------------------------------------------------------`);
  console.log(`Welcome, ${user.name}. Your access level is: ${user.position}`);
  console.log(`-------------------------------------------------------------`);
  console.log("What would you like to do?");
}

function displayMenuAdmin() {
  let menu = "(1) List Employees\n(2) Add New Doctor\n(3) List Patients\n(4) Add New Patient\n(5) Delete Employee\n(6) Delete Patient\n(0) Exit";
  console.log(menu);
}

function displayMenuDoctor() {
  let menu = "(1) List Patients\n(2) Add New Patient\n(3) Delete Patient\n(0) Exit";
  console.log(menu);
}

function displayMenuReceptionist() {
  let menu = "(1) List Employees\n(2) List Patients\n(0) Exit";
  console.log(menu);
}

function displayMenuOFFICEBOY() {
  let menu = "Sorry, you don't have access to this system\n(0) Exit";
  console.log(menu);
}

function askMenuInput() {
  rl.question("Your input: ", (input) => {
    console.log(`User ${user.username} entered: "${input}"`);
    if(input == "0") {
      exit();
    }
    else {


    if(user.position == "ADMIN") {
      if(input == "1") {
        clear_screen();
        hospital.listEmployees();
        displayMenu(user);
      }
      else if(input == "2") {
        askAddEmployee();
      }
      else if(input == "3") {
        clear_screen();
        hospital.listPatients();
        displayMenu(user);
      }
      else if(input == "4") {
        askAddPatient();
      }
      else if(input == "5") {
        askDeleteEmployee();
      }
      else if(input == "6") {
        askDeletePatient();
      }
      else {
        console.log("*** Invalid Input.");
      }
      askMenuInput();

    }
    else if(user.position == "DOCTOR") {

      if(input == "1") {
        clear_screen();
        hospital.listPatients();
        displayMenu(user);
      }
      else if(input == "2") {
        askAddPatient();
      }
      else if(input == "3") {
        askDeletePatient();
      }
      else {
        console.log("*** Invalid Input.");
      }

      askMenuInput();

    }
    else if(user.position == "RECEPTIONIST") {

      if(input == "1") {
        clear_screen();
        hospital.listEmployees();
        displayMenu(user);
      }
      else if(input == "2") {
        clear_screen();
        hospital.listPatients();
        displayMenu(user);
      }
      else {
        console.log("*** Invalid Input.");
      }

      askMenuInput();
    }
    else if(user.position == "OFFICEBOY") {

      if(input == "0") {
        exit();
      }
      else {
        console.log("*** Invalid Input.");
      }
    }


  }

    // askMenuInput();
  });
}

function askAddEmployee() {
  console.log("Enter this information");
  let ae_name = "";
  let ae_position = "";
  let ae_username = "";
  let ae_password = "";
  rl.question("Name: ", (input) => {
    ae_name = input;
    rl.question("Username: ", (input) => {
      ae_username = input;
      rl.question("Password: ", (input) => {
        ae_password = input;
        hospital.addEmployee(new Doctor(ae_name, ae_username, ae_password))
        console.log(`Added new Doctor "${ae_name}"`);
        displayMenu(user);
      });
    });
  });
}

function askAddPatient() {
  console.log("Enter this information");
  let ap_id = 0;
  let ap_name = "";
  let ap_diagnosis = "";
  rl.question("ID: ", (input) => {
    ap_id = input;
    rl.question("Name: ", (input) => {
      ap_name = input;
      rl.question("Diagnosis: ", (input) => {
        ap_diagnosis = input;
        hospital.addPatients(new Patient(ap_id, ap_name, ap_diagnosis))
        console.log(`Added new Patient "${ap_name}"`);
        displayMenu(user);
      });
    });
  });
}

function askDeleteEmployee() {
  console.log("Enter this information");
  let ae_name = "";
  let ae_position = "";
  let ae_username = "";
  let ae_password = "";
  rl.question("Username: ", (input) => {
    ae_username = input;
    // ijo
    if(hospital.deleteEmployee(ae_username))
      console.log(`Deleted Employee with username="${ae_username}".`);
    else
      console.log(`*** Cannot delete Employee with username="${ae_username}".`)
    displayMenu(user);

  });
}

function askDeletePatient() {
  console.log("Enter this information");
  let ae_id = "";
  rl.question("Patient ID: ", (input) => {
    ae_id = input;
    // ijo
    if(hospital.deletePatient(ae_id))
      console.log(`Deleted Patient with id="${ae_id}".`);
    else
      console.log(`*** Cannot delete Patient with id="${ae_id}".`)
    displayMenu(user);

  });
}

function exit() {
  console.log("Thank you and Come Again! Bye!!");
  rl.close();
}


begin();

/*
rl.setPrompt("Please enter your username: ");
rl.prompt();


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
      password = input;
      // get the employee with the correct username and password
      user = hospital.getUser(username, password);
    }
    else {
      rl.setPrompt("Please enter your password:");
      rl.prompt();
    }
  } else if (is_username_valid && is_password_valid) {

    if(user_input == "0") {
      console.log(`-------------------------------------------------------------`);
      console.log(`Welcome, ${user.name}. Your access level is: ${user.position}`);
      console.log(`-------------------------------------------------------------`);
      console.log("What would you like to do?");

      if(user.position == 'ADMIN') {
        console.log(`(1) Add New Employee`);
        console.log(`(2) Add New Patient`);
      }

      // console.log("user input: ", input);
      user_input = input;
      // console.log(typeof input);
      rl.setPrompt("Your input: ");
      rl.prompt();
    }
   else {
     console.log("here")
     if(user.position == 'ADMIN' && input == "1") {
       console.log("User choose 1");
       user_input = "0";

       rl.setPrompt("Enter Position, Name, Username, Password ");
       rl.prompt();
     }
     else {
       console.log("Wrong input");
       user_input = "0";
     }
   }

  }




});
*/





//
