<?php
 $to = 'proekt.h116@gmail.com';
 $subject = 'Заявка с сайта проектХоум - QUIZ';
 $result = ['result' => true];

 header('Content-Type: application/json');

 if (!isset($_POST['name']) || $_POST['name'] === '') {
     $result['result'] = false;
     $result['message'] = 'Укажите ваше имя!';
 }

 if (!isset($_POST['phone']) || $_POST['phone'] === '') {
     $result['result'] = false;
     $result['message'] = 'Укажите ваш телефон!';
 }else{
       if(!preg_match('/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/', $_POST['phone'])){
          $result['result'] = false;
          $result['message'] = 'Введите корректный номер телефона!';
       }
 }

 if (!isset($_POST['mail']) || $_POST['mail'] === '') {
     $result['result'] = false;
     $result['message'] = 'Укажите вашу почту!';
 }else{
      if(!filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)){
         $result['result'] = false;
         $result['message'] = 'Введите корректную почту!';
      }
 }


 if ($result['result'] === true) {
     $message = 'Имя Фамилия: ' . $_POST['name'] . "\r\n"
         . 'Телефон: ' . $_POST['phone']. "\r\n"
         . 'Почта: ' . $_POST['mail']. "\r\n"
         . 'Этажи: ' . $_POST['floors']. "\r\n"
         . 'Стиль: ' . $_POST['style']. "\r\n"
         . 'Материал: ' . $_POST['material']. "\r\n";
     mail($to, $subject, $message);
 }

echo json_encode($result);
