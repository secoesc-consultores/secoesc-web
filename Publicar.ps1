# Script para publicar cambios de SECOESC Web a GitHub
# Uso: ./Publicar.ps1 "mensaje de commit"

param (
    [string]$mensaje = "Actualización de diseño y contenido"
)

Write-Host "--- Iniciando proceso de publicación ---" -ForegroundColor Cyan

# 1. Agregar cambios
Write-Host "1. Preparando archivos..." -ForegroundColor Yellow
git add .

# 2. Commit
Write-Host "2. Creando punto de restauración (Commit)..." -ForegroundColor Yellow
git commit -m $mensaje

# 3. Push
Write-Host "3. Subiendo a la nube (GitHub)..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "--- ¡Publicación exitosa! ---" -ForegroundColor Green
    Write-Host "Tus cambios estarán en vivo en Vercel en unos minutos." -ForegroundColor Gray
} else {
    Write-Host "--- Error en la publicación ---" -ForegroundColor Red
    Write-Host "Por favor verifica tu conexión o si hay conflictos de Git." -ForegroundColor Gray
}

# Mantener la ventana abierta si se ejecuta con doble clic
# Read-Host -Prompt "Presiona Enter para cerrar"
