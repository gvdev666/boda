<?php
// Configuración de la base de datos
$host = 'localhost';
$db = 'boda';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// Establecer cabeceras para respuesta JSON y CORS (opcional)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Puedes limitarlo según tu dominio
header('Access-Control-Allow-Headers: Content-Type');

// Leer y decodificar el JSON recibido
$datos = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos básicos existan
if (!$datos || !isset($datos['nombre'], $datos['apellidos'], $datos['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

// Conexión a la base de datos con PDO
try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // Preparar inserción
    $stmt = $pdo->prepare("
        INSERT INTO confirmaciones (
            nombre, apellidos, email, asistencia, transporte, alergias,
            acompanante_nombre, acompanante_apellidos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $datos['nombre'],
        $datos['apellidos'],
        $datos['email'],
        $datos['asistencia'],
        implode(',', $datos['transporte'] ?? []), // Unir array de transporte
        $datos['alergias'],
        $datos['acompananteNombre'],
        $datos['acompananteApellidos']
    ]);
    // Enviar correo de confirmación
    $to = $datos['email'];
    $subject = "Confirmación de asistencia";
    $message = "Hola {$datos['nombre']} {$datos['apellidos']},\n\nGracias por confirmar tu asistencia.\n\n";
    $message .= "Asistencia: {$datos['asistencia']}\n";
    $message .= "Transporte: " . implode(',', $datos['transporte'] ?? []) . "\n";
    if (!empty($datos['acompananteNombre'])) {
        $message .= "Acompañante: {$datos['acompananteNombre']} {$datos['acompananteApellidos']}\n";
    }
    $message .= "\n¡Nos vemos pronto!";

    $headers = "From: confirmaciones@tuboda.com\r\n" .
        "Reply-To: confirmaciones@tuboda.com\r\n" .
        "X-Mailer: PHP/" . phpversion();

    mail($to, $subject, $message, $headers);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error en BD: ' . $e->getMessage()]);
}
