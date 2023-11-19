const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');
let id;

test('GET /movies trae todas las películas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies crea una nueva película)', async () => {
    const movie = {
        name: 'El Rey Leon',
        image: 'Reyleon.jpg',
        synopsis: 'Felices para siempre',
        releaseYear: '2000'
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/id actualiza una película', async () => {
    const movie = {
        name:'El Tigre Rey'
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/id/actors', async () => {
    const actor = await Actor.create({ 
        firstName: 'George',
        lastName: 'Clooney',
        nationality: 'EEUU',
        image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRtws8keYVs4DJmSbs80TQg30BZW8OLT5-JwVACDtTP17nyjZkbeSARAFcxY8koPHMp',
        birthday: '5/6/1961'
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /mvies/id/directors', async () => {
    const director = await Director.create ({
        firstName: 'Guillermo',
        lastName: 'Del Toro',
        nationality: 'México',
        image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTxtbRXP8Pevq74Fj-zlOBdbnM7BNkb4zGjR54H7jSom2Q4Fq0TB58VE4uzLS-OdLVX',
        birthday: '10/9/1964'
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/id/genres', async () => {
    const genre = await Genre.create({
        name: 'Electro'
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /movies/id elimina una película', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
});