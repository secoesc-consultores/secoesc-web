@echo off
setlocal enabledelayedexpansion

:: Detectar la rama actual
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set branch=%%i

echo Rama detectada: !branch!
echo.

set /p msg="Ingresa el mensaje de los cambios (o presiona Enter para usar default): "
if "%msg%"=="" set msg="Actualizacion general del sitio - %date% %time%"

echo.
echo --- 1. Preparando archivos ---
git add .

echo --- 2. Guardando cambios locales ---
:: El -m "" maneja casos donde no hay cambios
git commit -m "%msg%"

echo --- 3. Subiendo a GitHub (Rama: !branch!) ---
git push origin !branch!

if %ERRORLEVEL% equ 0 (
    echo.
    echo ------------------------------------------
    echo [EXITO] Cambios publicados correctamente.
    echo ------------------------------------------
) else (
    echo.
    echo ------------------------------------------
    echo [ERROR] Hubo un problema al subir los cambios.
    echo Intenta cerrar programas que usen los archivos o revisa tu conexion.
    echo ------------------------------------------
)

pause
