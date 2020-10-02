<?php
    /*
    if(isset($_SERVER["HTTP_ORIGIN"])) {
        // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    } else {
        //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
        header("Access-Control-Allow-Origin: *");
    }
    */

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 600");    // cache for 10 minutes

    if($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
        if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
            header("Access-Control-Allow-Methods: POST"); 
            //Make sure you remove those you do not want to support
        if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            //Just exit with 200 OK with the above headers for OPTIONS method
        exit(0);
    }

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);

    /*
    $name = $_REQUEST['name'];
    $subject = $_REQUEST['subject'];
    $email = $_REQUEST['email'];
    $numpax = $_REQUEST['numpax'];
    $date = $_REQUEST['date'];
    $urllink = $input['urllink'];
    $message = 'Your reservation has been confirmed: ' + 
        'Date:' + $date + 
        'Number of guests:' + $numpax;
        'Confirmation url:' + urllink;
    */

    $name = $input['name'];
    $email = $input['email'];
    $subject = $input['subject'];
    $date = $input['date'];
    $numpax = $input['numpax'];
    $urllink = $input['urllink'];

    $msg = 'thankyou';
    $confirmationUrl = '';
    if ($subject === 'Cancelled Reservation') {
        $msg = 'cancelled';
    } else if ($subject === 'Reservation Confirmation') {
        $msg = 'confirmed';
        $confirmationUrl = '<p>Confirmation Url: ' . $urllink . '</p>'; 
    } 

    $subject = 'Country Sushi: ' . $subject;
    if ($msg === 'thankyou') {
        $message = '<p>Thank you for dining with us.</p>' .
        '<p>Hope you have a great time and you are happy with our service.</p>' .
        '<p>See you again next time.</p>';
    } else {
        $message = '<p>Your reservation has been ' . $msg . ':</p>' .
        '<p>Date: ' . $date . '</p>' .
        '<p>Number of guests: ' . $numpax . '</p>' . $confirmationUrl;
    }
    
    if ( empty($name) || empty($email) || empty($subject) ) {
        echo "Mail send error!. Please check your connection and try again.";
    } else {
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=UTF-8';
        $headers[] = "From: <info@hexsoftstudio.com>";

        mail($email, $subject, $message, implode("\r\n", $headers));
        // header("Location: http://www.hexsoftstudio.com");
        exit();
    }
?>