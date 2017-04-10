"use strict"
// write your code here
class Model{
  constructor(){
    this._list_pegawai=[];
    this._list=[];
  }

  get list()
  {
    var fs = require('fs');
    var str = fs.readFileSync('pegawai.json');
    var list = JSON.parse(str);
    this._list=list;
    return this._list;
  }

  get listPasien()
  {
    var fs = require('fs');
    var str = fs.readFileSync('pasien.json');
    var list = JSON.parse(str);
    this._list=list;
    return this._list;
  }


}

export default Model
