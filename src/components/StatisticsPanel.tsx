'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Calendar } from 'lucide-react';
import { IncidentStats } from '../types';

interface StatisticsPanelProps {
  stats: IncidentStats;
}

const COLORS = ['#E31E24', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#F97316'];

export default function StatisticsPanel({ stats }: StatisticsPanelProps) {
  const consultasVsIncidenciasData = [
    { name: 'Consultas', value: stats.consultasVsIncidencias.consultas, color: '#E31E24' },
    { name: 'Incidencias', value: stats.consultasVsIncidencias.incidencias, color: '#EF4444' }
  ];

  const incidentsByTypeData = stats.incidentsByType.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length]
  }));

  const incidentsByPriorityData = stats.incidentsByPriority.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length]
  }));

  const incidentsByStatusData = stats.incidentsByStatus.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Estadísticas y Análisis
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-avis-red">{stats.totalIncidents}</div>
            <div className="text-sm text-neutral-600">Total Incidencias</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Consultas vs Incidencias */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-avis-red" />
            Consultas vs Incidencias
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={consultasVsIncidenciasData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {consultasVsIncidenciasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidencias por Tipo */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            Incidencias por Tipo
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsByTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#E31E24" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Incidencias por Prioridad */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-red-600" />
            Incidencias por Prioridad
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentsByPriorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ priority, count, percentage }) => `${priority}: ${count} (${percentage.toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {incidentsByPriorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidencias por Estado */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Incidencias por Estado
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsByStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Tendencias de Resolución */}
      <div className="bg-neutral-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Tendencias de Resolución
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.resolutionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="created" stroke="#E31E24" strokeWidth={2} name="Creadas" />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resueltas" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Métricas Resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-avis-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-avis-red">
            {((stats.consultasVsIncidencias.consultas / stats.totalIncidents) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-neutral-600">Consultas</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {((stats.consultasVsIncidencias.incidencias / stats.totalIncidents) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-neutral-600">Incidencias</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.incidentsByStatus.find(s => s.status === 'Resuelta')?.count || 0}
          </div>
          <div className="text-sm text-neutral-600">Resueltas</div>
        </div>
      </div>
    </div>
  );
} 