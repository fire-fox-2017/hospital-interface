const fs = require ('fs');

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

var Table = require('cli-table');

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }

  userLogin(){
    console.log(`Welcome to : ${this.name} Hospital`);
    console.log(`---------------------------------------`);
    this.inputUsername();
  }

  inputUsername(){
    console.log(`Please enter your username: `);
    rl.question(``, (dataUsername) => {
      // this.inputPassword(dataUsername);
      this.cekUsername(dataUsername);
    });
  }

  cekUsername(dataUsername){
    var cekUsername = [];
    for (var i = 0; i < this.employees.length; i++) {
      if(dataUsername == this.employees[i].username){
        cekUsername.push(this.employees[i]);
      }
    }

    if(cekUsername.length > 0){
      this.inputPassword(cekUsername);
    } else {
      this.inputUsername();
    }
  }

  inputPassword(dataUsername){
    console.log(`Please enter your password: `);
    rl.question(``, (dataPassword) => {
      this.inputCheckLogin(dataUsername, dataPassword);
    });
  }

  inputCheckLogin(dataUsername, dataPassword){
    var dataUser = dataUsername;

    if(dataPassword == dataUser[0].password){
      if(dataUser[0].position == 'admin'){
        var admin1 = new Admin(dataUser[0].name, dataUser[0].position, dataUser[0].username, dataUser[0].password);
        console.log(`Welcome, ${dataUser[0].name}. Your access level is: ADMINISTRATOR \n`);
        admin1.chooseMenu();
      } else if(dataUser[0].position == 'dokter'){
        var dokter1 = new Dokter(dataUser[0].name, dataUser[0].position, dataUser[0].username, dataUser[0].password);
        console.log(`Welcome, ${dataUser[0].name}. Your access level is: DOCTOR \n`);
        dokter1.chooseMenu();
      } else if(dataUser[0].position == 'resepsionis'){
        var resepsionis1 = new Resepsionis(dataUser[0].name, dataUser[0].position, dataUser[0].username, dataUser[0].password);
        console.log(`Welcome, ${dataUser[0].name}. Your access level is: RECEPTIONISTS \n`);
        resepsionis1.chooseMenu();
      } else if(dataUser[0].position == 'ob'){
        console.log('Hak akses anda tidak dapat mengakses data rumah sakit \n');
        this.inputUsername();
      }
    } else {
      this.inputPassword(dataUser);
    }
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
  }

  chooseMenu(){
    console.log('What would you like to do?');
    console.log(`Options: \n- list_patients \n- view_records <patient_id> \n- add_record \n- remove_record <patient_id> \n- Sign Out`);
    this.checkAnswer();
  }

  checkAnswer(){
    rl.question(``, (dataAnswer) => {
      var input = dataAnswer.split(' ');
      if(input[0] == 'list_patients'){
        this.listPatients();
      } else if(input[0] == 'view_records'){
        this.viewRecords(input[1]);
      } else if(input[0] == 'add_record'){
        this.addRecord();
      } else if(input[0] == 'remove_record'){
        this.removeRecord(input[1])
      } else if(dataAnswer == 'Sign Out'){
        rl.close();
      } else {
        console.log('Perintah Tidak Ditemukan');
        this.checkAnswer()
      }
    });
  }

  listPatients(){
    var table = new Table({
        head: ['No', 'Name', 'Diagnosis'],
        colWidths: [5, 20, 20]
      });

    for (var i = 0; i < objPasien.length; i++) {
      table.push(
        [`${i+1}`, `${objPasien[i].name}`, `${objPasien[i].diagnosis}`]
      );
    }
    // console.log(table.toString());
    return table;
    // this.chooseMenu();
    // console.log('a');
  }

  viewRecords(id){
    // console.log(id);
    var pasien1 = [];
    var table = new Table({
        head: ['No', 'Name', 'Diagnosis'],
        colWidths: [5, 20, 20]
      });

    for (var i = 0; i < objPasien.length; i++) {
      if(id == objPasien[i].id){
        pasien1.push(objPasien[i]);
      }
    }

    if(pasien1.length == 0){
      console.log('Data Tidak Ditemukan \n');
      this.chooseMenu();
    } else {
      table.push(
        [`${1}`, `${pasien1[0].name}`, `${pasien1[0].diagnosis}`]
      );

      return table;
      // console.log(table.toString());
      // this.chooseMenu();
    }
  }

  addRecord(){
    rl.question(`Masukkan data nama pasien dan diagnosis : `, (data_pasien) => {
      var dataPasien = data_pasien;
      // dataPasien = dataPasien.replace(/ +/g, "");
      dataPasien = dataPasien.split(',');

      var idPasien = this.getIdPasien();

      var dataPasienJadi = {id : idPasien, name : dataPasien[0], diagnosis: dataPasien[1]};
      var pasienBaru = objPasien;
      pasienBaru.push(dataPasienJadi);
      this.saveDataPasien(pasienBaru);
      this.listPatients();
    });
  }

  getIdPasien(){
    var id = 'P';
    var tmpId = objPasien[objPasien.length-1].id;
    var nomorId = tmpId.slice(1);
    var idFinal = id + (+nomorId + 1);

    return idFinal;
  }

  removeRecord(id){
    var indeksPasien = 0;
    var pasien = [];

    for (var i = 0; i < objPasien.length; i++) {
      if(id == objPasien[i].id){
        indeksPasien = i;
        pasien.push(objPasien[i]);
      }
    }

    if(pasien.length == 0){
      console.log('Data Tidak Ditemukan \n');
      this.chooseMenu();
    } else {
      var dataPasien = objPasien;
      dataPasien.splice(indeksPasien, 1);
      this.saveDataPasien(dataPasien);
      this.listPatients();
    }
  }

  saveDataPasien(dataPasien){
    fs.writeFile('data_pasien.json', JSON.stringify(dataPasien), function(err) {
            if (err) return console.log(err);
        });
  }

}

