@echo off
echo 正在修改hosts文件...
echo.

set HOSTS_FILE=C:\Windows\System32\drivers\etc\hosts
set BACKUP_FILE=C:\Windows\System32\drivers\etc\hosts.backup

:: 备份原文件
if exist "%HOSTS_FILE%" (
    copy "%HOSTS_FILE%" "%BACKUP_FILE%"
    echo 已备份原文件到: %BACKUP_FILE%
) else (
    echo 警告: hosts文件不存在
    pause
    exit /b 1
)

:: 检查是否已添加GitHub映射
findstr /C:"# GitHub" "%HOSTS_FILE%" >nul
if %errorlevel% equ 0 (
    echo GitHub映射已存在，跳过添加
    goto :end
)

:: 添加GitHub映射
echo. >> "%HOSTS_FILE%"
echo # GitHub >> "%HOSTS_FILE%"
echo 20.205.243.166 github.com >> "%HOSTS_FILE%"
echo 20.205.243.166 raw.githubusercontent.com >> "%HOSTS_FILE%"
echo 20.205.243.166 api.github.com >> "%HOSTS_FILE%"
echo 20.205.243.166 assets-cdn.github.com >> "%HOSTS_FILE%"
echo 20.205.243.166 github.global.ssl.fastly.net >> "%HOSTS_FILE%"

echo.
echo 成功添加GitHub映射到hosts文件！
echo.
echo 正在刷新DNS...
ipconfig /flushdns
echo DNS已刷新！

:end
echo.
echo 完成！
pause
