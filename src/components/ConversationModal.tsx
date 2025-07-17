'use client';

import React from 'react';
import { X, User, Bot, Headphones, Clock, Phone, AlertTriangle, Calendar, Car, Euro, FileText, History } from 'lucide-react';
import { Conversation, Message } from '../types';
import { mockIncidents } from '../data/mockData';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ConversationModalProps {
  conversation: Conversation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConversationModal({ conversation, isOpen, onClose }: ConversationModalProps) {
  if (!isOpen || !conversation) return null;

  // Filtrar incidencias del cliente actual
  const currentCustomerIncidents = mockIncidents.filter(
    incident => incident.phoneNumber === conversation.phoneNumber
  );

  // Incidencia más reciente (activa o en proceso)
  const activeIncident = currentCustomerIncidents.find(
    incident => incident.status === 'abierta' || incident.status === 'en_proceso'
  );

  // Historial de incidencias (todas las demás)
  const incidentHistory = currentCustomerIncidents.filter(
    incident => incident.id !== activeIncident?.id
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getSenderIcon = (sender: Message['sender']) => {
    switch (sender) {
      case 'customer':
        return <User className="w-4 h-4 text-neutral-600" />;
      case 'agent':
        return <Headphones className="w-4 h-4 text-avis-red" />;
      case 'bot':
        return <Bot className="w-4 h-4 text-blue-600" />;
      default:
        return <User className="w-4 h-4 text-neutral-600" />;
    }
  };

  const getSenderBgColor = (sender: Message['sender']) => {
    switch (sender) {
      case 'customer':
        return 'bg-neutral-100';
      case 'agent':
        return 'bg-avis-red-50';
      case 'bot':
        return 'bg-blue-50';
      default:
        return 'bg-neutral-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-avis-red-100 text-avis-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'resolved': return 'Resuelta';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case 'abierta': return 'bg-red-100 text-red-800';
      case 'en_proceso': return 'bg-avis-red-100 text-avis-red-800';
      case 'resuelta': return 'bg-green-100 text-green-800';
      case 'cerrada': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getIncidentStatusText = (status: string) => {
    switch (status) {
      case 'abierta': return 'Abierta';
      case 'en_proceso': return 'En Proceso';
      case 'resuelta': return 'Resuelta';
      case 'cerrada': return 'Cerrada';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critica': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critica': return 'Crítica';
      case 'alta': return 'Alta';
      case 'media': return 'Media';
      case 'baja': return 'Baja';
      default: return priority;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'consulta': return 'Consulta';
      case 'incidencia_vehiculo': return 'Inc. Vehículo';
      case 'incidencia_pago': return 'Inc. Pago';
      case 'incidencia_devolucion': return 'Inc. Devolución';
      case 'queja': return 'Queja';
      case 'solicitud_info': return 'Sol. Info';
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] flex">
        {/* Panel principal de conversación */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-800">
                  Conversación con {conversation.customerName}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-neutral-600">
                    <Phone className="w-4 h-4" />
                    <span>{conversation.phoneNumber}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                    {getStatusText(conversation.status)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {conversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'customer' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getSenderBgColor(message.sender)} flex items-center justify-center`}>
                  {getSenderIcon(message.sender)}
                </div>
                
                <div className={`max-w-[70%] ${message.sender === 'customer' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-neutral-700">
                      {message.senderName}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {format(message.timestamp, 'HH:mm', { locale: es })}
                    </span>
                  </div>
                  
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'customer'
                        ? 'bg-avis-red text-white'
                        : message.sender === 'agent'
                        ? 'bg-avis-red-50 text-neutral-800'
                        : 'bg-blue-50 text-neutral-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {!message.read && (
                    <div className="text-xs text-neutral-500 mt-1">
                      No leído
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200 bg-neutral-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Última actividad: {format(conversation.timestamp, 'dd MMM yyyy HH:mm', { locale: es })}</span>
                </div>
                <div>
                  Total de mensajes: {conversation.messageCount}
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-avis-red text-white rounded-lg hover:bg-avis-red-dark transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>

        {/* Panel lateral derecho - Información del cliente */}
        <div className="w-96 border-l border-neutral-200 flex flex-col bg-neutral-50">
          {/* Header del panel */}
          <div className="p-4 border-b border-neutral-200 bg-white">
            <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
              <User className="w-5 h-5 text-avis-red" />
              Información del Cliente
            </h3>
            <p className="text-sm text-neutral-600 mt-1">{conversation.customerName}</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Incidencia activa */}
            {activeIncident && (
              <div className="p-4 border-b border-neutral-200 bg-white mb-2">
                <h4 className="text-md font-semibold text-neutral-800 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  Incidencia Activa
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-700">{activeIncident.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIncidentStatusColor(activeIncident.status)}`}>
                      {getIncidentStatusText(activeIncident.status)}
                    </span>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-neutral-800 text-sm">{activeIncident.title}</h5>
                    <p className="text-xs text-neutral-600 mt-1">{activeIncident.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-neutral-500">Tipo:</span>
                      <div className="font-medium text-neutral-700">{getTypeText(activeIncident.type)}</div>
                    </div>
                    <div>
                      <span className="text-neutral-500">Prioridad:</span>
                      <div className={`inline-block px-1 py-0.5 rounded text-xs ${getPriorityColor(activeIncident.priority)}`}>
                        {getPriorityText(activeIncident.priority)}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Creada: {format(activeIncident.createdAt, 'dd MMM HH:mm', { locale: es })}</span>
                    </div>
                  </div>

                  {activeIncident.vehicleModel && (
                    <div className="text-xs">
                      <div className="flex items-center gap-1 text-neutral-600">
                        <Car className="w-3 h-3" />
                        <span>{activeIncident.vehicleModel} ({activeIncident.vehicleId})</span>
                      </div>
                    </div>
                  )}

                  {activeIncident.amount && (
                    <div className="text-xs">
                      <div className="flex items-center gap-1 text-neutral-600">
                        <Euro className="w-3 h-3" />
                        <span className="font-medium">{activeIncident.amount.toFixed(2)} €</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Historial de incidencias */}
            <div className="p-4">
              <h4 className="text-md font-semibold text-neutral-800 flex items-center gap-2 mb-3">
                <History className="w-4 h-4 text-neutral-600" />
                Historial de Incidencias
                <span className="text-xs bg-neutral-200 text-neutral-600 px-2 py-1 rounded-full">
                  {incidentHistory.length}
                </span>
              </h4>

              {incidentHistory.length > 0 ? (
                <div className="space-y-3">
                  {incidentHistory.map((incident) => (
                    <div key={incident.id} className="bg-white rounded-lg p-3 border border-neutral-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-neutral-700">{incident.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIncidentStatusColor(incident.status)}`}>
                          {getIncidentStatusText(incident.status)}
                        </span>
                      </div>
                      
                      <h6 className="text-sm font-medium text-neutral-800 mb-1">{incident.title}</h6>
                      <p className="text-xs text-neutral-600 mb-2 line-clamp-2">{incident.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span className={`px-1 py-0.5 rounded ${getPriorityColor(incident.priority)}`}>
                          {getPriorityText(incident.priority)}
                        </span>
                        <span>{format(incident.createdAt, 'dd MMM yyyy', { locale: es })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-neutral-500">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                  <p className="text-sm">Sin historial previo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 