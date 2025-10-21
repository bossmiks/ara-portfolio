@echo off
echo Starting Portfolio Backend Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check if .env file exists
if not exist ".env" (
    echo Warning: .env file not found
    echo Please copy env.example to .env and configure your settings
    echo.
)

REM Start the development server
echo Starting development server...
echo Backend will be available at: http://localhost:3001
echo.
npm run dev

pause
