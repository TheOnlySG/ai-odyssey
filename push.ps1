param(
    [string]$Message = "Manual sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

git add .
git commit -m "$Message"
git push origin main

Write-Host "Changes pushed to GitHub with message: $Message" -ForegroundColor Green
