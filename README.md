# COLORS LAMP Application

COLORS is a small web application created for COP 4331C. Users can log in, add colors to their account, and search their saved colors. The application is hosted on a remote DigitalOcean server and uses a LAMP stack.

## Technologies Used

- Linux (Ubuntu)
- Apache
- MySQL
- PHP
- HTML
- CSS
- JavaScript
- DigitalOcean
- GoDaddy DNS

## Repository Structure

```text
Colors-Lamp/
├── api/
│   ├── AddColor.php
│   ├── Login.php
│   └── SearchColors.php
├── database/
│   ├── schema.sql
│   └── testdata.sql
├── public/
│   ├── index.html
│   ├── color.html
│   ├── css/
│   ├── images/
│   └── js/
├── .gitignore
├── LICENSE.md
└── README.md
```

## Application Features

- User login
- Add colors associated with the logged-in user
- Search for colors using partial names
- Store application data in MySQL
- Communicate with PHP API endpoints using JSON

## Setup Instructions

1. Create an Ubuntu server with Apache, MySQL, and PHP installed.
2. Clone or download this repository.
3. Run `database/schema.sql` to create the `COP4331` database and its tables.
4. Optionally run `database/testdata.sql` to insert demonstration data.
5. Copy the contents of `public/` into the Apache web root, normally `/var/www/html`.
6. Copy the contents of `api/` into `/var/www/html/LAMPAPI`.
7. In each deployed PHP endpoint, replace the placeholder database username and password with the credentials for the local MySQL application account.
8. Update `urlBase` in `public/js/code.js` if the application is deployed under a different domain or API path.
9. Point the domain's DNS A record to the server's public IP address.

## Running and Accessing the Application

After deployment, open the server's domain in a web browser. The deployed lab application is available at:

[http://nicholasran.xyz](http://nicholasran.xyz)

Availability depends on the DigitalOcean server remaining online.

## API Endpoints

All endpoints accept JSON using HTTP POST requests.

- `LAMPAPI/Login.php` authenticates a user.
- `LAMPAPI/AddColor.php` adds a color for the logged-in user.
- `LAMPAPI/SearchColors.php` searches the user's saved colors.

## Assumptions and Limitations

- This application was created for educational purposes.
- The server must provide Apache, PHP, and MySQL.
- Database credentials must be inserted during deployment and must never be committed.
- The application uses the HTTP deployment created during the lab and may display a “Not secure” browser warning.
- Authentication and password handling are simplified for the lab and are not intended for production use.
- The application does not provide registration, password recovery, or administrative functionality.

## AI Usage

ChatGPT was used for troubleshooting, explaining Git and GitHub commands, organizing the completed project into logical commits, and reviewing documentation. The application code and lab implementation were based on the course-provided materials and completed lab work.