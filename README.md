### View video showcase [here](https://vimeo.com/995710839?share=copy).

![image](https://github.com/user-attachments/assets/697a629e-338f-4fc5-b213-9a7e75176c08)


# Project Pilot  🛫

### What is Project Pilot?

Project Pilot is the academic search engine for all your needs.

It utilises Library Genesis' extensive academic database, allowing users to browse and download research papers for free. 

The site offers many additional features, such as:
* Filter by academic categories and observe popularity over time
* Save papers into your Personal Archive
* Single-Click downloads without redirecting to third-party websites
* In-Built Citation Helper

### 🏗 Architecture and Project Files

 The relevant files for the backend is located under: 
```
backend/backend/ 
```
The relevant files for the frontend is located under:
```
frontend/src/components
frontend/src/functions
frontend/src/pages
frontend/src/styles
```

# 🚀 Quick Start 

Create virtual environment
```zsh
cd pilot
python3 -m venv venv
source venv/bin/activate 
```
Start backend 
```zsh
cd backend 
pip3 install -r requirements.txt ## Install python dependencies
python3 manage.py makemigrations 
python3 manage.py migrate ## Set up django db models
python3 manage.py runserver 8000 ## Start up backend server on port 8000
```

Start up frontend
```zsh
### Make sure you have Node >= 14.0.0 and npm >= 5.6 on your machine
npm install ## Install Node Dependencies
npm start ## Start up front end server
```
