@echo off
chcp 936 >nul
cd /d D:\lab-hub
echo ==============================
echo   正在发布到 GitHub Pages...
echo ==============================
git add -A
git commit -m "更新资源站"
git push origin main
echo.
echo [完成] 已发布，约 1 分钟后网站自动更新
echo 网址: https://xinghai-pu-2026.github.io/lab-hub/
echo.
pause
