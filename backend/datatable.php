<?php
header('Content-Type: application/json');

// Configuración de la conexión
$host = 'localhost';
$db   = 'boda';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);

  $stmt = $pdo->query("SELECT * FROM confirmaciones");
  $asistentes = $stmt->fetchAll();

  echo json_encode(["data" => $asistentes]);

} catch (\PDOException $e) {
  echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
}
