import React, { useState } from 'react';
import { Trophy, Trash2, Edit2, Check, X } from 'lucide-react';

export default function LeaderBoard({ games, onDelete, onUpdate }) {
    const [editingId, setEditingId] = useState(null);
    const [editComment, setEditComment] = useState('');

    const handleStartEdit = (game) => {
        setEditingId(game._id);
        setEditComment(game.comment || '');
    };

    const handleSaveEdit = (id) => {
        onUpdate(id, editComment);
        setEditingId(null);
    };

    return (
        <div className="bg-slate-800/90 text-white p-6 rounded-2xl shadow-xl backdrop-blur-md border border-slate-700 w-full max-w-2xl mx-auto mt-8">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold">Ranking & Historial de Partidas</h2>
            </div>

            {games.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No hay partidas registradas aún. ¡Sé el primero!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400 text-sm">
                                <th className="p-3">Jugador</th>
                                <th className="p-3">Racha</th>
                                <th className="p-3">Comentario</th>
                                <th className="p-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((g, index) => (
                                <tr key={g._id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                                    <td className="p-3 font-semibold flex items-center gap-2">
                                        <span className="text-xs text-slate-400">#{index + 1}</span>
                                        {g.player}
                                    </td>
                                    <td className="p-3 font-bold text-emerald-400">{g.score} pts</td>
                                    <td className="p-3 text-sm text-slate-300 max-w-xs truncate">
                                        {editingId === g._id ? (
                                            <input
                                                type="text"
                                                className="bg-slate-900 border border-indigo-500 text-white rounded px-2 py-1 text-sm w-full outline-none"
                                                value={editComment}
                                                onChange={(e) => setEditComment(e.target.value)}
                                            />
                                        ) : (
                                            g.comment || <span className="italic text-slate-500">Sin nota</span>
                                        )}
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {editingId === g._id ? (
                                                <>
                                                    <button onClick={() => handleSaveEdit(g._id)} className="p-1 hover:text-emerald-400 text-slate-300">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => setEditingId(null)} className="p-1 hover:text-rose-400 text-slate-300">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleStartEdit(g)} className="p-1 hover:text-indigo-400 text-slate-400">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => onDelete(g._id)} className="p-1 hover:text-rose-400 text-slate-400">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}