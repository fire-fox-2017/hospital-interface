"use strict"
// write your code here
class View{
  constructor(){
    this._rl="";
  }

  get rl()
  {
    return this._rl;
  }

  tampilAwal(){
    console.log("\n\n***********-SELAMAT DATANG DI RUMAH SAKIT JIWA-***********\n")
    console.log("-----------------------------------------------------------------");
   }

   tampilMenu(list){
     if(list.role==="Dokter"){
       console.log("-----------------------------------------------------------------");
       console.log(`Welcome, ${list['nama']} Your Access is : ${list['role']}`);
       console.log("-----------------------------------------------------------------");
       console.log("What Would You Like To Do?");
       console.log("Options:");
       console.log("- list_patients");
       console.log("- view_records <patient_id>");
       console.log("- add_record <patient_id>");
       console.log("- Remove_Record <patients_id> <Remove_Record_id>");
     }
     else if(list.role==="Receptionist"){
       console.log("-----------------------------------------------------------------");
       console.log(`Welcome, ${list['nama']} Your Access is : ${list['role']}`);
       console.log("-----------------------------------------------------------------");
       console.log("What Would You Like To Do?");
       console.log("Options:");
       console.log("- list_patients");
       console.log("- view_records <patient_id>");
       console.log("- add_record <patient_id>");
       console.log("- Remove_Record <patients_id> <Remove_Record_id>");
     }
     else if(list.role==="Admin"){
       console.log("-----------------------------------------------------------------");
       console.log(`Welcome, ${list['nama']} Your Access is : ${list['role']}`);
       console.log("-----------------------------------------------------------------");
       console.log("What Would You Like To Do?");
       console.log("Options:");
       console.log("- list_pegawai");
       console.log("- add_pegawai");
       console.log("- Remove_pegawai_id");
     }
     else if(list.role==="Office boy"){
       console.log("-----------------------------------------------------------------");
       console.log(`Sorry, ${list['nama']} Your Access is Denied!`);
     }
   }

   tampilPasien(list){
     for(let i=0; i<list.length; i++){
       console.log(`${i+1}. ${list[i].nama}`)
     }
   }

   tampilRecordPasien(list,index){
     for(let i=0; i<list.length; i++){
       if(i===Number(index))
       console.log(`Diagnosa:${list[i].diagnosa}`)
       }
     if(list.length<index)
     {
       console.log("Tidak ada Data!")
     }
   }

   tampilPegawai(list){
     for(let i=0; i<list.length; i++){
       console.log(`${i+1}. ${list[i].nama} `)
     }
   }

   tampilSelesai()
   {
     console.log("\n\n***********-SELAMAT JALAN-***********\n\n");
   }
}

export default View
