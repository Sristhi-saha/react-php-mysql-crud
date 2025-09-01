<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, x-requested-with");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react-crud";
$port = 3307;

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (!isset($data['action'])) {
        echo json_encode(["success" => false, "error" => "No action specified"]);
        exit;
    }

    $action = $data['action'];

    // Insert new task
    if ($action === "insert") {
        if (isset($data['title'])) {
            $title = $conn->real_escape_string($data['title']);
            $status = isset($data['status']) ? (int)$data['status'] : 0;

            $sql = "INSERT INTO tasks (title, status) VALUES ('$title', '$status')";
            if ($conn->query($sql)) {
                echo json_encode(["success" => true, "id" => $conn->insert_id]);
            } else {
                echo json_encode(["success" => false, "error" => $conn->error]);
            }
        }
    }

    // Update task
    elseif ($action === "update") {
        if (isset($data['id']) && isset($data['title'])) {
            $id = (int)$data['id'];
            $title = $conn->real_escape_string($data['title']);
            $status = isset($data['status']) ? (int)$data['status'] : 0;

            $sql = "UPDATE tasks SET title='$title', status=$status WHERE id=$id";
            if ($conn->query($sql)) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "error" => $conn->error]);
            }
        }
    }

    // Delete task (with ID reorder)
    elseif ($action === "delete") {
        if (isset($data['id'])) {
            $id = (int)$data['id'];
            $sql = "DELETE FROM tasks WHERE id=$id";
            if ($conn->query($sql)) {
                // Reorder IDs sequentially
                $conn->query("SET @num := 0");
                $conn->query("UPDATE tasks SET id = (@num := @num + 1) ORDER BY id");
                $conn->query("ALTER TABLE tasks AUTO_INCREMENT = 1");

                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "error" => $conn->error]);
            }
        }
    }

    else {
        echo json_encode(["success" => false, "error" => "Invalid action"]);
    }
}

// Fetch all tasks
elseif ($_SERVER['REQUEST_METHOD'] === "GET") {
    $result = $conn->query("SELECT * FROM tasks ORDER BY id ASC");
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
    echo json_encode($tasks);
}
?>
