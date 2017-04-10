const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
}

class Employee {
  constructor(name, username, password) {
    this.name = name;
    this.username = username;
    this.password = password;
  }
}

class Doctor extends Employee {
  constructor(name, username, password) {
    super(name, username, password);
    this.role = 'dokter';
  }
}

class Admin extends Employee {
  constructor(name, username, password) {
    super(name, username, password);
    this.role = 'admin';
  }
}

class Receptionist extends Employee {
  constructor(name, username, password) {
    super(name, username, password);
    this.role = 'receptionist';
  }
}

class OfficeBoy extends Employee {
  constructor(name, username, password) {
    super(name, username, password);
    this.role = 'officeboy';
  }
}

class Hospital {
  constructor(name, location) {
    this.name = name
    this.location = location;
    this.employees = [];
    this.patients = [];
    this.patientIndex = 0;
    this.user = '';
    this.pass = '';
    this.role = '';

  }

  addEmployeeData(data) {
    this.employees.push(data);
  }

  start() {
    console.log(`==========================\n${this.name}\n${this.location}\n==========================\n`)
    console.log(this.employees);
      rl.question(`Masukkan username: `, (line) => {
        this.cekUser(line);
      });
  }

  cekUser(line) {
    for(let i = 0; i < this.employees.length; i++) {
      if(line===this.employees[i].username){
        this.user = this.employees[i].name;
        this.role = this.employees[i].role;
        this.pass = this.employees[i].password;
        this.cekPass();
      }
    }
    console.log(`\nUsername tidak terdaftar`);
    this.start();
  }

  cekPass() {
    rl.question(`Masukkan password: `, (line) => {
      if(line == this.pass) {
        this.menuAwal();
      } else {
        console.log(`Password salah`)
        this.cekPass();
      }
    });
  }

  menuAwal() {
    console.log(`Halo ${this.user}! (Role: ${this.role})`);
    console.log(`==========================\nWhat would you like to do`);
    console.log(`[1] list patient\n[2] view patient\n[3] add patient\n[4] delete patient\n[5] add employees\n[6] list employees\n[7] log out\n[8] quit\n==========================`);
    rl.question(`Masukkan nomor pilihan anda: `, (line) => {
      switch(line) {
        case '1':
        this.listPatient();
        break;

        case '2':
        this.detailsPatient();
        break;

        case '3':
        this.addPatient();
        break;

        case '4':
        this.deletePatient();
        break;

        case '5':
        this.addEmployee();
        break;

        case '6':
        this.listEmployee();
        break;

        case '7':
        this.start();
        break;

        case '8':
        rl.close();
        break;

        default:
        this.menuAwal();
      }
    });
  }

  listPatient() {
    if(this.role === 'officeboy') {
      console.log(`You have no access`);
    } else if(this.patients.length === 0) {
      console.log('there are no patient in this hospital.');
    } else {
      for(var i = 0; i < this.patients.length; i++) {
        console.log(`ID:${this.patients[i].id} Nama: ${this.patients[i].name}`);
      }
    }
    this.menuAwal();
  }

  detailsPatient() {
    if(this.role=='officeboy'){
      console.log(`You have no access`);
      this.menuAwal();
    } else if(this.patients.length === 0){
      console.log('there are no patient in this hospital.');
      this.menuAwal();
    } else {
      rl.question(`Masukkan ID pasien atau nol (0) untuk keluar: `, (line) => {
        if(line > 0 && line <= this.patients.length) {
          if(this.role === 'receptionist') {
            console.log(`\nID: ${this.patients[line - 1].id}\nNama: ${this.patients[line - 1].name}`);
          } else {
            console.log(`\nID: ${this.patients[line - 1].id}\nNama: ${this.patients[line - 1].name}\nDiagnosa: ${this.patients[line - 1].diagnosis}`);
          }
          this.menuAwal();
        } else if(line == 0) {
          this.menuAwal();
        } else {
          console.log(`Nomor ID tidak ditemukan`);
          this.detailsPatient();
        }
      });
    }
  }