class Admin extends Employee {
  constructor(name, position, username, password){
    super(name, position, username, password);
  }

  chooseMenu(){
    console.log('What would you like to do?');
    console.log(`Options: \n- list_employee \n- view_employee <employee_id> \n- add_employee \n- remove_employee <employee_id> \n- list_patients \n- view_records <patient_id> \n- add_record \n- remove_record <patient_id> \n- Sign Out`);
    this.checkAnswer();
  }

  checkAnswer(){
    rl.question(``, (dataAnswer) => {
      var input = dataAnswer.split(' ');
      if(input[0] == 'list_employee'){
        this.listEmployee();
      } else if(input[0] == 'add_employee'){
        this.addEmployee();
      } else if(input[0] == 'view_employee'){
        this.viewEmployee(input[1]);
      } else if(input[0] == 'remove_employee'){
        this.removeEmployee(input[1]);
      } else if(input[0] == 'list_patients'){
        this.listPatients();
      } else if(input[0] == 'view_records'){
        this.viewRecords(input[1]);
      } else if(input[0] == 'add_record'){
        this.addRecord();
      } else if(input[0] == 'remove_record'){
        this.removeRecord(input[1])
      } else if(dataAnswer == 'Sign Out'){
        rl.close();
      } else {
        console.log('Perintah Tidak Ditemukan');
        this.chooseMenu();
      }
    });
  }

  listEmployee(){
    var table = new Table({
        head: ['No', 'Name', 'Position', 'Username'],
        colWidths: [5, 20, 20, 20]
      });

    for (var i = 0; i < objKaryawan.length; i++) {
      table.push(
        [`${i+1}`, `${objKaryawan[i].name}`, `${objKaryawan[i].position}`, `${objKaryawan[i].username}`]
      );
    }
    console.log(table.toString());
    this.chooseMenu();
  }

