# Generador de contraseñas

## Cómo ejecutarlo

En esta carpeta: `npm install` si faltan dependencias, luego `npm start`, `npm test`, `npm run lint` y `npm run format:check`.

## Salida

`npm start`:

```text
🔑 38TOY0amDKM4     · 12 caracteres · fuerte
🔑 DxWT9rnnm*lxf0k& · 16 caracteres · fuerte
🔑 xrirex           · 6 caracteres · débil
🧪 abc              · débil
🧪 abcdefghijkl     · media
🧪 abcdefgh1        · media
🧪 Abcdefgh1234!    · fuerte
🎲 Con crypto: 20 caracteres
❌ RangeError: Longitud no válida: 3
```

La fuente seeded garantiza los mismos resultados; la clave generada con `crypto` cambia. La salida se ejecutó con Node 24.

## Tests

`npm test` pasó: 1 fichero, 11 tests.

Los tests prueban longitud predeterminada y límites, rechazo de valores inválidos, inclusión de todos los grupos incluso con generador que devuelve cero, repetibilidad por semilla, uso de `crypto.getRandomValues` mediante spy y fuerza en longitudes 7, 8, 11 y 12, además de casos de variedad.

| `describe` | Qué comprueba | Cómo controla el azar |
|---|---|---|
| `generarContrasena` | Longitud, validación, grupos obligatorios y semilla | Semilla o función `() => 0` |
| `numeroAleatorio` | Llamada a Web Crypto | `vi.spyOn`, restaurado con `afterEach` |
| `evaluarFuerza` | Umbrales de longitud y variedad | No depende del azar |

## ¿Detectan errores tus tests?

Si se baja el mínimo de longitud de 4 a 3, falla el test de longitudes inválidas: espera que longitud 3 lance `RangeError`.

## Herramientas

`npm run lint` y `npm run format:check` finalizaron sin errores. `npm run format` formateó los ficheros del ejercicio que revisan las herramientas.

## Integración continua (opcional)

No implementada. No se creó workflow ni se hicieron comprobaciones en GitHub.
