class Hospital {
    constructor(name, location) {
        this.name = name
        this.location = location
        this.employees = []
        this.patients = []
        this.rl = {};
        console.log("Welcome to " + this.name);
        console.log(`---------------------------------------------------`);
    }
    setRl(obj) {
        this.rl = obj;
    }
    addEmployee(employees) {
        this.employees.push(employees);
    }
    addPatient(patient) {
        this.patients.push(patient);
    }
    logIn(str, i = -1) {
        if (this.employees[0].hasOwnProperty('username')) {
            if (str === "username") {
                return this.checkUsername();
            } else if (str === "password") {
                return this.checkPassword(i);
            } else if (str == "menu") {
                return this.viewMenu(this.employees[i]);
            }
        } else {
            console.log("Belum ada karyawan, Tambahkan karyawan dahulu.");
        }
    }
    checkUsername() {
        this.rl.question('Masukan Username :\n', (jawab) => {
            for (let i = 0; i < this.employees.length; i++) {
                if (this.employees[i].username == jawab && this.employees[i].position == "office boy") {
                    console.log(`----------------Maaf ${this.employees[i].name}--------------------`);
                    console.log(`Untuk posisi ${this.employees[i].position} akses sistem ditolak.`);
                    console.log(`---------------------------------------------------`);
                    this.logIn("username")
                } else if (this.employees[i].username == jawab) {
                    return this.logIn("password", i);
                } else if (i == this.employees.length - 1) {
                    console.log("User Tidak ditemukan !");
                    return this.checkUsername();
                }
            }
        });
    }
    checkPassword(i) {
        this.rl.question('Masukan Password :\n', (jawab) => {
            if (this.employees[i].password == jawab) {
                return this.logIn("menu", i);
            } else {
                console.log("Password Salah!");
                return this.checkPassword(i);
            }
        });
    }
    viewMenu(obj) {
        console.log(`Welcome, ${obj.name}. Your access level is: ${obj.position}`);
        console.log(`---------------------------------------------------`);
        this.viewList(obj.position);
        this.rl.question('Masukan Pilihan :\n', (jawab) => {
            if (jawab.includes("list_patients")) {
                this.listPatient(obj);
            } else if (jawab.includes("view_records")) {
                this.viewRecords(obj, jawab[jawab.length - 1]);
            } else if (jawab.includes("add_records")) {
                this.addRecord(obj, jawab[jawab.length - 1]);
            } else if (jawab.includes("remove_records")) {
                this.removeRecord(obj, jawab[jawab.length - 3], jawab[jawab.length - 1]);
            } else if (jawab.includes("add_employees")) {
                this.insertEmployee(obj);
            } else if (jawab.includes("log_out")) {
                console.log(`------------------Good Bye---------------------`);
                console.log(`---------------------------------------------------`);
                console.log("Welcome to " + this.name);
                console.log(`---------------------------------------------------`);
                this.logIn("username");
            } else {
                console.log(`--------------Check Your Command-----------------`);
                console.log(`---------------------------------------------------`);
                this.viewMenu(obj);
            }
        });
    }
    viewList(position) {
        if (position == "receptionist") {
            console.log(`What would you like to do ?`);
            console.log(`Options : `);
            console.log(`list_patients`);
            console.log(`view_records <patient_id>`);
            console.log(`add_records <patient_id>`);
            console.log(`remove_records <patient_id> <record_id>`);
            console.log(`add_employees`);
            console.log(`log_out`);
        } else {
            console.log(`What would you like to do ?`);
            console.log(`Options : `);
            console.log(`list_patients`);
            console.log(`view_records <patient_id>`);
            console.log(`add_records <patient_id>`);
            console.log(`remove_records <patient_id> <record_id>`);
            console.log(`log_out`);
        }
    }
    listPatient(obj) {
        console.log(`------------------List Patient---------------------`);
        console.log(`---------------------------------------------------`);
        for (let i = 0; i < this.patients.length; i++) {
            console.log(`${i+1}. ${this.patients[i].name}`);
        }
        console.log(`---------------------------------------------------`);
        this.viewMenu(obj);
    }
    viewRecords(obj, ind) {
        console.log(`---------------------Record------------------------`);
        console.log(`-------------------${this.patients[ind-1].name}-------------------`);
        console.log(`---------------------------------------------------`);
        for (let i = 0; i < this.patients[ind - 1].diagnosis.length; i++) {
            console.log(`${this.patients[ind-1].diagnosis[i].id}. ${this.patients[ind-1].diagnosis[i].name}`);
        }
        console.log(`---------------------------------------------------`);
        this.viewMenu(obj);
    }
    addRecord(obj, ind) {
        let temp = {};
        console.log(`-------------------Add Record------------------------`);
        console.log(`-------------------${this.patients[ind-1].name}-------------------`);
        console.log(`---------------------------------------------------`);
        temp.id = this.patients[ind - 1].diagnosis.length + 1;
        this.rl.question('Masukan Diagnosis :\n', (jawab) => {
            temp.name = jawab;
            this.patients[ind - 1].diagnosis.push(temp);
            console.log(`---------------Success Add Record--------------------`);
            console.log(`---------------------------------------------------`);
            this.viewMenu(obj);
        });
    }
    removeRecord(obj, ind1, ind2) {
        console.log(`---------------------Record------------------------`);
        console.log(`-------------------${this.patients[ind1-1].name}-------------------`);
        console.log(`---------------------------------------------------`);
        this.patients[ind1 - 1].diagnosis.splice(ind2 - 1, 1);
        console.log(`---------------Success Delete Record--------------------`);
        console.log(`---------------------------------------------------`);
        this.viewMenu(obj);
    }
    insertEmployee(obj) {
        let temp = {};
        if (obj.position == "receptionist") {
            console.log(`Format Input data : Name,Position,Username,Password`);
            this.rl.question('Masukan Data :\n', (jawab) => {
                let str = jawab.split(",");
                temp.name = str[0];
                temp.position = str[1];
                temp.username = str[2];
                temp.password = str[3];
                this.employees.push(temp);
                console.log(`---------------Success Add Employee--------------------`);
                console.log(`---------------------------------------------------`);
                console.log(this.employees);
                this.viewMenu(obj);
            });
        } else {
            console.log(`---------------Maaf Akses diTolak--------------------`);
            console.log(`---------------------------------------------------`);
        }
    }
}
class Patient {
    constructor(id, name, diagnosis) {
        this.id = id
        this.name = name
        this.diagnosis = diagnosis
    }
    getPatient() {
        let temp = new Object();
        temp.id = this.id;
        temp.name = this.name;
        temp.diagnosis = this.diagnosis;
        return temp;
    }
}

class Employee {
    constructor(name, position, username, password) {
        this.name = name
        this.position = position
        this.username = username
        this.password = password
    }
    getEmployee() {
        let temp = new Object();
        temp.name = this.name;
        temp.position = this.position;
        temp.username = this.username;
        temp.password = this.password;
        return temp;
    }
}
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let myHospital = new Hospital("RS Usada Insani", "Ciledug");
myHospital.setRl(rl);
let myEmployee = new Employee("Wisnu", "receptionist", "wisnu", "123");
let myPatient1 = new Patient("1", "Joko", [{
    id: 1,
    name: "Sakit Perut"
}, {
    id: 2,
    name: "Mules"
}]);
let myPatient2 = new Patient("2", "Risma", [{
    id: 1,
    name: "Panas"
}, {
    id: 2,
    name: "Batuk"
}]);
myHospital.addEmployee(myEmployee.getEmployee());
myHospital.addPatient(myPatient1.getPatient());
myHospital.addPatient(myPatient2.getPatient());
myHospital.logIn("username");
