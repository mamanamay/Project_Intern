#!/bin/bash
# ─── สร้าง Self-Signed SSL Certificate สำหรับ Development ───
# ใช้ได้กับ localhost และ IP ภายในเครือข่าย

CERT_DIR="$(dirname "$0")"

# สร้าง Private Key และ Certificate (อายุ 365 วัน)
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout "$CERT_DIR/server.key" \
  -out "$CERT_DIR/server.crt" \
  -subj "/C=TH/ST=KhonKaen/L=KhonKaen/O=Portfolio-Dev/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:10.0.0.0/8,IP:172.16.0.0/12,IP:192.168.0.0/16"

echo "✅ SSL Certificate สร้างเสร็จแล้ว!"
echo "   📄 Certificate: $CERT_DIR/server.crt"
echo "   🔑 Private Key: $CERT_DIR/server.key"
