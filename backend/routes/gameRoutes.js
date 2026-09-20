import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

// 1. GET: Obtener todas las partidas (Leaderboard / Ranking)
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ score: -1, createdAt: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las partidas', error: error.message });
  }
});

// 2. GET: Obtener una partida por ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Partida no encontrada' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la partida', error: error.message });
  }
});

// 3. POST: Crear / Guardar una nueva partida
router.post('/', async (req, res) => {
  try {
    const { player, score, comment } = req.body;
    const newGame = new Game({ player, score, comment });
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar la partida', error: error.message });
  }
});

// 4. PUT: Actualizar comentario o nombre de una partida
router.put('/:id', async (req, res) => {
  try {
    const { player, comment } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { player, comment },
      { new: true, runValidators: true }
    );
    if (!updatedGame) {
      return res.status(404).json({ message: 'Partida no encontrada' });
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la partida', error: error.message });
  }
});

// 5. DELETE: Eliminar una partida del historial
router.delete('/:id', async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Partida no encontrada' });
    }
    res.json({ message: 'Partida eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la partida', error: error.message });
  }
});

export default router;