  addPatient() {
    let nama,diagnosis;
    if(this.role === 'officeboy') {
      console.log(`You have no access`);
      this.menuAwal();
    } else {
      rl.question(`Masukkan nama pasien atau masukkan 0 untuk keluar: `, (line) => {
        if (line==0){
          this.menuAwal();
        } else {
          nama = line;
          console.log(`Sukses menginput nama`);
          rl.question(`Masukkan diagnosis atau masukkan 0 untuk keluar: : `, (line) => {
            if(line==0){
              this.menuAwal();
            } else {
              diagnosis = line;
              console.log(`Sukses menginput diagnosa`);
              this.patients.push(new Patient(this.patientIndex+ 1, this.name = nama, this.diagnosis = diagnosis));
              console.log(this.patients[this.patients.length-1]);
              this.patientIndex++;
              this.menuAwal();
            }
          });
        }
      });
    }
  }

  deletePatient() {
    if(this.role === 'officeboy') {
      console.log(`You have no access`);
      this.menuAwal();
    } else {
      rl.question(`Masukkan ID pasien (atau masukkan 0 untuk keluar): `,(line) => {
        if (line == 0){
          this.menuAwal();
        } else if(line > this.patientIndex) {
          console.log(`ID pasien salah.`);
          this.deletePatient();
        } else {
          let index=null;
          for(let i=0;i<this.patients.length;i++){
            if(line==this.patients[i].id){
              index=i;
            }
          }
          if(index===null){
            console.log(`ID pasien salah.`);
            this.deletePatient();
          } else {
            console.log(`Pasien dengan ID ${line} atas nama ${this.patients[index].name} telah dihapus.`);
            this.patients.splice(index, 1);
            this.menuAwal();
          }
        }
      });
    }
  }

  addEmployee() {
    let name, position, user, pass;
    if(this.role === 'admin') {
      console.log(`Welcome Admin ${this.user}!`);
      rl.question(`Masukkan nama karyawan (atau masukkan 0 untuk keluar): `, (line) => {
        if(line==0){
          this.menuAwal();
        }
        name = line;
        rl.question(`Masukkan posisi: dokter, admin, officeboy atau receptionist (atau masukkan 0 untuk keluar):`, (line) => {
          if(line==0){
            this.menuAwal();
          }
          position = line;
          rl.question(`Masukkan username (atau masukkan 0 untuk keluar): `, (line) => {
            if(line==0){
              this.menuAwal();
            }
            user = line;
            rl.question(`Masukkan password (atau masukkan 0 untuk keluar):  `, (line) => {
              if(line==0){
                this.menuAwal();
              }
              pass = line;
              console.log(`Penambahan sukses! (${name} - ${position} - USERNAME: ${user} - PASSWORD: ${pass}`);
              let karyawan = {
                name: name,
                username: user,
                password: pass,
              }
              switch(position) {
                case 'dokter':
                this.employees.push(new Doctor(karyawan.name,karyawan.username,karyawan.password));
                break;

                case 'admin':
                this.employees.push(new Admin(karyawan.name,karyawan.username,karyawan.password));
                break;

                case 'officeboy':
                this.employees.push(new OfficeBoy(karyawan.name,karyawan.username,karyawan.password));
                break;

                case 'receptionist':
                this.employees.push(new Receptionist(karyawan.name,karyawan.username,karyawan.password));
                break;
              }
              this.menuAwal();
            });
          });
        });
      });
    } else {
      console.log(`You have no access`);
      this.menuAwal();
    }
  }

  listEmployee() {
    if(this.role == 'admin') {
      console.log(`========Data karyawan=========`);
      for(var i = 0; i < this.employees.length; i++) {
        console.log(`${i + 1}. ${this.employees[i].role} ${this.employees[i].name}`)
      }
      this.menuAwal();
    } else {
      console.log(`You have no access`);
      this.menuAwal();
    }
  }
}

let mimin = new Admin('andi','andi123','000000');
let oz = new Doctor('ozzie','ozzie123','000000');
let obe = new OfficeBoy('obe','obe123','000000');
let lani = new Receptionist('lani sesukahati','lani123','000000');
let rumahSakit = new Hospital('RS Sumber Waras', 'DKI JAKARTA');

rumahSakit.addEmployeeData(mimin);
rumahSakit.addEmployeeData(oz);
rumahSakit.addEmployeeData(obe);
rumahSakit.addEmployeeData(lani);
rumahSakit.start();
