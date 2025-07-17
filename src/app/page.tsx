'use client';

import React, { useState } from 'react';
import { Car, MessageSquare, AlertTriangle, TrendingUp, Menu, X, FileText } from 'lucide-react';
import ConversationsPanel from '@/components/ConversationsPanel';
import IncidentsPanel from '@/components/IncidentsPanel';
import StatisticsPanel from '@/components/StatisticsPanel';
import SessionsPanel from '@/components/SessionsPanel';
import { mockConversations, mockIncidents, mockStats, mockSessions } from '@/data/mockData';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'conversations' | 'incidents' | 'statistics' | 'sessions'>('conversations');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'conversations', label: 'Conversaciones', icon: MessageSquare, color: 'text-avis-red' },
    { id: 'sessions', label: 'Sesiones', icon: FileText, color: 'text-blue-600' },
    { id: 'incidents', label: 'Incidencias', icon: AlertTriangle, color: 'text-orange-600' },
    { id: 'statistics', label: 'Estadísticas', icon: TrendingUp, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-avis-red" />
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Panel AVIS</h1>
                <p className="text-sm text-neutral-500">Gestión de Incidencias y Conversaciones</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-neutral-100 rounded-lg p-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">WhatsApp Bot Activo</span>
              </div>
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar / Navigation */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as 'conversations' | 'incidents' | 'statistics' | 'sessions');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-avis-red-50 text-avis-red border-l-4 border-avis-red'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : 'text-neutral-400'}`} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Resumen Rápido</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Conversaciones Activas</span>
                  <span className="font-semibold text-green-600">
                    {mockConversations.filter(c => c.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Incidencias Abiertas</span>
                  <span className="font-semibold text-orange-600">
                    {mockIncidents.filter(i => i.status === 'abierta').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Incidencias Resueltas</span>
                  <span className="font-semibold text-avis-red">
                    {mockIncidents.filter(i => i.status === 'resuelta').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Total Sesiones</span>
                  <span className="font-semibold text-blue-600">
                    {mockSessions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'conversations' && (
              <ConversationsPanel conversations={mockConversations} />
            )}
            {activeTab === 'incidents' && (
              <IncidentsPanel incidents={mockIncidents} />
            )}
            {activeTab === 'statistics' && (
              <StatisticsPanel stats={mockStats} />
            )}
            {activeTab === 'sessions' && (
              <SessionsPanel sessions={mockSessions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
