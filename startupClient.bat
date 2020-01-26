timeout /t 2 /nobreak
SET mypath=%~dp0
%mypath:~0,2%
cd %mypath:~0,-1%
cd client/src
call npm install react-scripts
npm start
timeout /t 5 /nobreak