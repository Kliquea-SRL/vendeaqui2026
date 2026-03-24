# 🚀 GitHub Actions Deployment Workflow

Este proyecto incluye un workflow automático de GitHub Actions para desplegar a AWS Lambda.

## ⚡ Quick Start

### 1. Configurar Secretos (una sola vez)

En tu repositorio GitHub:
```
Settings → Secrets and variables → Actions → New repository secret
```

Agrega estos 4 secretos:
- `AWS_ACCESS_KEY_ID` - Tu clave de acceso AWS
- `AWS_SECRET_ACCESS_KEY` - Tu clave secreta AWS  
- `AWS_REGION` - Por ej: `us-east-1`
- `LAMBDA_FUNCTION_NAME` - Nombre de tu función Lambda

### 2. Comprometer código

```bash
git add .
git commit -m "Deploy configuration"
git push origin main
```

El workflow se ejecutará automáticamente. ✅

---

## 📊 Flujo del Deployment

```
1. Push a GitHub (main o develop)
               ↓
2. GitHub Actions se dispara
               ↓
3. Descarga código → Instala dependencias
               ↓
4. Crea paquete ZIP optimizado
               ↓
5. Autentica con AWS credentials
               ↓
6. Actualiza función Lambda
               ↓
7. Verifica que el update sea exitoso
               ↓
✅ Deployment completo!
```

---

## 📝 Información Técnica

**Archivo**: `.github/workflows/deploy-lambda.yml`

**Se ejecuta en**:
- `push` a `main` o `develop`
- Manualmente desde la pestaña Actions

**Node.js version**: 18 (ajustable en el workflow)

**Tamaño máximo**: 50MB (límite de Lambda)

---

## 📚 Documentación Detallada

Ver [DEPLOY_LAMBDA.md](./DEPLOY_LAMBDA.md) para:
- Requisitos previos
- Configuración completa
- Troubleshooting
- Permisos IAM

---

## ✅ Verificar Deployment

### En GitHub:
1. Ve a **Actions** en tu repo
2. Busca el workflow **Deploy to AWS Lambda**
3. Verifica que tenga un badge ✅ (exitoso) o ❌ (fallido)

### En AWS Console:
1. Ve a **Lambda**
2. Selecciona tu función
3. Ve a **Code** → verifica que el código se actualizó
4. Revisa la hora de la última modificación

---

## 🔄 Re-desplegar manualmente

Si necesitas desplegar sin hacer push:

1. Ve a **Actions** en GitHub
2. Selecciona **Deploy to AWS Lambda**
3. Haz clic en **Run workflow**
4. Selecciona la rama: `main` o `develop`
5. Haz clic en **Run workflow**

---

## ⚠️ Cosas Importantes

- ✅ Los secretos AWS nunca se muestran en los logs
- ✅ El código de desarrollo (node_modules completo) no se sube
- ✅ Solo se incluyen dependencias de producción
- ✅ Los workflows se ejecutan en servidores de GitHub (no localmente)

---

## 🆘 Necesitas ayuda?

Consulta [DEPLOY_LAMBDA.md](./DEPLOY_LAMBDA.md#-troubleshooting) para solución de problemas.
