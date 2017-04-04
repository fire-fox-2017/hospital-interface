class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
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
let patients = [];
let p1 = new Patient(1, "Baba", "Hamstring");

patients.push(p1);

// create hospital
let hospital = new Hospital();










//
