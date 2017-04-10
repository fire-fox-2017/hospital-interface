"use strict"
// write your code here
import Model from "./model.js"
import View from "./view.js"

class Controller{
  constructor(){
    this._model = new Model();
    this._view = new View();
    this._rl;
    this._index=1;
  }

  initTampilan(){
    const readline = require('readline');
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._view.tampilAwal();
  }
  cariUsername(input)
  {
    let list = this._model.list;
    for(let i=0; i<list.length;i++)
    {
      if(input===list[i].nama)
      {
        return true;
      }
    }
    return false;
  }
  cariPassword(username,password)
  {
    let list = this._model.list;
    for(let i=0; i<list.length;i++)
    {
      if(username===list[i].nama && password===list[i].password)
      {
        this.index=i;
        return true
      }
    }
    return false;
  }
  cariIndex(username,password)
  {
    let list = this._model.list;
    for(let i=0; i<list.length;i++)
    {
      if(username ===list[i].nama &&password===list[i].password)
      {
        return i;
      }
    }
  }

  inputUsername(){
    this._rl.question("Please enter your username: ", (username) => {
      if (this.cariUsername(username)){
        this.inputPassword(username);
        this._username=username;
      }
      else {
        console.log("Wrong Username! please try again");
        this.inputUsername();
      }
    });
  }

  inputPassword(username){
    this._rl.question("Please enter your password: ", (password) => {
      if (this.cariPassword(username,password)) {
        let index=this.cariIndex(username,password);
        this._view.tampilMenu(this._model.list[index]);
        if(this._model.list[index].role==="Dokter"||this._model.list[index].role==="Receptionist")
        this.inputPerintahPasien(this._model.listPasien);
        else if(this._model.list[index].role==="Admin"){
          this.inputPerintahPegawai(this._model.list);
        }
      }
      else {
        console.log("Wrong Password! please try again");
        this.inputPassword(username);
      }
    });
  }

  inputPerintahPasien(list){
    this._rl.question("Please enter an order: ", (perintah) => {
      let perintahsplit=perintah.split(' ');
      if (perintah==="list_patients") {
        this._view.tampilPasien(list);
        this.inputPerintahPasien(list);
      }
      else if (perintahsplit[0]==="view_records") {
        this._view.tampilRecordPasien(list,Number(perintahsplit[1]));
        this.inputPerintahPasien(list);
      }
      else if (perintahsplit[0]==="add_record") {
        for(let i=0; i<this._model.listPasien.length; i++){
          if(i===Number(perintahsplit[1])-1)
          this.addPasienRecord(this._model.listPasien[i],perintahsplit[2]);
          break;
        }
        this.inputPerintahPasien(list);
      }
      else if (perintahsplit[0]==="remove_record") {
        for(let i=0; i<this._model.listPasien.length; i++){
          if(i===Number(perintahsplit[1])-1)
          this.removePasienRecord(this._model.listPasien[i],perintahsplit[1]);
          break;
        }
        this.inputPerintahPasien(list);
      }
      else {
        console.log("Wrong Order! please try again");
        this.inputPerintahPasien(list);
      }

    });

  }

  addPasienRecord(list,data){
    list.diagnosa.push(data)
    var fs = require('fs');
    fs.writeFile("./data.json",JSON.stringify(list), function(err) {
      if(err)
      return console.log(err);
      console.log(`Record berhasil ditambahkan`);
    });
  }

  removePasienRecord(list,input)
  {
    list.splice(Number(input-1),1);
    var fs = require('fs');
    fs.writeFile("./data.json",JSON.stringify(list), function(err) {
      if(err)
      return console.log(err);
      console.log(list);
    });
  }

  inputPerintahPegawai(list){
    this._rl.question("Please enter an order: ", (perintah) => {
      let perintahsplit=perintah.split(' ');
      if (perintah==="list_pegawai") {
        this._view.tampilPegawai(list);
        this.inputPerintahPegawai(list);
      }
      else if (perintahsplit[0]==="add_pegawai") {
        this._view.addPegawai(list,perintahsplit[1]);
        this.inputPerintahPegawai(list);
      }
      else if (perintahsplit[0]==="remove") {
        this._view.removePegawai(list,perintahsplit[1]);
        this.inputPerintahPegawai(list);
      }
      else {
        console.log("Wrong Order! please try again");
        this.inputPerintahPegawai(list);
      }
    });
  }

  addPegawai(list,data){
    list.diagnosa.push(data)
    var fs = require('fs');
    fs.writeFile("./data.json",JSON.stringify(list), function(err) {
      if(err)
      return console.log(err);
      console.log(`Record berhasil ditambahkan`);
    });
  }

  removePegawai(list,input)
  {
    list.splice(Number(input-1),1);
    var fs = require('fs');
    fs.writeFile("./data.json",JSON.stringify(list), function(err) {
      if(err)
      return console.log(err);
      console.log(list);
    });
  }


}

export default Controller

// }).on('close', () => {
//   this._view.tampilPesanSelesai();
// });
