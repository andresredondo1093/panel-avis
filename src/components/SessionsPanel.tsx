'use client';

import React, { useState } from 'react';
import { Search, MessageSquare, Clock, User, Star, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { ConversationSession } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SessionsPanelProps {
  sessions: ConversationSession[];
}

export default function SessionsPanel({ sessions }: SessionsPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null);

  const filteredSessions = sessions.filter(session => 
    session.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSatisfactionColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSatisfactionBg = (rating: number) => {
    if (rating >= 8) return 'bg-green-50 border-green-200';
    if (rating >= 6) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Sesiones de Conversación</h2>
          <p className="text-neutral-600 mt-1">
            Resúmenes de las sesiones completadas con clientes
          </p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por cliente o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-avis-red focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 ${
              session.customerSatisfaction.rating >= 8
                ? 'border-green-500'
                : session.customerSatisfaction.rating >= 6
                ? 'border-yellow-500'
                : 'border-red-500'
            } cursor-pointer`}
            onClick={() => setSelectedSession(session)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-avis-red-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-avis-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{session.customerName}</h3>
                    <p className="text-sm text-neutral-500">{session.phoneNumber}</p>
                  </div>
                </div>
                {session.emailSent && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">Enviado</span>
                  </div>
                )}
              </div>

              {/* Summary */}
              <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                {session.summary}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-avis-red">{session.totalCasesManaged}</div>
                  <div className="text-xs text-neutral-500">Casos Gestionados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-700">{session.duration}m</div>
                  <div className="text-xs text-neutral-500">Duración</div>
                </div>
              </div>

              {/* Cases Preview */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-neutral-700">Casos:</span>
                </div>
                <div className="space-y-1">
                  {session.cases.slice(0, 2).map((case_) => (
                    <div key={case_.id} className="flex items-center gap-2 text-xs">
                      {case_.type === 'consulta' ? (
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-orange-500" />
                      )}
                      <span className="text-neutral-600 truncate">{case_.title}</span>
                      {case_.resolved && <CheckCircle className="w-3 h-3 text-green-500" />}
                    </div>
                  ))}
                  {session.cases.length > 2 && (
                    <div className="text-xs text-neutral-400">
                      +{session.cases.length - 2} casos más...
                    </div>
                  )}
                </div>
              </div>

              {/* Satisfaction */}
              <div className={`rounded-lg p-3 border ${getSatisfactionBg(session.customerSatisfaction.rating)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Satisfacción</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-lg font-bold ${getSatisfactionColor(session.customerSatisfaction.rating)}`}>
                      {session.customerSatisfaction.rating}
                    </span>
                    <span className="text-sm text-neutral-500">/10</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {renderStars(session.customerSatisfaction.rating)}
                </div>
                {session.customerSatisfaction.feedback && (
                                      <p className="text-xs text-neutral-600 italic line-clamp-2">
                    &ldquo;{session.customerSatisfaction.feedback}&rdquo;
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="w-3 h-3" />
                  {format(session.sessionDate, 'dd/MM/yyyy HH:mm', { locale: es })}
                </div>
                {session.agentName && (
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <User className="w-3 h-3" />
                    {session.agentName}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No se encontraron sesiones</h3>
          <p className="text-neutral-500">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Aún no hay sesiones registradas'}
          </p>
        </div>
      )}

      {/* Modal para ver detalles de la sesión */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-6">
              {/* Header del Modal */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">Sesión de Conversación</h2>
                  <p className="text-neutral-600">{selectedSession.customerName} - {selectedSession.phoneNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-neutral-500 hover:text-neutral-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna izquierda - Información general */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Resumen */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">📋 Resumen de la Sesión</h3>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <p className="text-neutral-700">{selectedSession.summary}</p>
                    </div>
                  </div>

                  {/* Casos gestionados */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      📝 Casos Gestionados ({selectedSession.totalCasesManaged})
                    </h3>
                    <div className="space-y-3">
                      {selectedSession.cases.map((case_) => (
                        <div key={case_.id} className="bg-white border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {case_.type === 'consulta' ? (
                                <MessageSquare className="w-5 h-5 text-blue-500" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-orange-500" />
                              )}
                              <span className="font-medium text-neutral-900 capitalize">{case_.type}</span>
                            </div>
                            {case_.resolved && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm">Resuelto</span>
                              </div>
                            )}
                          </div>
                          <h4 className="font-medium text-neutral-800 mb-2">{case_.title}</h4>
                          <p className="text-sm text-neutral-600">{case_.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Columna derecha - Métricas y satisfacción */}
                <div className="space-y-6">
                  {/* Métricas de la sesión */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">📊 Métricas</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-700 font-medium">Duración:</span>
                        <span className="font-bold text-neutral-900">{selectedSession.duration} minutos</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-700 font-medium">Fecha:</span>
                        <span className="font-bold text-neutral-900">
                          {format(selectedSession.sessionDate, 'dd/MM/yyyy', { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-700 font-medium">Hora:</span>
                        <span className="font-bold text-neutral-900">
                          {format(selectedSession.sessionDate, 'HH:mm', { locale: es })}
                        </span>
                      </div>
                      {selectedSession.agentName && (
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-700 font-medium">Agente:</span>
                          <span className="font-bold text-neutral-900">{selectedSession.agentName}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-700 font-medium">Email enviado:</span>
                        <span className={`font-bold ${selectedSession.emailSent ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedSession.emailSent ? 'Sí' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Satisfacción del cliente */}
                  <div className={`rounded-lg p-4 border ${getSatisfactionBg(selectedSession.customerSatisfaction.rating)}`}>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">😊 Satisfacción del Cliente</h3>
                    <div className="text-center mb-4">
                      <div className={`text-4xl font-bold ${getSatisfactionColor(selectedSession.customerSatisfaction.rating)} mb-2`}>
                        {selectedSession.customerSatisfaction.rating}/10
                      </div>
                      <div className="flex justify-center gap-0.5 mb-3">
                        {renderStars(selectedSession.customerSatisfaction.rating)}
                      </div>
                    </div>
                    {selectedSession.customerSatisfaction.feedback && (
                      <div>
                        <h4 className="font-medium text-neutral-800 mb-2">Comentario del cliente:</h4>
                                                 <p className="text-sm text-neutral-700 italic bg-white bg-opacity-50 p-3 rounded">
                           &ldquo;{selectedSession.customerSatisfaction.feedback}&rdquo;
                         </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 