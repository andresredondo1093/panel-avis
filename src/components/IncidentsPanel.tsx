'use client';

import React, { useState } from 'react';
import { AlertTriangle, User, Phone, Calendar, Car, Euro, Filter, Search } from 'lucide-react';
import { Incident } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface IncidentsPanelProps {
  incidents: Incident[];
}

export default function IncidentsPanel({ incidents }: IncidentsPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || incident.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critica': return 'bg-red-100 text-red-800 border-red-200';
      case 'alta': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'abierta': return 'bg-red-100 text-red-800';
      case 'en_proceso': return 'bg-avis-red-100 text-avis-red-800';
      case 'resuelta': return 'bg-green-100 text-green-800';
      case 'cerrada': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consulta': return 'bg-avis-red-100 text-avis-red-800';
      case 'incidencia_vehiculo': return 'bg-red-100 text-red-800';
      case 'incidencia_pago': return 'bg-yellow-100 text-yellow-800';
      case 'incidencia_devolucion': return 'bg-purple-100 text-purple-800';
      case 'queja': return 'bg-orange-100 text-orange-800';
      case 'solicitud_info': return 'bg-green-100 text-green-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'consulta': return 'Consulta';
      case 'incidencia_vehiculo': return 'Incidencia Vehículo';
      case 'incidencia_pago': return 'Incidencia Pago';
      case 'incidencia_devolucion': return 'Incidencia Devolución';
      case 'queja': return 'Queja';
      case 'solicitud_info': return 'Solicitud Info';
      default: return type;
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'abierta': return 'Abierta';
      case 'en_proceso': return 'En Proceso';
      case 'resuelta': return 'Resuelta';
      case 'cerrada': return 'Cerrada';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          Incidencias
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar incidencias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-avis-red focus:border-transparent outline-none"
            />
          </div>
          <Filter className="w-5 h-5 text-neutral-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-avis-red focus:border-transparent outline-none"
        >
          <option value="all">Todos los tipos</option>
          <option value="consulta">Consulta</option>
          <option value="incidencia_vehiculo">Incidencia Vehículo</option>
          <option value="incidencia_pago">Incidencia Pago</option>
          <option value="incidencia_devolucion">Incidencia Devolución</option>
          <option value="queja">Queja</option>
          <option value="solicitud_info">Solicitud Info</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-avis-red focus:border-transparent outline-none"
        >
          <option value="all">Todas las prioridades</option>
          <option value="critica">Crítica</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-avis-red focus:border-transparent outline-none"
        >
          <option value="all">Todos los estados</option>
          <option value="abierta">Abierta</option>
          <option value="en_proceso">En Proceso</option>
          <option value="resuelta">Resuelta</option>
          <option value="cerrada">Cerrada</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className={`border-l-4 border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow ${getPriorityColor(incident.priority)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-neutral-800">{incident.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(incident.type)}`}>
                    {getTypeText(incident.type)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                    {getPriorityText(incident.priority)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-neutral-800 mb-2">{incident.title}</h3>
                <p className="text-neutral-600 text-sm mb-3">{incident.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <User className="w-4 h-4" />
                    <span>{incident.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Phone className="w-4 h-4" />
                    <span>{incident.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>{format(incident.createdAt, 'dd MMM yyyy HH:mm', { locale: es })}</span>
                  </div>
                  {incident.vehicleModel && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Car className="w-4 h-4" />
                      <span>{incident.vehicleModel} ({incident.vehicleId})</span>
                    </div>
                  )}
                  {incident.amount && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Euro className="w-4 h-4" />
                      <span>{incident.amount.toFixed(2)} €</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                  {getStatusText(incident.status)}
                </span>
                <button className="text-avis-red hover:text-avis-red-dark text-sm font-medium">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
          <p>No se encontraron incidencias</p>
        </div>
      )}
    </div>
  );
} 