  addEmployee(){
    rl.question(`Masukkan data nama karyawan, posisi, username dan password : `, (data_karyawan) => {
      var dataKaryawan = data_karyawan;
      // dataKaryawan = dataKaryawan.replace(/ +/g, "");
      dataKaryawan = dataKaryawan.split(',');

      var idKaryawan = this.getId();

      var dataKaryawanJadi = {id : idKaryawan, name : dataKaryawan[0], position: dataKaryawan[1], username: dataKaryawan[2], password: dataKaryawan[3]};
      var karyawanBaru = objKaryawan;
      karyawanBaru.push(dataKaryawanJadi);
      this.saveData(karyawanBaru);
      this.listEmployee();
    });
  }

  getId(){
    var id = 'K';
    var tmpId = objKaryawan[objKaryawan.length-1].id;
    var nomorId = tmpId.slice(1);
    var idFinal = id + (+nomorId + 1);

    return idFinal;
  }

  viewEmployee(id){
    var employee1 = [];
    var table = new Table({
        head: ['No', 'Name', 'Position', 'Username'],
        colWidths: [5, 20, 20, 20]
      });

    for (var i = 0; i < objKaryawan.length; i++) {
      if(id == objKaryawan[i].id){
        employee1.push(objKaryawan[i]);
      }
    }

    if(employee1.length == 0){
      console.log('Data Tidak Ditemukan \n');
      this.chooseMenu();
    } else {
      table.push(
        [`${1}`, `${employee1[0].name}`, `${employee1[0].position}`, `${employee1[0].username}`]
      );

      console.log(table.toString());
      this.chooseMenu();
    }


  }

  removeEmployee(id){
    var indeksKaryawan = 0;
    var karyawan = [];

    for (var i = 0; i < objKaryawan.length; i++) {
      if(id == objKaryawan[i].id){
        indeksKaryawan = i;
        karyawan.push(objKaryawan[i]);
      }
    }

    if(karyawan.length == 0){
      console.log('Data Tidak Ditemukan \n');
      this.chooseMenu();
    } else {
      var dataKaryawan = objKaryawan;
      dataKaryawan.splice(indeksKaryawan, 1);
      this.saveData(dataKaryawan);
      this.listEmployee();
    }


  }

  saveData(data){
    fs.writeFile('data_karyawan.json', JSON.stringify(data), function(err) {
            if (err) return console.log(err);
        });
  }

  listPatients(){
    var daftarPasien = super.listPatients();
    console.log(daftarPasien.toString());
    this.chooseMenu();
  }

  viewRecords(id){
    var dataPasien = super.viewRecords(id);
    console.log(dataPasien.toString());
    this.chooseMenu();
  }

  addRecord(){
    super.addRecord();
  }

  removeRecord(id){
    super.removeRecord(id);
  }


}

class Dokter extends Employee {
  constructor(name, position, username, password){
    super(name, position, username, password);
  }
  chooseMenu(){
    super.chooseMenu();
  }

  listPatients(){
    var daftarPasien = super.listPatients();
    console.log(daftarPasien.toString());
    this.chooseMenu();
  }

  viewRecords(id){
    var dataPasien = super.viewRecords(id);
    console.log(dataPasien.toString());
    this.chooseMenu();
  }

  addRecord(){
    super.addRecord();
  }

  removeRecord(id){
    super.removeRecord(id);
  }
}

class Resepsionis extends Employee {
  constructor(name, position, username, password){
    super(name, position, username, password);
  }
  chooseMenu(){
    super.chooseMenu();
  }

  listPatients(){
    var daftarPasien = super.listPatients();
    console.log(daftarPasien.toString());
    this.chooseMenu();
    // console.log('a');
  }

  viewRecords(id){
    var dataPasien = super.viewRecords(id);
    console.log(dataPasien.toString());
    this.chooseMenu();
  }

  addRecord(){
    super.addRecord();
  }

  removeRecord(id){
    super.removeRecord(id);
  }
}

var objKaryawan = JSON.parse(fs.readFileSync('data_karyawan.json','utf-8'));
var objPasien = JSON.parse(fs.readFileSync('data_pasien.json','utf-8'));

let hospital1 = new Hospital('RS Hermina','Jakarta Selatan', objKaryawan, objPasien);
hospital1.userLogin();
