<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Klinik</title>
</head>
<body>
    <h2>Form Registrasi Klinik</h2>
    <form action="" method="POST">
        <label for="email">Email:</label>
        <input type="email" name="email" required><br><br>

        <label for="password">Password:</label>
        <input type="password" name="password" required><br><br>

        <label for="name">Nama Klinik:</label>
        <input type="text" name="name" required><br><br>

        <label for="address">Alamat:</label>
        <input type="text" name="address" required><br><br>

        <label for="location">Lokasi:</label>
        <input type="text" name="location" required><br><br>

        <label for="acceptsBPJS">Menerima BPJS?</label>
        <input type="checkbox" name="acceptsBPJS"><br><br>

        <label for="whatsappLink">Link WhatsApp:</label>
        <input type="text" name="whatsappLink"><br><br>

        <button type="submit">Daftar</button>
        <a href="login.php">Login</a>
    </form>

    <?php 
    include 'koneksi.php'; 

    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        $email = $_POST['email']; 
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT); 
        $name = $_POST['name']; 
        $address = $_POST['address']; 
        $location = $_POST['location']; 
        $acceptsBPJS = isset($_POST['acceptsBPJS']) ? 1 : 0; 
        $whatsappLink = $_POST['whatsappLink']; 

        // Cek apakah email sudah ada
        $check = $conn->query("SELECT * FROM clinic WHERE email = '$email'"); 
        if ($check->num_rows > 0) { 
            echo "Email sudah terdaftar!";
        } else { 
            $query = "INSERT INTO clinic (id, email, password, name, address, location, acceptsBPJS, whatsappLink) 
                      VALUES (UUID(), '$email', '$password', '$name', '$address', '$location', '$acceptsBPJS', '$whatsappLink')";
            if ($conn->query($query) === TRUE) { 
                echo "Registrasi berhasil!";
            } else { 
                echo "Error: " . $conn->error; 
            } 
        } 
    } 
    ?>
</body>
</html>
