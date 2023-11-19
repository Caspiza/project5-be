const request = require('supertest');
const app = require('../app');
require('../models');
let id;

test('GET /actors trae todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors crea un nuevo artista', async () => {
    const actor = {
        firstName: 'Morgan',
        lastName: 'Freeman',
        nationality:'Unites States',
        image:'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSbh2LlGBtQjD-bHC7k7s9O6y0J0mhba4fJktXe6CxJiiOva41AwzuBNkwfvoy4DOAJ',
        birthday:'6/1/1937'
    }
    const res = await request(app).post('/actors').send(actor);
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
});

test('PUT /actors actualiza los actores', async () => {
    const actor = {
        firstName: 'Morgano'
    }
    const res= await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});

test('DELETE /actors/:id elimina los actores', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});