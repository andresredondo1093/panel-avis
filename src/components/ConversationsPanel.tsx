'use client';

import React, { useState } from 'react';
import { Search, MessageCircle, Clock, User, Phone } from 'lucide-react';
import { Conversation } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ConversationModal from './ConversationModal';

interface ConversationsPanelProps {
  conversations: Conversation[];
}

export default function ConversationsPanel({ conversations }: ConversationsPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'resolved' | 'pending'>('all');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conversation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedConversation(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-avis-red" />
            Conversaciones
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por teléfono o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-avis-red focus:border-transparent outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'resolved' | 'pending')}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-avis-red focus:border-transparent outline-none"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activa</option>
              <option value="resolved">Resuelta</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredConversations.map((conversation) => (
            <div key={conversation.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-neutral-50"
                 onClick={() => handleConversationClick(conversation)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-600" />
                      <span className="font-semibold text-neutral-800">{conversation.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Phone className="w-4 h-4" />
                      <span>{conversation.phoneNumber}</span>
                    </div>
                  </div>
                  <p className="text-neutral-700 mb-3 text-sm">{conversation.lastMessage}</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{format(conversation.timestamp, 'dd MMM yyyy HH:mm', { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{conversation.messageCount} mensajes</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                    {getStatusText(conversation.status)}
                  </span>
                  <button 
                    className="text-avis-red hover:text-avis-red-dark text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConversationClick(conversation);
                    }}
                  >
                    Ver conversación
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <div className="text-center py-8 text-neutral-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
            <p>No se encontraron conversaciones</p>
          </div>
        )}
      </div>

      {/* Modal de conversación */}
      <ConversationModal
        conversation={selectedConversation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
} 