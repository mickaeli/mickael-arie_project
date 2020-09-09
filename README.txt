Name

Gooder - social network for good actions.

Summary

There are many blessed initiatives of help, kindness and good deeds today. People donate their time, energy and money for others. 
However, people who can help or need help are forced to reach out and contact the active parties in the relevant field. 
Sometimes they avoid it, for various reasons (embarrassment or lack of time and "power" for such preoccupation). 
There is no single platform that can be a "Homepage" for this world - 
a home for anyone who needs help or wants to help, at any time, place and issue, small or large. 
In this void sits our project - establishing a social network around performing good deeds. 
The network we have built (using state-of-the-art programming tools used in the industry) 
includes all the features of a modern social network, plus parts relevant to the field in which it focuses on 
(hermetic information security using dedicated tools, anonymity option, general messages wall - through which messages reach even the unfamiliar, and more). 
The network includes a number of layers - Entry pages, Authentication layer and a dynamic personal Dashboard, 
and maintains an innovative and up-to-date design, a smooth user experience and increasing data volume support (scalability). 
Tests we conducted and feedback we received from experimenters show that the network meets the requirements and is an effective solution for the existing void.

Installation

Clone the project:
1.	In git terminal, clone the project with the command ‘git clone https://github.com/mickaeli/mickael-arie_project.git’. 
Alternatively, you can unzip the zip file which contains the project.

Postgresql:
2.	Install Postgresql (version 12 or older): https://www.postgresql.org/download/
3.	If you run on Windows, add “C:\Program Files\PostgreSQL\12\bin” to the PATH 
(computer => properties => advanced system settings=> Environment Variables => System Variables).
4.	Via your command line:
		a.	Connect to your database:
			•	Enter “psql postgres postgres” for connect to the default “postgres” database.
			•	Enter the password you chose during the postgresql installation.
		b.	Create a user with a specific password 
		(accordingly to the environment variables DB_USERNAME and DB_PASSWORD in server/main/.env file):
			•	Enter “ CREATE ROLE DB_USERNAME WITH LOGIN PASSWORD ‘DB_PASSWORD’; ”
			•	Enter “ ALTER ROLE DB_USERNAME CREATEDB; “ 
		c.	Exit from the default session with “\q” for quit.
		d.	Now we’ll connect postgres with DB_USERNAME:
			•	Enter “psql -d postgres -U DB_USERNAME “.
		e.	Create a database (accordingly to the environment variable DB_NAME in server/main/.env file):
			•	Enter “ CREATE DATABASE DB_NAME; “

Node.js:
5.	Install node (the one ‘Recommended For Most Users’): https://nodejs.org/en/

Run the project:
6.	For both client folder and server folder, open a terminal and enter “npm install” and “npm start”. 
Your browser will open with the project's homepage shortly after.

Important: The server runs on port PORT (in server/main/.env file) and DB_PORT (in the same file) is for the postgresql server 
(this is the port you chose during the postgres installation).
