const request = require('supertest');
const app = require('../app');
require('../models');
let id;

test('GET /genres trae todos los generos', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres crea un nuevo genero', async () => {
    const genre = {
        name: 'Fantasy'
    }
    const res = await request(app).post('/genres').send(genre);
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genre.name);
});

test('PUT /genres/id actualiza los generos', async () => {
    const genre = {
        name: 'Fantasy update'
    }
    const res= await request(app).put(`/genres/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test('DELETE /genres/id elimina los generos', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});