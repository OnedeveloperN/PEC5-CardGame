import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUp, ArrowDown, RotateCcw, Save } from 'lucide-react';
import Card from './components/Card';
import Leaderboard from './components/LeaderBoard';
import { createDeck } from './utils/deck';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/games';

export default function App() {
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [nextCard, setNextCard] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [comment, setComment] = useState('');
  const [games, setGames] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // Cargar partidas de MongoDB
  const fetchGames = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error('Error al obtener datos:', err);
    }
  };

  useEffect(() => {
    fetchGames();
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = createDeck();
    setCurrentCard(newDeck[0]);
    setNextCard(newDeck[1]);
    setDeck(newDeck.slice(2));
    setScore(0);
    setGameOver(false);
    setMessage('¿La siguiente carta será mayor o menor?');
    setIsSaved(false);
    setComment('');
  };

  const handleGuess = (choice) => {
    if (gameOver || !nextCard) return;

    const isHigher = nextCard.value > currentCard.value;
    const isEqual = nextCard.value === currentCard.value;
    const isCorrect = (choice === 'higher' && isHigher) || (choice === 'lower' && !isHigher && !isEqual);

    if (isCorrect || isEqual) {
      const newScore = score + 1;
      setScore(newScore);
      setMessage(isEqual ? '¡Empate! Se mantiene la racha 🎯' : '¡Correcto! 🔥');

      if (newScore % 5 === 0) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      }

      setCurrentCard(nextCard);
      if (deck.length > 0) {
        setNextCard(deck[0]);
        setDeck(deck.slice(1));
      } else {
        setGameOver(true);
        setMessage('🎉 ¡Has completado todo el mazo! Increíble.');
      }
    } else {
      setGameOver(true);
      setMessage(`❌ Error. La carta era ${nextCard.name} de ${nextCard.suit}.`);
    }
  };

  const handleSaveScore = async (e) => {
    e.preventDefault();
    if (!playerName.trim() || isSaved) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: playerName, score, comment }),
      });

      if (res.ok) {
        setIsSaved(true);
        fetchGames();
      }
    } catch (err) {
      console.error('Error al guardar la partida:', err);
    }
  };

  const handleDeleteGame = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchGames();
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  const handleUpdateComment = async (id, newComment) => {
    try {
      const gameToUpdate = games.find((g) => g._id === id);
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: gameToUpdate.player, comment: newComment }),
      });
      if (res.ok) fetchGames();
    } catch (err) {
      console.error('Error al actualizar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-8 px-4 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-400">
          MAYOR O MENOR
        </h1>
        <p className="text-slate-400 mt-1 text-sm sm:text-base">Prueba tu intuición y consigue la mayor racha</p>
      </header>

      {/* Marcador */}
      <div className="bg-slate-800/80 border border-slate-700 px-6 py-2 rounded-full mb-6 shadow-inner">
        <span className="text-slate-400 text-sm">Racha actual: </span>
        <span className="text-emerald-400 font-extrabold text-2xl ml-2">{score}</span>
      </div>

      {/* Tapete de juego */}
      <div className="flex items-center justify-center gap-6 my-4">
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-2 font-medium">Carta Actual</span>
          <Card card={currentCard} />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-2 font-medium">Siguiente</span>
          <Card card={nextCard} hidden={!gameOver} />
        </div>
      </div>

      <p className="text-center font-medium my-4 text-amber-300 min-h-[24px]">{message}</p>

      {/* Botones de acción */}
      {!gameOver ? (
        <div className="flex gap-4 my-2">
          <button
            onClick={() => handleGuess('higher')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" /> MAYOR
          </button>
          <button
            onClick={() => handleGuess('lower')}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition active:scale-95 cursor-pointer"
          >
            <ArrowDown className="w-5 h-5" /> MENOR
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-sm gap-4 my-2 bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <form onSubmit={handleSaveScore} className="w-full flex flex-col gap-3">
            <input
              type="text"
              placeholder="Tu nombre de jugador"
              required
              className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500 transition"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              disabled={isSaved}
            />
            <input
              type="text"
              placeholder="Comentario u opinión (opcional)"
              className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500 transition text-sm"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSaved}
            />
            <button
              type="submit"
              disabled={isSaved}
              className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition shadow-lg ${isSaved ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
                }`}
            >
              <Save className="w-5 h-5" /> {isSaved ? '¡Puntuación Guardada!' : 'Guardar Récord'}
            </button>
          </form>

          <button
            onClick={startNewGame}
            className="flex items-center gap-2 text-slate-300 hover:text-white font-medium py-2 px-4 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Jugar de nuevo
          </button>
        </div>
      )}

      {/* Leaderboard y gestión de registros */}
      <LeaderBoard games={games} onDelete={handleDeleteGame} onUpdate={handleUpdateComment} />
    </div>
  );
}