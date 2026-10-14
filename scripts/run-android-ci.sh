#!/usr/bin/env bash
set -euo pipefail

echo "===== DISPOSITIVOS ====="
adb devices

echo "===== INSTALANDO APK ====="
adb install -r native-demo.apk

cd mobile-tests

echo "===== INICIANDO APPIUM ====="
npx appium --log-level info > appium-server.log 2>&1 &
APPIUM_PID=$!

trap 'kill "$APPIUM_PID" 2>/dev/null || true' EXIT

echo "===== AGUARDANDO APPIUM ====="
ready=0

for i in $(seq 1 60); do
  if curl -fsS http://127.0.0.1:4723/status >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 2
done

if [ "$ready" -ne 1 ]; then
  echo "Appium não iniciou dentro do prazo."
  tail -80 appium-server.log
  exit 1
fi

echo "===== EXECUTANDO TESTES ====="
ANDROID_UDID=emulator-5554 npm run test:android
