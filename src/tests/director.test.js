const request = require('supertest');
const app = require('../app');
require('../models');
let id;

test('/GET /directors trae los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors crea un nuevo director)', async () => {
    const director = {
        firstName: 'Francisco',
        lastName: 'Lonbardy',
        nationality: 'Perú',
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Francisco_Lombardi_en_2018.jpg',
        birthday: '8/3/1949'
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

test('PUT /director/id', async () => {
    const director = {
        firstName:'Pancho'
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE /director/id', async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
});