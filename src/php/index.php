<?php
// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Define the target file path
    $targetDir = $_SERVER['DOCUMENT_ROOT']; // public_html
    $targetFile = $targetDir . DIRECTORY_SEPARATOR . 'SKMatrimonial.apk';

    // Check if a file was uploaded
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $tmpFile = $_FILES['file']['tmp_name'];

        // Move uploaded file to the target location
        if (move_uploaded_file($tmpFile, $targetFile)) {
            echo "<p style='color:green;'>File uploaded successfully as SKMatrimonial.apk!</p>";
        } else {
            echo "<p style='color:red;'>Failed to upload the file. Please try again.</p>";
        }
    } else {
        echo "<p style='color:red;'>No file uploaded or an error occurred during upload.</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload</title>
</head>
<body>
    <h1>Upload SKMatrimonial.apk</h1>
    <form action="" method="post" enctype="multipart/form-data">
        <label for="file">Choose file to upload:</label>
        <input type="file" name="file" id="file" accept=".apk" required>
        <br><br>
        <button type="submit">Upload</button>
    </form>
</body>
</html>
