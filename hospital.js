const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class Hospital {
    constructor(name, location) {
        this.name = name
        this.employees = []
        this.patients = []
        this.location = location
    }
    login() {
        console.log(`----------------------------------------------------------------`);
        console.log(`Welcome to ${this.name} hospital`);
        console.log(`----------------------------------------------------------------`);
        rl.question('Please enter your username:', (answer) => {
            if (this.checkUsername(answer)) {
                if (this.validateAccount(answer)) {
                    console.log(`----------------------------------------------------------------`);
                    console.log(`Welcome ${answer} You are logged in as patient, Your diagnosis :`)
                    return this.displayMenuPatient(answer)
                } else {
                    return this.validatePassword(answer);
                }

            } else {
                console.log('The username that you have entered does not match any account.')
                return this.login()

            }
        })
    }
    validatePassword(username) {
        rl.question('Please enter your password:', (line) => {
            if (this.checkPassword(line)) {
                console.log(`----------------------------------------------------------------`);
                console.log(`Welcome ${this.findName(username)} You are logged in as ${this.findPosition(username)}`)
                return this.displayMenu(username)

            } else {
                console.log('The password are incorrect.')
                return this.login()

            }
        })
    }
    checkUsername(username) {
        for (let i = 0; i < this.employees.length; i++) {
            if (username === this.employees[i].username) {
                return true
            }
        }

        for (let j = 0; j < this.patients.length; j++) {
            if (username === this.patients[j].name) {
                return true
            }
        }

        return false

    }
    validateAccount(username) {
        for (let j = 0; j < this.patients.length; j++) {
            if (username === this.patients[j].name) {
                return true
            }
        }
        return false

    }


    checkPassword(password) {
        for (let i = 0; i < this.employees.length; i++) {
            if (password === this.employees[i].password) {
                return true
            }
        }

        return false
    }
    findName(username) {
        for (let i = 0; i < this.employees.length; i++) {
            if (username === this.employees[i].username) {
                return this.employees[i].name;
            }
        }
    }
    findPosition(username) {
        for (let i = 0; i < this.employees.length; i++) {
            if (username === this.employees[i].username) {
                return this.employees[i].position;
            }
        }
    }
    validateAdmin(username) {
        if (this.findPosition(username) === 'Admin') {
            return true
        }
    }
    validateDoctorOrAdmin(username) {
        if (this.findPosition(username) === 'Doctor' || this.findPosition(username) === 'Admin') {
            return true
        }
    }
    listPatients() {
        console.log(`----------------------------------------------------------------`);
        console.log(`ID | Name | Diagnosis`)
        for (let i = 0; i < this.patients.length; i++) {
            console.log(`${this.patients[i].id} | ${this.patients[i].name} | ${this.patients[i].diagnosis}`)
        }
        console.log(`----------------------------------------------------------------`);
    }
    viewRecords(id) {
        console.log(`----------------------------------------------------------------`);
        console.log(`ID | Name | Diagnosis`)
        let bool=false;
        for (let i = 0; i < this.patients.length; i++) {
            if (this.patients[i].id === id) {
                console.log(`${this.patients[i].id} | ${this.patients[i].name} | ${this.patients[i].diagnosis}`)
                bool=true;
            }
        }
        if(bool===false){
          console.log(`no record of id : ${id}`)
        }
        console.log(`----------------------------------------------------------------`);
    }
    addRecord(name, diagnosis) {
        this.addNewPatient(new Patient((Number(this.patients[this.patients.length - 1].id) + 1).toString(), name, diagnosis));

        console.log('Patient has been successfully added!')
        console.log(`----------------------------------------------------------------`);
    }
    removeRecord(id) {
        for (let i = 0; i < this.patients.length; i++) {
            if (this.patients[i].id === id) {
                this.patients.splice(i, 1)
                console.log('Patient has been successfully removed!')
            }
        }
        console.log(`----------------------------------------------------------------`);
    }
    listEmployees() {
        console.log(`----------------------------------------------------------------`);
        console.log(`Name | Position`)
        for (let i = 0; i < this.employees.length; i++) {
            console.log(`${this.employees[i].name} | ${this.employees[i].position}`)
        }
        console.log(`----------------------------------------------------------------`);
    }

    addEmployee(name, position, username, password) {
        this.addNewEmployee(new Employee(name, position, username, password));
        console.log('Employee has been successfully added!')
        console.log(`----------------------------------------------------------------`);
    }
    removeEmployee(name) {
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].name === name) {
                this.employees.splice(i, 1)
                console.log('Employee has been successfully removed!')
            }
        }
        console.log(`----------------------------------------------------------------`);
    }

    findRecordPatient(patient) {
        for (let j = 0; j < this.patients.length; j++) {
            if (patient === this.patients[j].name) {
                return this.patients[j]
            }
        }
    }



    displayMenuPatient(patient) {
        let patientRecord = this.findRecordPatient(patient);


        console.log(`----------------------------------------------------------------`);
        for (var i = 0; i < patientRecord.diagnosis.length; i++) {
            console.log(`${i+1}. ${patientRecord.diagnosis[i]}`)
        }
        rl.question('Press [ENTER] to log out:', (answer) => {
            return this.login();
        });
    }
    addpatientDiagnosis(id, diagnosis) {
        for (let j = 0; j < this.patients.length; j++) {
            if (id === this.patients[j].id) {
                this.patients[j].diagnosis.push(diagnosis);
            }
        }


    }

    accessDenied(username) {
        console.log('You do not have access to this feature')
        console.log(`----------------------------------------------------------------`);
        return this.displayMenu(username)
    }

    invalidArg() {
        console.log('Invalid Argument')

    }



    displayMenu(username) {
        console.log('Options:')
        console.log('1 list_patients')
        console.log('2 view_patient <patient_id>')
        console.log('3 add_patient <patient_name> <diagnosis>')
        console.log('4 add_patient_diagnosis <patient_id> <diagnosis>')
        console.log('5 remove_patient <patient_id>')
        console.log('6 list_employees')
        console.log('7 add_employee <name> <position> <username> <password>')
        console.log('8 remove_employee <employee_name>')
        console.log('0 logout')
        rl.question('Enter command : ', (line) => {
            line.trim();
            line = line.split(" ")
            switch (line[0]) {
                case '1':
                    if (this.validateDoctorOrAdmin(username)) {
                        this.listPatients()
                        return this.displayMenu(username)
                    } else {
                        this.accessDenied(username);
                    }
                    break;
                case '2':
                    if (this.validateDoctorOrAdmin(username)) {
                        if (line.length !== 2) {
                            this.invalidArg();
                            return this.displayMenu(username)
                        } else {
                            this.viewRecords(line[1])
                            return this.displayMenu(username)
                        }

                    } else {
                        this.accessDenied(username);
                    }
                    break;
                case '3':
                    if (this.validateDoctorOrAdmin(username)) {
                        if (line.length !== 3) {
                            this.invalidArg();
                            return this.displayMenu(username)
                        } else {
                            this.addRecord(line[1], line[2])
                            return this.displayMenu(username)
                        }
                    } else {
                        this.accessDenied(username);
                    }
                    break;
                case '4':
                    if (this.validateDoctorOrAdmin(username)) {
                        if (line.length !== 3) {
                            this.invalidArg();
                            return this.displayMenu(username)
                        } else {
                            this.addpatientDiagnosis(line[1], line[2]);
                            return this.displayMenu(username)
                        }
                    } else {
                        this.accessDenied(username);
                    }
                    break;
                case '5':
                    if (this.validateDoctorOrAdmin(username)) {
                        if (line.length !== 2) {
                            this.invalidArg();
                            return this.displayMenu(username)
                        } else {

                            this.removeRecord(line[1])
                            return this.displayMenu(username)
                        }
                    } else {
                        this.accessDenied(username);
                    }

                    break;
                case '6':
                    if (this.validateAdmin(username)) {
                        this.listEmployees()
                        return this.displayMenu(username)
                    } else {
                        this.accessDenied(username);
                    }
                    break;

                case '7':
                    if (this.validateAdmin(username)) {
                        if (line.length !== 5) {
                            this.invalidArg();
                            return this.displayMenu(username)
                        } else {
                            this.addEmployee(line[1], line[2], line[3], line[4])
                            return this.displayMenu(username)
                        }
                    } else {
                        this.accessDenied(username);
                    }

                    break;
                case '8':
                    if (this.validateAdmin(username)) {
                        if (line.length !== 2) {
                            this.invalidArg();
                            return this.displayMenu(username)
                        } else {
                            this.removeEmployee(line[1])
                            return this.displayMenu(username)
                        }
                    } else {
                        this.accessDenied(username);
                    }

                    break;
                case '0':
                    console.log('You have logged out successfully')
                    return this.login()

                    break;
                default:
                    invalidArg()
                    return this.displayMenu(username)
            }
        });
    }

    addNewPatient(obj) {
        this.patients.push(obj);
    }

    addNewEmployee(obj) {
        this.employees.push(obj);


    }

    static initApp() {

        var rumahSakit = new Hospital('Husada', 'jalan tebet')
        rumahSakit.addNewPatient(new Patient('1', 'cumi', 'Demam Berdarah'));
        rumahSakit.addNewPatient(new Patient('2', 'Rama', 'Kencing Manis'));
        rumahSakit.addNewEmployee(new Employee('Indra', 'Dokter', 'indra', 'indra'));
        rumahSakit.addNewEmployee(new Employee('Ivan', 'Admin', 'ivan', 'ivan'));
        rumahSakit.addNewEmployee(new Employee('Orang', 'OfficeBoy', 'orang', 'orang'));
        rumahSakit.login()

    }
}

class Patient {
    constructor(id, name, diagnosis) {
        this.id = id
        this.name = name
        this.diagnosis = []
        this.diagnosis.push(diagnosis)
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

Hospital.initApp();
