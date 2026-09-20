import React from 'react';

export default function Card({ card, hidden = false }) {
    if (hidden) {
        return (
            <div className="w-32 h-48 sm:w-40 sm:h-56 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl border-4 border-white shadow-xl flex items-center justify-center transform transition-transform duration-300">
                <div className="w-24 h-40 sm:w-32 sm:h-48 border-2 border-indigo-300/40 rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-indigo-200">🎴</span>
                </div>
            </div>
        );
    }

    if (!card) return null;

    return (
        <div className="w-32 h-48 sm:w-40 sm:h-56 bg-white rounded-xl border-2 border-slate-200 shadow-xl p-3 flex flex-col justify-between select-none transform transition-transform duration-300 hover:scale-105">
            <div className={`text-left font-bold text-lg sm:text-xl ${card.color}`}>
                {card.name} <span>{card.suit}</span>
            </div>
            <div className={`text-center text-4xl sm:text-5xl ${card.color}`}>
                {card.suit}
            </div>
            <div className={`text-right font-bold text-lg sm:text-xl rotate-180 ${card.color}`}>
                {card.name} <span>{card.suit}</span>
            </div>
        </div>
    );
}