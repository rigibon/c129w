# 🚀 GUÍA RÁPIDA: APIs GRATUITAS

## ⚡ Groq (RECOMENDADO - Súper rápido y gratis)

### Obtener API Key:
1. https://console.groq.com/keys
2. Sign up (gratis)
3. Clic en "Create API Key"
4. Copia la key

### Configurar en .env:
```env
AI_PROVIDER=groq
GROQ_API_KEY=gsk_tu_clave_aqui
```

**Modelos disponibles:**
- `llama-3.3-70b-versatile` (por defecto) ⭐
- `llama-3.1-70b-versatile`
- `mixtral-8x7b-32768`

---

## 🤖 Google Gemini (Gratis con límites)

### Ya configurado:
```env
AI_PROVIDER=gemini
API_KEY=AIzaSy... # Ya la tienes
```

**Límites:** 20 requests/día para `gemini-2.5-flash`

---

## 🧠 Anthropic Claude (Trial $5)

### Obtener API Key:
1. https://console.anthropic.com/settings/keys
2. Sign up
3. Obtienes $5 gratis
4. Create Key

### Configurar en .env:
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-tu_clave_aqui
```

---

## 🔤 Cohere (Gratis)

### Obtener API Key:
1. https://dashboard.cohere.com/api-keys
2. Sign up
3. Generate API Key

### Configurar en .env:
```env
AI_PROVIDER=cohere
COHERE_API_KEY=tu_clave_aqui
```

**Límites:** 1000 requests/mes gratis

---

## 📝 Cambiar entre proveedores

Solo cambia `AI_PROVIDER` en tu [.env](../.env):

```env
# Opción 1: Groq (Recomendado)
AI_PROVIDER=groq

# Opción 2: Gemini (Ya configurado)
AI_PROVIDER=gemini

# Opción 3: Anthropic
AI_PROVIDER=anthropic

# Opción 4: Cohere
AI_PROVIDER=cohere
```

Luego reinicia el servidor:
```bash
npm run start:dev
```

---

## ✅ Verificar que funciona

Cuando inicies el servidor verás:
```
🤖 AI Provider: Groq (llama-3.3-70b-versatile) - FREE
```

---

## 💡 Recomendación

1. **Para desarrollo:** Usa **Groq** (muy rápido y gratis) ⚡
2. **Para producción con presupuesto:** Usa **Anthropic Claude** (mejor calidad)
3. **Si necesitas algo completamente gratis:** Usa **Cohere** (1000 req/mes)
4. **Si Gemini te da error 429:** Espera hasta mañana o usa otra API
