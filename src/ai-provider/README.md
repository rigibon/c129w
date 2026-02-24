# AI Provider Adapter System

Este sistema permite cambiar fácilmente entre diferentes proveedores de IA mediante el patrón Adapter.

## 🎯 Características

- ✅ Soporte para **5 proveedores de IA**:
  - **Google Gemini** (Gratis con límites)
  - **Groq** (Gratis, muy rápido)
  - **Anthropic Claude** (Créditos de prueba)
  - **Cohere** (Tier gratuito)
  - **OpenAI ChatGPT** (Pago)
- ✅ Cambio fácil entre proveedores mediante variable de entorno
- ✅ Interfaz unificada para todas las APIs
- ✅ Configuración centralizada
- ✅ Extensible para agregar más proveedores

## 📁 Estructura

```
src/ai-provider/
├── ai-provider.interface.ts    # Interfaz común
├── gemini.adapter.ts            # Google Gemini
├── groq.adapter.ts              # Groq (GRATIS)
├── anthropic.adapter.ts         # Claude (Trial)
├── cohere.adapter.ts            # Cohere (GRATIS)
├── openai.adapter.ts            # OpenAI (Pago)
├── ai-provider.service.ts       # Factory/Service
└── ai-provider.module.ts        # Módulo NestJS
```

## ⚙️ Configuración

### 1. Variables de Entorno (.env)

```env
# Seleccionar proveedor de IA
# Opciones: 'gemini', 'groq', 'anthropic', 'cohere', 'openai'
AI_PROVIDER=groq

# API Keys (solo necesitas la del proveedor que uses)
API_KEY=tu_clave_de_gemini
GROQ_API_KEY=tu_clave_de_groq
ANTHROPIC_API_KEY=tu_clave_de_anthropic
COHERE_API_KEY=tu_clave_de_cohere
GPT_API_KEY=tu_clave_de_openai

# Modelos (opcional)
GEMINI_MODEL=gemini-2.5-flash
GROQ_MODEL=llama-3.3-70b-versatile
ANTHROPIC_MODEL=claude-3-5-haiku-20241022
COHERE_MODEL=command-r
OPENAI_MODEL=gpt-4o-mini
```

### 2. Cambiar entre proveedores

**Groq (Recomendado - Gratis y rápido):**
```env
AI_PROVIDER=groq
GROQ_API_KEY=tu_clave
```

**Gemini (Gratis con límites):**
```env
AI_PROVIDER=gemini
API_KEY=tu_clave
```

**Anthropic Claude (Trial credits):**
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=tu_clave
```

**Cohere (Tier gratuito):**
```env
AI_PROVIDER=cohere
COHERE_API_KEY=tu_clave
```

**OpenAI (Pago):**
```env
AI_PROVIDER=openai
GPT_API_KEY=tu_clave
```

## 🚀 Uso en tu código

### Inyección en servicios

```typescript
import { Injectable } from '@nestjs/common';
import { AIProviderService } from '../ai-provider/ai-provider.service';

@Injectable()
export class TuServicio {
  constructor(private aiProvider: AIProviderService) {}

  async tuMetodo() {
    // Enviar un mensaje al proveedor de IA activo
    const response = await this.aiProvider.sendMessage('Tu prompt aquí');
    return response;
  }
}
```

### Métodos disponibles

```typescript
// Enviar un mensaje
const response = await this.aiProvider.sendMessage(prompt);

// Obtener el nombre del proveedor activo
const providerName = this.aiProvider.getProviderName(); // 'Gemini' o 'OpenAI'

// Obtener la instancia del proveedor
const provider = this.aiProvider.getProvider();
```

## 📝 Ejemplos de uso

### Ejemplo 1: Traducción
```typescript
async translateText(text: string, targetLanguage: string) {
  const prompt = `translate this text to ${targetLanguage}: ${text}`;
  const translation = await this.aiProvider.sendMessage(prompt);
  return translation;
}
```

### Ejemplo 2: Generación de sugerencias
```typescript
async getSuggestions(product: string, location: string) {
  const prompt = `Suggest 5 retailers in ${location} that sell ${product}`;
  const suggestions = await this.aiProvider.sendMessage(prompt);
  return JSON.parse(suggestions);
}
```

## 🆓 ¿Cómo obtener API Keys gratuitas?

### 1. Groq (Recomendado - Muy rápido) ⚡
1. Ve a https://console.groq.com/keys
2. Crea una cuenta (gratis)
3. Genera una API key
4. Límites: Muy generosos, ideal para desarrollo

### 2. Google Gemini (Con límites diarios)
1. Ve a https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Crea una API key
4. Límites: 20 requests/día para `gemini-2.5-flash`

### 3. Anthropic Claude (Trial credits)
1. Ve a https://console.anthropic.com/settings/keys
2. Crea una cuenta
3. Obtienes $5 de créditos de prueba
4. Genera una API key

### 4. Cohere (Tier gratuito)
1. Ve a https://dashboard.cohere.com/api-keys
2. Crea una cuenta
3. Genera una API key
4. Límites: 1000 requests/mes gratis

### 5. OpenAI (Requiere pago)
1. Ve a https://platform.openai.com/api-keys
2. Configura método de pago
3. 🔧 Agregar un nuevo proveedoro $5)
4. Genera una API key

1. Crear un nuevo adapter implementando `IAIProvider`:

```typescript
import { IAIProvider } from './ai-provider.interface';

