# Despliegue a AWS Lambda - Guía de Configuración

## 📋 Requisitos previos

1. **Función Lambda creada** en AWS con:
   - Runtime: Node.js 18.x (o superior)
   - Handler: `index.handler`
   - Permisos IAM necesarios

2. **Credenciales AWS IAM**:
   - Access Key ID
   - Secret Access Key
   - Usuario con permisos: `lambda:UpdateFunctionCode`, `lambda:GetFunction`

## 🔐 Configurar Secretos en GitHub

Ve a tu repositorio → **Settings → Secrets and variables → Actions**

Agrega estos secretos:

### Required Secrets:

1. **AWS_ACCESS_KEY_ID**
   - Tu AWS Access Key ID

2. **AWS_SECRET_ACCESS_KEY**
   - Tu AWS Secret Access Key

3. **AWS_REGION**
   - Región AWS: `us-east-1`, `eu-west-1`, etc.

4. **LAMBDA_FUNCTION_NAME**
   - Nombre de tu función Lambda: `vendeaqui-api`, `vendeaqui-handler`, etc.

## 🚀 Uso

El workflow se ejecuta automáticamente cuando:
- Haces push a la rama `main` o `develop`
- Manualmente desde la pestaña **Actions**

### Disparar manualmente:
1. Ve a **Actions** en tu repo
2. Selecciona **Deploy to AWS Lambda**
3. Haz clic en **Run workflow**

## 📦 Qué hace el workflow:

1. ✅ Descarga el código
2. ✅ Configura Node.js 18
3. ✅ Instala dependencias
4. ✅ Crea paquete ZIP optimizado (solo dependencias de producción)
5. ✅ Autentica con AWS
6. ✅ Actualiza función Lambda
7. ✅ Espera a que se complete el despliegue

## 📝 Variables de entorno en Lambda

Si tu función Lambda necesita variables de entorno, configúralas directamente en AWS Lambda:

```bash
# En AWS Console > Lambda > Función > Configuration > Environment variables
NODE_ENV=production
```

## ⚙️ Personalización

### Para incluir en el ZIP:
- Código fuente
- node_modules (solo dependencias de producción)
- Carpeta `assets/` (imágenes, scripts)
- Carpeta `publish/` (archivos HTML)

### Excluido del ZIP:
- .git
- .github
- node_modules de desarrollo
- .gitignore

## 🔍 Monitoreo

En la pestaña **Actions** puedes ver:
- Estado de cada despliegue
- Logs detallados
- Errores o advertencias

## 🆘 Troubleshooting

### Error: "Invalid credentials"
- Verifica que AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY sean correctos
- Que el usuario IAM tenga permisos suficientes

### Error: "Function not found"
- Verifica el nombre exacto de la función en LAMBDA_FUNCTION_NAME
- Que la región en AWS_REGION sea correcta

### Error: "Permission denied"
- El usuario IAM necesita estos permisos:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction"
        ],
        "Resource": "arn:aws:lambda:*:*:function:*"
      }
    ]
  }
  ```

## 📚 Referencias

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [GitHub Actions AWS Credentials](https://github.com/aws-actions/configure-aws-credentials)
- [AWS CLI Lambda Update](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html)
