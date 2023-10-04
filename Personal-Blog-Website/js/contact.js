function sendEmail() {
            // Get user input from the form
            var name = document.getElementById('name').value;
            var phone = document.getElementById('phone').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;

            // Compose the email body
            var emailBody = "Name: " + name + "\n";
            emailBody += "Phone Number: " + phone + "\n";
            emailBody += "Email: " + email + "\n";
            emailBody += "Message: " + message;

            // Create a mailto link to open the user's email client
            var mailtoLink = "mailto:your@email.com?subject=Contact Form Submission&body=" + encodeURIComponent(emailBody);

            // Open the user's email client with the mailto link
            window.location.href = mailtoLink;
        }