export interface Conversation {
  id: string;
  customerName: string;
  phoneNumber: string;
  lastMessage: string;
  timestamp: Date;
  status: 'active' | 'resolved' | 'pending';
  messageCount: number;
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'customer' | 'agent' | 'bot';
  senderName: string;
  type: 'text' | 'image' | 'document';
  read: boolean;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  customerName: string;
  phoneNumber: string;
  type: 'consulta' | 'incidencia_vehiculo' | 'incidencia_pago' | 'incidencia_devolucion' | 'queja' | 'solicitud_info';
  priority: 'baja' | 'media' | 'alta' | 'critica';
  status: 'abierta' | 'en_proceso' | 'resuelta' | 'cerrada';
  createdAt: Date;
  updatedAt: Date;
  vehicleId?: string;
  vehicleModel?: string;
  amount?: number;
}

export interface IncidentStats {
  totalIncidents: number;
  consultasVsIncidencias: {
    consultas: number;
    incidencias: number;
  };
  incidentsByType: {
    type: string;
    count: number;
  }[];
  incidentsByPriority: {
    priority: string;
    count: number;
    percentage: number;
  }[];
  incidentsByStatus: {
    status: string;
    count: number;
  }[];
  resolutionTrends: {
    date: string;
    created: number;
    resolved: number;
  }[];
}

// Nuevos tipos para las sesiones de conversación
export interface SessionCase {
  id: string;
  type: 'consulta' | 'incidencia';
  title: string;
  description: string;
  resolved: boolean;
}

export interface ConversationSession {
  id: string;
  customerName: string;
  phoneNumber: string;
  sessionDate: Date;
  summary: string;
  totalCasesManaged: number;
  cases: SessionCase[];
  customerSatisfaction: {
    rating: number; // 1-10
    feedback: string;
  };
  agentName?: string;
  duration: number; // en minutos
  emailSent: boolean;
} 