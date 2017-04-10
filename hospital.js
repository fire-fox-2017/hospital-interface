const readline = require('readline')
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
})

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.location = location
    this.employees = employees
    this.patients = patients
    this.dataPatients = []
    this.dataEmployee = []
    this.aksesUser = []
  }

  //tampilan awal masuk
  tampilanAwal(){
    console.log(`> welcome to ${this.name} Hospital \n----------------------------\n`)
        this.employeeLogin()
  }

  //Fungsi login, masukan username
  employeeLogin(){
    this.clean()
    console.log(`> welcome to ${this.name} Hospital \n----------------------------\n`)
    rl.question(`> Please enter your username : `, (answer)=>{
      this.dataEmployee.forEach((data) => {
        if(data.username == answer){
            this.aksesUser.push(data.username, data.password, data.position)
            this.password() //fungsi cek password
        }
      })

      if(!this.aksesUser.length){
        this.clean()
        console.log(`> there is no user with username ${answer}`);
        this.tampilanAwal()
      }
    })
  }

  //Fungsi cek psword
  password(){
      rl.question('\n> Please enter your password : ', (answer) =>{
        if(answer == this.aksesUser[1]){
          this.welcome(this.aksesUser)
        }
        else {
          console.log('> wrong password');
          this.password()
        }
      })
  }

  //Fungsi sudah masuk login, Fungsi melempar ke fungsi menu(menentukan akses)
  welcome(user){
    this.clean()
    console.log(`> welcome ${user[0]}. your access level is : ${user[2]}`);
    this.menu(user[2])
  }

  //Fungsi Menentukan Akses
  menu(akses){
    console.log('================================\nWhat would you like to do?\nOptions : ');
    switch(akses){
      case 'admin' :
        console.log('- add_employee')
        console.log('- add_patient')
        console.log('- list_employees');
        console.log('- list_patients');
        console.log('- view_records');
        console.log('- remove_record <patient_id> <record_id>');
        console.log('- logout');
        break;

      case 'doctor' :
        console.log('- list_patients')
        console.log('- view_records <patient_id>')
        console.log('- add_record <patient_id>')
        console.log('- remove_record <patient_id> <record_id>')
        console.log('- logout');
        break;

      case 'ob' :
        console.log('- logout');
        break;

      default: console.log('> logout');break;
    }
    this.command()
  }

  command(){
    rl.question('\nCommand > ', (answer)=>{
      switch(answer.split(' ')[0]){
        case 'list_employees': this.list_employees();this.back(); break //menampilkan employees
        case 'list_patients': this.list_patients();this.back(); break // menampilkan patients
        case 'add_employee': this.addEmployee(); break   // menambah employee
        case 'add_patient': this.addPatient(); break   // menambah patient
        case 'view_records': this.view_records(answer.split(' ')[1]); break // melihat record pasien, berbentuk array
        case 'add_record': this.add_record(answer.split(' ')[1]); break // menambah record pasien
        case 'remove_record': this.remove_record(answer.split(' ')[1],answer.split(' ')[2]); break
        case 'logout': this.aksesUser = []; this.clean();this.tampilanAwal(); break // keluar
        default: this.welcome(this.aksesUser) // salah input
      }
    })
  }

  //menampilkan list employee
  list_employees(){
    this.clean()
    console.log("List Employees");
    console.log("--------------");

    let i=0
    this.dataEmployee.forEach((data) =>{
      console.log(`${i}. | ${data.name} | ${data.position}`);
      i++;
    })
  }

  //menampilkan list Patients
  list_patients(){
    this.clean()
    console.log("List Patients");
    console.log("--------------");

    this.dataPatients.forEach((data) =>{
      console.log(`${data.id}. | ${data.name} | ${data.diagnosis}`);
    })
  }

  //Menambah data pasien
  addPatient(data){
    if(data!= undefined){
      this.dataPatients.push(data)
    }
    else {
      rl.question('Masukkan id,nama,diagnosis : ', (answer) =>{
        let input = answer.split(",")

        if(input.length ==3){
          this.addPatient(new Patient(input[0]), input[1], input[2])
          this.clean()
          this.welcome(this.aksesUser)
        }
        else{
          console.log('Format Salah')
          this.addPatient()
        }
      })
    }
  }

  //Menambah data pegawai
  addEmployee(data){
    if(data!= null){
        this.dataEmployee.push(data)
      }

    else{
      rl.question('\nMasukan nama,position,username,password : ', (answer)=>{
        let input = answer.split(",")

        if(input.length == 4){
          this.addEmployee(new Employee(input[0], input[1], input[2], input[3]))
          this.clean()
          this.welcome(this.aksesUser)
        }
        else{
          console.log('Format Salah')
          this.addEmployee()
        }
      })
    }
  }

  //tambah record pasien
  add_record(patient_id){
    rl.question('Ada penyakit tambahan? ', (answer)=>{
      this.dataPatients.forEach((data)=>{
          if(data.id == patient_id){
            data.diagnosis.push(answer)
            this.back()
          }
      })
    })
  }

  view_records(patient_id){
    this.dataPatients.forEach((data)=>{
      if(data.id == patient_id){
        console.log(`ID | Nama`)
        console.log(`${data.id}  | ${data.name}`)
        console.log('\nRecord Penyakitnya : ')
        let i = 1;
        data.diagnosis.forEach((penyakit)=>{
          console.log(`${i} ${penyakit}` )
          i++
        })
      }
      this.back()
    })
  }

  remove_record(patient_id, diagnosis_no){
    this.dataPatients.forEach((data)=>{
      if(data.id == patient_id){
        let i=1
        data.diagnosis.forEach((diagnosisNya)=>{
          if(i == diagnosis_no){
            data.diagnosis.splice(i-1,1)
          }
          i++
        })
      }
    })
    this.back()
  }

  back(){
    rl.question('\n Press Enter to go back > ', (answer)=>{
      if(!answer){
        this.welcome(this.aksesUser)
      }
      else{
        this.back()
      }
    })
  }

  // Hapus console log(bersihkan layar)
  clean(){
    console.log("\x1B[2J")
  }

}// PENUTUP CLASS HOSPITAL

////////////////////////////////////////////////////////////////////////////////
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = [diagnosis]
  }
}


////////////////////////////////////////////////////////////////////////////////
class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

//tampilanAwal=>employeeLogin=>password==>welcome(cek akses levelnya)=>menu(menentukan menu)=>command

let siloam = new Hospital("Siloam", "Jaksel", 5, 5)
siloam.addPatient(new Patient(1, "Kaleb Wandy", "MuntaBer"))
siloam.addPatient(new Patient(2, "Anzani", "HIV Aids"))
siloam.addPatient(new Patient(3, "Bill", "HIV Aids"))
siloam.addPatient(new Patient(4, "Edim", "Ebola"))
siloam.addEmployee(new Employee("Dazzle", "doctor", "dota", "dota")) // name,role, username, password
siloam.addEmployee(new Employee("Oscar Hermawan", "admin", "oscar", "oscar")) // name,role, username, password
siloam.addEmployee(new Employee("Edim", "ob", "edim", "edim")) // name,role, username, password
siloam.tampilanAwal()