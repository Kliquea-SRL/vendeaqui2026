#!/bin/bash
# Script para crear política IAM mínima para despliegue a Lambda

# Este script genera una política JSON que puedes usar en AWS IAM
# Para usar:
# 1. Guarda este script
# 2. Ejecuta: bash create-iam-policy.sh
# 3. Copia el output JSON
# 4. En AWS IAM > Inline policies > Paste policy

cat > lambda-deploy-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LambdaUpdateCode",
      "Effect": "Allow",
      "Action": [
        "lambda:UpdateFunctionCode",
        "lambda:GetFunction"
      ],
      "Resource": "arn:aws:lambda:*:*:function/*"
    },
    {
      "Sid": "S3SyncDependencies",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::lambda-layers/*",
        "arn:aws:s3:::lambda-layers"
      ]
    }
  ]
}
EOF

echo "✅ Política IAM creada: lambda-deploy-policy.json"
echo ""
echo "📋 Pasos siguientes:"
echo "1. Ve a AWS IAM > Users"
echo "2. Selecciona el usuario para CI/CD"
echo "3. Add permission > Inline policy"
echo "4. Pega el contenido of lambda-deploy-policy.json"
echo ""
cat lambda-deploy-policy.json
