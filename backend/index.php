<?php
  //SET HEADER
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-with, x-xsrf-token");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
  header("Content-Type: application/json; charset=utf-8");
   
  //Config Database
  include('config.php');
   
  $postjson = json_decode(file_get_contents('php://input'), true);
   
   
  $METHOD = $_SERVER['REQUEST_METHOD'];
   
   
  if($METHOD==='GET'){
   
    if($_GET["id"]===''){ // JIKA ID KOSONG
   
      // EKSEKUSI QUERY
      $query = mysqli_query($mysqli,"SELECT * FROM note ORDER BY id DESC");
   
   
      if($query){ // JIKA QUERY BERHASIL DIEKSEKUSI
   
        $data = [];
        while($row = mysqli_fetch_assoc($query)){
          $data[] = $row;
        }
   
        echo json_encode(array(
          "result" => "success", 
          "data" => $data
        ));
   
      }else{ // JIKA QUERY GAGAL DIEKSEKUSI
   
        echo json_encode(array(
          "result" => "error",
          "message" => "Gagal mengambil data"
        ));
      }
   
    }else{ // JIKA ID TIDAK KOSONG
   
      $id = $_GET["id"];
   
      $query = mysqli_query($mysqli,"SELECT * FROM note where id='{$id}'");
   
   
      if(mysqli_num_rows($query) > 0){
   
        $row = mysqli_fetch_assoc($query);
   
        echo json_encode(array(
          "result" => "success",
          "data" => $row
        ));
 
      }else{
        echo json_encode(array(
          "result" => "error",
          "message" => "Tidak ada data ditemukan"
        ));
      }
    }
  }
   
  if($METHOD==='POST'){
   
    $judul = mysqli_real_escape_string($mysqli,$postjson["judul"]);
    $isi = mysqli_real_escape_string($mysqli,$postjson["isi"]);
   
    // EKSEKUSI QUERY
    $query = mysqli_query($mysqli,"INSERT INTO note(judul,isi) VALUES('{$judul}','{$isi}')");
   
   
    if($query){ // JIKA QUERY BERHASIL DIEKSEKUSI
   
      $query_id = mysqli_query($mysqli,"SELECT LAST_INSERT_ID() as id");
   
      $id = mysqli_fetch_assoc($query_id)["id"];
   
      echo json_encode(array(
        "result" => "success",
        "message" => "Data berhasil disimpan",
        "data"  =>  [
          "id" => $id,
          "judul" => $judul,
          "isi" => $isi
        ]
      ));
   
    }else{ // JIKA QUERY GAGAL DIEKSEKUSI
 
      echo json_encode(array(
        "result" => "error",
        "message" => "Gagal menyimpan data"
      ));
 
    }
  }
   
  if($METHOD==='PUT'){
    $id = $_GET["id"];
    $judul = mysqli_real_escape_string($mysqli,$postjson["judul"]);
    $isi = mysqli_real_escape_string($mysqli,$postjson["isi"]);
   
    // EKSEKUSI QUERY
    $query = mysqli_query($mysqli,"UPDATE note SET judul='{$judul}', isi='{$isi}' WHERE id='{  $id}'");  
   
   
    if($query){ // JIKA QUERY BERHASIL DIEKSEKUSI
   
      if(mysqli_affected_rows($mysqli)>0){ // JUMLAH ROW YANG TERUPDATE > 0
 
        echo json_encode(array(
          "result" => "success",
          "message" => "Data berhasil diubah"
        ));
       
      }else{
       
        echo json_encode(array(
          "result" => "error",
          "message" => "note id tidak terdaftar"
        ));
       
      }
     
    }else{ // JIKA QUERY GAGAL DIEKSEKUSI
     
      echo json_encode(array(
        "result" => "error",
         "message" => "Gagal merubah data"
      ));
    }
  }
   
   
  if($METHOD==='DELETE'){
    $id = $_GET["id"];
   
    // EKSEKUSI QUERY
    $query = mysqli_query($mysqli,"DELETE FROM note WHERE id='{$id}'");
   
    if($query){ // JIKA QUERY BERHASIL DIEKSEKUSI
 
      echo json_encode(array(
        "result" => "success",
        "message" => "Data berhasil dihapus"
      ));
     
    }else{ // JIKA QUERY GAGAL DIEKSEKUSI
 
      echo json_encode(array(
        "result" => "error",
        "message" => "Gagal merubah data"
      ));
     
    }
  }
 
?>