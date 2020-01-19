timeout /t 1 /nobreak
SET mypath=%~dp0
%mypath:~0,2%
cd %mypath:~0,-1%
cd backend
call npm install mongoose
timeout /t 1 /nobreak
call npm start
timeout /t 5 /nobreak