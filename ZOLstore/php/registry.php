<?php
include "conn.php";

if(isset($_POST['phonenumber'])){
    $phonenumber = $_POST['phonenumber'];
    $result = $conn->query("select * from usertable where username='$phonenumber'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
if(isset($_POST['submit'])){
    $num = $_POST['phonenumber'];
    $pass = sha1($_POST['password']);
    $email = $_POST['email'];
    echo($num);
    $conn->query("insert usertable values(null,'$num','$pass','$email',now())");
    header('location:http://192.168.64.2/www/ZOL/ZOLstore/src/login.html');

}