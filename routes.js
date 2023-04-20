// routes.js

const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const requireAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = (db) => {

  router.get('/login', (req, res) => {
    res.render('login');
  });
  
  const { createCharacter } = require('./character');

  router.post('/create-character', async (req, res) => {
    try {
      const { name, bio, password } = req.body;
      const newCharacter = await createCharacter(db, name, bio, password);
  
      // Redirect to a success page or the character's profile page
      res.redirect(`/characters/${newCharacter._id}`);
    } catch (err) {
      // Handle errors, such as a duplicate character name
      res.status(400).send(err.message);
    }
  });
  
  router.post('/login', (req, res) => {
    // Implement your authentication logic here
    // If authenticated, set req.session.isAuthenticated to true
    res.redirect('/admin');
  });

  router.get('/admin', requireAuth, (req, res) => {
    res.render('admin/dashboard');
  });

  // Planets management routes
  router.get('/admin/planets', requireAuth, async (req, res) => {
    const planets = await db.collection('planets').find().toArray();
    res.render('admin/planets', { planets });
  });

  router.post('/admin/planets', requireAuth, async (req, res) => {
    const planetName = req.body.planetName;
    await db.collection('planets').insertOne({ name: planetName });
    res.redirect('/admin/planets');
  });

  router.put('/admin/planets/:id', requireAuth, async (req, res) => {
    const planetId = req.params.id;
    const planetName = req.body.planetName;
    await db.collection('planets').updateOne({ _id: new MongoClient.ObjectId(planetId) }, { $set: { name: planetName } });
    res.redirect('/admin/planets');
  });

  router.delete('/admin/planets/:id', requireAuth, async (req, res) => {
    const planetId = req.params.id;
    await db.collection('planets').deleteOne({ _id: new MongoClient.ObjectId(planetId) });
    res.redirect('/admin/planets');
  });

  // Add other routes for materials and products here
  // For listing products
  res.render('admin/products/list', { products });

  // For creating a new product
  res.render('admin/products/new');

  // For editing a product
  res.render('admin/products/edit', { product });

  router.get('/player/:playerId/inventory', async (req, res) => {
    const playerId = req.params.playerId;
  
    // Fetch player's resources from the database
    const resources = await getPlayersResources(playerId);
  
    res.render('inventory', { resources });
  });
  
  return router;
};
