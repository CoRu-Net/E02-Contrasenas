import { afterEach, describe, it, expect, vi } from 'vitest';
import {
  generarContrasena,
  crearAleatorioConSemilla,
  numeroAleatorio,
  evaluarFuerza,
} from '../src/contrasenas.js';

describe('generarContrasena', () => {
  it('tiene 12 caracteres por defecto', () => {
    expect(generarContrasena({}, crearAleatorioConSemilla(1))).toHaveLength(12);
  });

  it('acepta los límites 4 y 128 y rechaza longitudes inválidas', () => {
    expect(generarContrasena({ longitud: 4 }, () => 0)).toHaveLength(4);
    expect(generarContrasena({ longitud: 128 }, () => 0)).toHaveLength(128);
    for (const longitud of [3, 129, 4.5, 0]) {
      expect(() => generarContrasena({ longitud })).toThrow(RangeError);
    }
  });
  it('garantiza los tipos incluso con azar siempre cero', () => {
    const clave = generarContrasena(
      { longitud: 8, mayusculas: true, numeros: true, simbolos: true },
      () => 0,
    );
    expect(clave).toMatch(/[a-z]/);
    expect(clave).toMatch(/[A-Z]/);
    expect(clave).toMatch(/[0-9]/);
    expect(clave).toMatch(/[!@#$%&*?_-]/);
  });
  it('repite la contraseña con la misma semilla', () => {
    expect(generarContrasena({}, crearAleatorioConSemilla(23))).toBe(
      generarContrasena({}, crearAleatorioConSemilla(23)),
    );
  });
});

describe('numeroAleatorio', () => {
  afterEach(() => vi.restoreAllMocks());
  it('usa crypto.getRandomValues', () => {
    vi.spyOn(crypto, 'getRandomValues').mockImplementation((array) => {
      array[0] = 2 ** 31;
      return array;
    });
    expect(numeroAleatorio()).toBe(0.5);
    expect(crypto.getRandomValues).toHaveBeenCalledOnce();
  });
});

describe('evaluarFuerza', () => {
  it.each([
    ['abcdefg', 'débil'],
    ['abcdefgh', 'débil'],
    ['abcdefghijk', 'débil'],
    ['abcdefghijkl', 'media'],
    ['Abcdefgh1', 'media'],
    ['Abcdefgh1234!', 'd�bil'],
  ])('evalúa %s', (clave, esperado) => {
    expect(evaluarFuerza(clave)).toBe(esperado);
  });
});
