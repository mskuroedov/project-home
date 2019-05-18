<?php
 $to = 'mskuroedov@gmail.com';
 $subject = 'RENSTROI';
 $result = ['result' => true];

header('Content-Type: application/json');

if (!isset($_POST['name']) || $_POST['name'] === '') {
    $result['result'] = false;
    $result['message'] = 'Укажите ваше имя!';
}
if (!isset($_POST['contacts']) || $_POST['contacts'] === '') {
    $result['result'] = false;
    $result['message'] = 'Укажите ваши контактные данные!';
}
if ($result['result'] === true) {
    $message = 'Имя: ' . $_POST['name'] . "\r\n"
        . 'Контакт: ' . $_POST['contacts'];
    mail($to, $subject, $message);
}

echo json_encode($result);