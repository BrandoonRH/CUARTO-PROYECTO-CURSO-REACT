import {describe, expect, test} from "vitest"; 
import heroesApi from "./heroes.api";

//!Podemos tener un archivo de variables de entorno para tests con .env.test y vite lo toma en cuenta solo con el nombre
const BASE_URL= import.meta.env.VITE_API_URL; 

describe('HeroApi',() => {
    test('Should be configure poting to the testing server', () => {
        expect(heroesApi).toBeDefined(); 
        expect(heroesApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain('3001')
    })
})