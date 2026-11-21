@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Не найден Node.js. Установи Node.js 20+ с https://nodejs.org/
  pause
  exit /b 1
)
start "BRAWL NEXUS SERVER" cmd /k "node server.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8787"
