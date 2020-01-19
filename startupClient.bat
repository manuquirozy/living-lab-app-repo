timeout /t 40 /nobreak
C:
SET mypath=%~dp0
%mypath:~0,2%
cd %mypath:~0,-1%
cd client/src
call npm start
timeout /t 5 /nobreak