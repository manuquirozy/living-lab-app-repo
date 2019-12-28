timeout /t 40 /nobreak
E:
SET mypath=%~dp0
cd %mypath:~0,-1%
cd client/src
npm start
timeout /t 5 /nobreak