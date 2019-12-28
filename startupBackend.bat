timeout /t 1 /nobreak
E:
SET mypath=%~dp0
cd %mypath:~0,-1%
cd backend
npm start
timeout /t 5 /nobreak