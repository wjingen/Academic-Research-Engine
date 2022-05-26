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
backend/research/ 
```
The relevant files for the frontend is located under:
```
frontend/src/components
frontend/src/functions
frontend/src/pages
frontend/src/styles
```

# 🚀 Quick Start 

## Windows

Create Virtual Environment
```
python3 -m venv venv
venv\Scripts\activate
```

Start Backend
```zsh
cd backend 
pip3 install -r requirements.txt ## Install python dependencies
python3 manage.py makemigrations 
python3 manage.py migrate ## Set up django db models
python3 manage.py runserver 8000 ## Start up backend server on port 8000
```

Start Frontend
```zsh
### Make sure you have Node >= 14.0.0 and npm >= 5.6 on your machine
npm init ## Install Node Dependencies
npm start ## Start up front end server
```

## Mac

Create virtual environment
```zsh
cd heron
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
npm init ## Install Node Dependencies
npm start ## Start up front end server
```