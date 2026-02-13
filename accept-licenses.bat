@echo off
echo 正在接受Android SDK许可证...
echo.

echo y | "C:\Users\Administrator\AppData\Local\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --sdk_root="C:\Users\Administrator\AppData\Local\Android\Sdk" --licenses

echo.
echo 许可证接受完成！
pause