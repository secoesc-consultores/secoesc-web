@echo off
set /p msg="Ingresa el mensaje de los cambios (o presiona Enter para usar default): "
if "%msg%"=="" set msg="Actualización general del sitio"

echo --- Iniciando publicacion ---
git add .
git commit -m "%msg%"
git push origin main

echo --- Proceso finalizado ---
pause