export class NuevoAdapter implements IAIProvider {
  constructor(apiKey: string) {
    // Ini (Google) - FREE
- `gemini-2.5-flash` (por defecto) - Rápido y gratuito
- `gemini-pro` - Más potente
- *📊 Comparación de Proveedores

| Proveedor | Costo | Velocidad | Calidad | Límites Gratuitos |
|-----------|-------|-----------|---------|-------------------|
| **Groq** ⭐ | ✅ Gratis | ⚡⚡⚡ Muy rápido | ⭐⭐⭐⭐ Excelente | Muy generosos |
| **Gemini** | ✅ Gratis | ⚡⚡ Rápido | ⭐⭐⭐⭐ Excelente | 20 req/día |
| **Anthropic** | 💰 Trial $5 | ⚡⚡ Rápido | ⭐⭐⭐⭐⭐ Excepcional | $5 créditos |
| **Cohere** | ✅ Gratis | ⚡⚡ Rápido | ⭐⭐⭐ Bueno | 1000 req/mes |
| **OpenAI** | ❌ Pago | ⚡⚡ Rápido | ⭐⭐⭐⭐⭐ Excepcional | Ninguno |

**Recomendación:** Usa **Groq** para desarrollo (gratis y muy rápido) ⚡s/día en tier gratuito

### Groq - FREE ⚡ (Recomendado)
- `llama-3.3-70b-versatile` (por defecto) - Excelente calidad
- `llama-3.1-70b-versatile` - Muy bueno
- `mixtral-8x7b-32768` - Gran contexto
- **Límites:** Muy generosos, ideal para desarrollo

### Anthropic Claude - FREE TRIAL
- `claude-3-5-haiku-20241022` (por defecto) - Rápido y barato
- `claude-3-5-sonnet-20241022` - Balance
- `claude-3-opus-20240229` - Más potente
- **Límites:** $5 de créditos iniciales

### Cohere - FREE
- `command-r` (por defecto) - Bueno para RAG
- `command-light` - Más rápido
- **Límites:** 1000 requests/mes gratis

### OpenAI - PAID 💰
- `gpt-4o-mini` (por defecto) - Más económico
- `gpt-4o` - Más potente
- `gpt-4-turbo` - Balance
- **Requiere:** Créditos prepagados
}
```

2. Actualizar `ai-provider.service.ts` para incluir el nuevo caso:

```typescript
case 'nuevo':
  return new NuevoAdapter(process.env.NUEVO_API_KEY);
```

## 🎨 Modelos disponibles

### Gemini
- `gemini-2.5-flash` (por defecto)
- `gemini-pro`
- `gemini-pro-vision`

### OpenAI
- `gpt-4o-mini` (por defecto, más económico)
- `gpt-4o` (más potente)
- `gpt-4-turbo`
- `gpt-3.5-turbo`

## ⚡ Ventajas del sistema

1. **Desacoplamiento**: Tu código no depende directamente de una API específica
2. **Flexibilidad**: Cambiar de proveedor es tan simple como cambiar una variable de entorno
3. **Testeable**: Fácil crear mocks para pruebas unitarias
4. **Mantenible**: Cambios en una API no afectan el resto del código
5. **Extensible**: Agregar nuevos proveedores sin modificar código existente

## 🔍 Logs

Al iniciar la aplicación, verás en consola qué proveedor está activo:

```
🤖 AI Provider: Gemini (gemini-2.5-flash)
```
o
```
🤖 AI Provider: OpenAI (gpt-4o-mini)
```

## 🛟 Solución de problemas

### Error: "API_KEY is required"
- Asegúrate de tener `API_KEY` en tu `.env` si usas Gemini
- Asegúrate de tener `GPT_API_KEY` en tu `.env` si usas OpenAI

### Error al cambiar de proveedor
- Reinicia el servidor después de cambiar `AI_PROVIDER`
- Verifica que la API key del proveedor seleccionado sea válida

### Respuestas inconsistentes entre proveedores
- Los modelos pueden dar respuestas con formato ligeramente diferente
- Ajusta tus prompts para ser más específicos sobre el formato esperado
