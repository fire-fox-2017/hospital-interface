class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }
}

class Patient {
  constructor(id, name, records) {
    this.id = id;
    this.name = name;
    this.records = records;
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
    if (position.toLowerCase() === "admin") {
      return "admin";
    } else if (position.toLowerCase() === "doctor") {
      return "doctor";
    } else if (position.toLowerCase() === "employee"){
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
    this.patients = this.hospital.patients;
    this.user = "";
    this.access_level = "";
    this.menuList = ["list_patients                                         to show the patients list",
					 "add_patient <name>                                    to register new patient",
					 "remove patient <patient_id>                           to remove patient from the data",
                     "view_records <patient_id>                             to show a patient's record",
                     "add_record <patient_id> <keyword> <record_content>    to add record to a patient",
                     "remove_record <patient_id> <record_id>                to remove a record of a patient",
                     "list_accounts                                         to show the registered accounts",
                     "add_account <name> <position> <username> <password>   to register new account to the system",
                     "remove_account <username>                             to remove an account from the sytem",
                     "log_out                                               to stop using the terminal"];
    this.border = "--------------------------------------------------------------------------------------";
  }


  initApp() {
    console.log("\nWELCOME to " + this.hospital.name.toUpperCase() + " HOSPITAL");
    console.log(this.border);
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
    console.log(this.border);
    console.log(`Welcome, ${this.user}. Your access level is: ${this.access_level.toUpperCase()}`);
    console.log(this.border);
    this.menu();
  }

  menu() {
    let question = `What would you like to do?`;
    let optionTitle = `Options: `;
    let fullMenu = this.menuList.length - 1;
    let options = 0;
    if (this.access_level === "admin") {
      console.log(question);
      console.log(optionTitle);
      options = fullMenu;
    } else if (this.access_level === "doctor") {
      console.log(question);
      console.log(optionTitle);
      options = 6;
    } else if (this.access_level === "employee") {
      console.log(question);
      console.log(optionTitle);
      options = 6;
    } else {
      console.log("Thank you for logging in, however you are not authorized to use this terminal.")
      console.log("Logging out..");
      process.exit();
    }
    for (let i = 0; i < options; i++) {
      console.log(this.menuList[i]);
    }
    console.log(this.menuList[fullMenu]);
    console.log(this.border);
    this.menuSelect();
  }
  
  menuSelect() {
	rl.question("> ", (selection) => {
	  let command = selection.split(" ");
	  if (command[0] === "list_patients") {
		this.listPatients();
	  } else if (command[0] === "log_out") {
		this.logOut();
	  } else if (command[0] === "view_records") {
		this.viewRecord(Number(command[1]));
	  } else if (command[0] === "add_patient") {
		let name = [];
		for (let i = 1; i < command.length; i++) {
		  name.push(command[i]);
	    }
		this.addPatient(name.join(" "));
	  } else if (command[0] === "remove_patient") {
		this.removePatient(Number(command[1]));
	  } else if (command[0] === "add_record") {
		let content = [];
		for (let i = 3; i < command.length; i++) {
	      content.push(command[i]);
		}
		this.addRecord(Number(command[1]), command[2], content.join(" "));
	  } else if (command[0] === "remove_record") {
		this.removeRecord(Number(command[1]), Number(command[2]));
	  } else if (command[0] === "add_account") {
	    if (this.access_level === "admin" && command.length < 5) {
		  console.log("Please re-check the required input for new account.");
		} else {
		  this.addAccount(command[1], command[2], command[3], command[4]);
		} 
	  } else if (command[0] === "remove_account") {
	    this.removeAccount(command[1]);
	  } else if (command[0] === "list_accounts") {
		this.listAccounts();
      } else {
		console.log("Command is not found./n");
		this.menu();
	  }
    });
  }
  
  listPatients() {
	console.log("\nID  Patient Name");
	for (let i = 0; i < this.patients.length; i++) {
	  console.log(`${this.patients[i].id}   ${this.patients[i].name}`);
	}
	console.log("\n");
	this.menu();
  }
  
  addPatient(name) {
    if (name.length > 0) {
      let id = this.assignPatientID();
	  let patient = new Patient(id, name, []);
	  this.patients.push(patient);
	  console.log(`The new patient ${name} with id = ${id} has been successfully added.\n`); 
	  this.listPatients();
	} else {
	  console.log("Please insert the patient name after the command.");
	  this.menu();
	}	
  }
  
  removePatient(patientID) {
    let index = this.findPatientIndex(patientID);
    if(index !== null) {
	  console.log(`Patient ${this.patients[index].name} with id = ${patientID} has been successfully removed.`);
	  this.patients.splice(index,1);
	  this.listPatients();
	} else {
	  console.log(`Patient ID = ${patientID} cannot be found in the database.`);
	  console.log("\n");
	  this.menu();
	}
  }
  
  viewRecord(patientID) {
	let index = this.findPatientIndex(patientID);
	if (index !== null) {
	  console.log(this.patients[index]);
	  console.log("\n");
	  this.menu();
	} else {
	  console.log(`Patient ID cannot be found in the database.`);
	  console.log("\n");
	  this.menu();
	}
  }
  
  addRecord(patientID, keyword, content) {
	let patientIndex = this.findPatientIndex(patientID);
	if (patientIndex !== null) {
	  let id = this.assignRecordID(patientID);
	  let record = {};
	  record["id"] = id;
	  record[keyword] = content;
	  this.patients[patientIndex].records.push(record);
	  console.log(`The records of patient ${this.patients[patientIndex].name} with id = ${patientID} has been updated.\n`);
      this.viewRecord(patientID); 
	} else {
	  console.log(`Patient ID cannot be found in the database.`);
	  console.log("\n");
	  this.menu();
	}
  }
  
  removeRecord(patientID, recordID) {
	let patientIndex = this.findPatientIndex(patientID);
	let recordIndex = this.findRecordIndex(patientID, recordID);
	if (patientIndex === null) {
	  console.log(`Patient ID cannot be found in the database.`);
	  console.log("\n");
	  this.menu();
	} else if(recordIndex === null) {
	  console.log(`Record ID = ${recordID} cannot be found in patient with ID = ${patientID}.`);
	  console.log("\n");
	  this.menu();
	} else {
	  console.log("Record has been removed.");
	  this.patients[patientIndex].records.splice(recordIndex, 1);
	  this.viewRecord(patientID);
	}
  }
  
  addAccount(name, position, username, password) {
	if (this.access_level === "admin") {
	  if (position.toLowerCase() === "admin" || position === "doctor" || position === "employee" || position === "office boy") {
	    let employee = new Employee(name, position, username, password);
        this.employees.push(employee);
        console.log("New account has been successfully created.\n");
        this.menu();
	  } else {
		console.log("the entered 'position' is not recognized.\n");
		this.menu();
	  }
	} else {
	  console.log("Command is not found.\n");
	  this.menu();
	}
  }
  
  removeAccount(username) {
    if (this.access_level === "admin") {
      let employeeIndex = this.findEmployeeIndex(username);
      if (employeeIndex !== null) {
		this.employees.splice(employeeIndex, 1);
	    console.log("New account has been successfully created.\n");
	    this.menu();
	  } else {
		console.log("Username is not found in the system.");
		this.menu();
	  }     
	} else {
	  console.log("Command is not found.\n");
	  this.menu();
	}  
  }
  
  listAccounts() {
     if (this.access_level === "admin") {
	   console.log(this.employees);
	   console.log("\n");
	   this.menu();
	 } else {
	   console.log("Command is not found.\n");
	   this.menu();
	} 
  }
  
  logOut() {
	console.log(this.border);
	console.log(`Thank you for using ${this.hospital.name.toUpperCase()} HOSPITAL terminal, we hope to see you soon.`);
	console.log(this.border);
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
  
  findPatientIndex(patientID) {
	let index = null;
	for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === patientID) {
		index = i;
	  }
	}
	return index;
  }
  
  assignPatientID() {
	let id = 1;
	while (this.findPatientIndex(id) !== null) {
	  id++;
    }
    return id;
  }
  
  findRecordIndex(patientID, recordID) {
	let patientIndex = this.findPatientIndex(patientID);
	let index = null;
	for (let i = 0; i < this.patients[patientIndex].records.length; i++) {
      if (this.patients[patientIndex].records[i].id === recordID) {
		index = i;
	  }
	}
	return index;
  }
  
  assignRecordID(patientID) {
	let id = 1;
	while (this.findRecordIndex(patientID, id) !== null) {
	  id++;
    }
    return id;
  }
  
  findEmployeeIndex(username) {
    let index = null;
	for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].username === username) {
		index = i;
	  }
	}
	return index;
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
let ucok = new Patient(1, "Ucok", [{id: 1, diagnosis: "Malaria"}]);
let joko = new Patient(2, "Joko", [{id: 1, diagnosis: "Kutu air"}]);
patients.push(ucok);
patients.push(joko);

// Creates hospital
let hospital = new Hospital("mystic", "somewhere", employees, patients);

// Initializes the interface
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

let hosInt = new Process(hospital);
hosInt.initApp();
