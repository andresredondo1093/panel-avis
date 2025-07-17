import { Conversation, Incident, IncidentStats, Message, ConversationSession } from '../types';

// Mensajes de ejemplo para las conversaciones
const createMessages = (conversationId: string, customerName: string): Message[] => {
  const baseMessages: Omit<Message, 'id'>[] = [
    {
      content: "Hola, tengo un problema con mi reserva",
      timestamp: new Date(2024, 0, 15, 10, 30),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "¡Hola! Soy María del equipo de AVIS. ¿En qué puedo ayudarte con tu reserva?",
      timestamp: new Date(2024, 0, 15, 10, 32),
      sender: 'agent',
      senderName: 'María García',
      type: 'text',
      read: true
    },
    {
      content: "Mi número de reserva es AV123456 y no puedo encontrar el vehículo en la ubicación indicada",
      timestamp: new Date(2024, 0, 15, 10, 35),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "Permíteme revisar tu reserva. Un momento por favor...",
      timestamp: new Date(2024, 0, 15, 10, 36),
      sender: 'agent',
      senderName: 'María García',
      type: 'text',
      read: true
    },
    {
      content: "He encontrado tu reserva. Veo que el vehículo está en el nivel -1 del parking, plaza P-15. ¿Has revisado esa ubicación?",
      timestamp: new Date(2024, 0, 15, 10, 38),
      sender: 'agent',
      senderName: 'María García',
      type: 'text',
      read: true
    },
    {
      content: "¡Perfecto! Ya lo encontré. Muchas gracias por la ayuda 😊",
      timestamp: new Date(2024, 0, 15, 10, 42),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "¡Excelente! Me alegra saber que pudiste encontrarlo. ¿Hay algo más en lo que pueda ayudarte?",
      timestamp: new Date(2024, 0, 15, 10, 43),
      sender: 'agent',
      senderName: 'María García',
      type: 'text',
      read: true
    },
    {
      content: "No, todo perfecto. ¡Gracias!",
      timestamp: new Date(2024, 0, 15, 10, 45),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    }
  ];

  return baseMessages.map((msg, index) => ({
    ...msg,
    id: `${conversationId}-msg-${index + 1}`
  }));
};

const createMessages2 = (conversationId: string, customerName: string): Message[] => {
  const baseMessages: Omit<Message, 'id'>[] = [
    {
      content: "Buenos días, necesito información sobre seguros adicionales",
      timestamp: new Date(2024, 0, 16, 9, 15),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "¡Buenos días! Te puedo ayudar con información sobre nuestros seguros. ¿Qué tipo de cobertura te interesa?",
      timestamp: new Date(2024, 0, 16, 9, 17),
      sender: 'bot',
      senderName: 'AVIS Bot',
      type: 'text',
      read: true
    },
    {
      content: "Quiero saber sobre el seguro a todo riesgo",
      timestamp: new Date(2024, 0, 16, 9, 20),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "El seguro a todo riesgo incluye: cobertura total por daños, robo, cristales y neumáticos. El precio es de 15€/día. ¿Te interesa añadirlo a tu reserva?",
      timestamp: new Date(2024, 0, 16, 9, 22),
      sender: 'bot',
      senderName: 'AVIS Bot',
      type: 'text',
      read: true
    },
    {
      content: "Sí, me interesa. ¿Cómo puedo añadirlo?",
      timestamp: new Date(2024, 0, 16, 9, 25),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "Te transfiero con un agente para que pueda modificar tu reserva. Un momento...",
      timestamp: new Date(2024, 0, 16, 9, 26),
      sender: 'bot',
      senderName: 'AVIS Bot',
      type: 'text',
      read: true
    },
    {
      content: "Hola, soy Carlos del equipo de AVIS. Veo que quieres añadir el seguro a todo riesgo. ¿Puedes proporcionarme tu número de reserva?",
      timestamp: new Date(2024, 0, 16, 9, 28),
      sender: 'agent',
      senderName: 'Carlos Ruiz',
      type: 'text',
      read: false
    }
  ];

  return baseMessages.map((msg, index) => ({
    ...msg,
    id: `${conversationId}-msg-${index + 1}`
  }));
};

const createMessages3 = (conversationId: string, customerName: string): Message[] => {
  const baseMessages: Omit<Message, 'id'>[] = [
    {
      content: "Tengo un problema con el cobro de mi tarjeta",
      timestamp: new Date(2024, 0, 17, 14, 30),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "Lamento escuchar eso. Soy Ana del departamento de facturación. ¿Puedes explicarme qué tipo de problema tienes?",
      timestamp: new Date(2024, 0, 17, 14, 32),
      sender: 'agent',
      senderName: 'Ana López',
      type: 'text',
      read: true
    },
    {
      content: "Me han cobrado 200€ más de lo que esperaba",
      timestamp: new Date(2024, 0, 17, 14, 35),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "Entiendo tu preocupación. ¿Podrías proporcionarme tu número de reserva para revisar los cargos?",
      timestamp: new Date(2024, 0, 17, 14, 36),
      sender: 'agent',
      senderName: 'Ana López',
      type: 'text',
      read: true
    },
    {
      content: "Claro, es AV789012",
      timestamp: new Date(2024, 0, 17, 14, 38),
      sender: 'customer',
      senderName: customerName,
      type: 'text',
      read: true
    },
    {
      content: "Gracias. Estoy revisando tu cuenta... Veo que se aplicó un cargo por combustible ya que el vehículo se devolvió con menos combustible del recibido. ¿Recuerdas haber llenado el tanque antes de la devolución?",
      timestamp: new Date(2024, 0, 17, 14, 42),
      sender: 'agent',
      senderName: 'Ana López',
      type: 'text',
      read: true
    }
  ];

  return baseMessages.map((msg, index) => ({
    ...msg,
    id: `${conversationId}-msg-${index + 1}`
  }));
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv-001',
    customerName: 'Juan Pérez',
    phoneNumber: '+34 666 123 456',
    lastMessage: 'No, todo perfecto. ¡Gracias!',
    timestamp: new Date(2024, 0, 15, 10, 45),
    status: 'resolved',
    messageCount: 8,
    messages: createMessages('conv-001', 'Juan Pérez')
  },
  {
    id: 'conv-002',
    customerName: 'María González',
    phoneNumber: '+34 677 234 567',
    lastMessage: 'Hola, soy Carlos del equipo de AVIS. Veo que quieres añadir el seguro a todo riesgo...',
    timestamp: new Date(2024, 0, 16, 9, 28),
    status: 'active',
    messageCount: 7,
    messages: createMessages2('conv-002', 'María González')
  },
  {
    id: 'conv-003',
    customerName: 'Carlos Ruiz',
    phoneNumber: '+34 688 345 678',
    lastMessage: 'Veo que se aplicó un cargo por combustible ya que el vehículo se devolvió...',
    timestamp: new Date(2024, 0, 17, 14, 42),
    status: 'active',
    messageCount: 6,
    messages: createMessages3('conv-003', 'Carlos Ruiz')
  },
  {
    id: 'conv-004',
    customerName: 'Ana Martín',
    phoneNumber: '+34 699 456 789',
    lastMessage: 'Perfecto, gracias por la información',
    timestamp: new Date(2024, 0, 14, 16, 20),
    status: 'resolved',
    messageCount: 4,
    messages: [
      {
        id: 'conv-004-msg-1',
        content: 'Hola, ¿qué horarios tienen para recoger vehículos?',
        timestamp: new Date(2024, 0, 14, 16, 10),
        sender: 'customer',
        senderName: 'Ana Martín',
        type: 'text',
        read: true
      },
      {
        id: 'conv-004-msg-2',
        content: 'Nuestro horario es de 7:00 a 22:00 de lunes a domingo',
        timestamp: new Date(2024, 0, 14, 16, 12),
        sender: 'bot',
        senderName: 'AVIS Bot',
        type: 'text',
        read: true
      },
      {
        id: 'conv-004-msg-3',
        content: '¿Y para devoluciones fuera de horario?',
        timestamp: new Date(2024, 0, 14, 16, 15),
        sender: 'customer',
        senderName: 'Ana Martín',
        type: 'text',
        read: true
      },
      {
        id: 'conv-004-msg-4',
        content: 'Tenemos buzón de llaves 24h para devoluciones fuera de horario',
        timestamp: new Date(2024, 0, 14, 16, 17),
        sender: 'bot',
        senderName: 'AVIS Bot',
        type: 'text',
        read: true
      }
    ]
  },
  {
    id: 'conv-005',
    customerName: 'Pedro Sánchez',
    phoneNumber: '+34 600 567 890',
    lastMessage: 'Esperando respuesta del cliente...',
    timestamp: new Date(2024, 0, 17, 11, 30),
    status: 'pending',
    messageCount: 3,
    messages: [
      {
        id: 'conv-005-msg-1',
        content: 'Necesito cambiar mi reserva para otra fecha',
        timestamp: new Date(2024, 0, 17, 11, 15),
        sender: 'customer',
        senderName: 'Pedro Sánchez',
        type: 'text',
        read: true
      },
      {
        id: 'conv-005-msg-2',
        content: 'Por supuesto, puedo ayudarte. ¿Para qué fecha quieres cambiarla?',
        timestamp: new Date(2024, 0, 17, 11, 17),
        sender: 'agent',
        senderName: 'Laura Fernández',
        type: 'text',
        read: true
      },
      {
        id: 'conv-005-msg-3',
        content: 'Déjame revisar mi agenda y te confirmo...',
        timestamp: new Date(2024, 0, 17, 11, 20),
        sender: 'customer',
        senderName: 'Pedro Sánchez',
        type: 'text',
        read: false
      }
    ]
  }
];

export const mockIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    title: 'Vehículo no disponible en ubicación indicada',
    description: 'El cliente no pudo encontrar el vehículo Ford Focus en la ubicación del aeropuerto de Madrid-Barajas, plaza P-15.',
    customerName: 'Juan Pérez',
    type: 'incidencia_vehiculo',
    priority: 'alta',
    status: 'en_proceso',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:45:00'),
    phoneNumber: '+34 666 123 456',
    vehicleId: 'AV123456',
    vehicleModel: 'Ford Focus'
  },
  {
    id: 'INC-2024-002',
    title: 'Problema con el pago de la reserva',
    description: 'Error en el procesamiento del pago con tarjeta de crédito. La transacción fue rechazada.',
    customerName: 'Ana Martínez',
    type: 'incidencia_pago',
    priority: 'media',
    status: 'resuelta',
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T16:30:00'),
    phoneNumber: '+34 677 987 654',
    amount: 245.50
  },
  {
    id: 'INC-2024-003',
    title: 'Solicitud de devolución por cancelación',
    description: 'Cliente solicita devolución completa por cancelación de viaje debido a emergencia familiar.',
    customerName: 'Carlos Ruiz',
    type: 'incidencia_devolucion',
    priority: 'baja',
    status: 'abierta',
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T09:15:00'),
    phoneNumber: '+34 688 456 789',
    amount: 189.00
  },
  {
    id: 'INC-2024-004',
    title: 'Consulta sobre seguros adicionales',
    description: 'Cliente pregunta sobre cobertura de seguros adicionales para viaje internacional.',
    customerName: 'María González',
    type: 'consulta',
    priority: 'baja',
    status: 'resuelta',
    createdAt: new Date('2024-01-12T16:45:00'),
    updatedAt: new Date('2024-01-12T17:00:00'),
    phoneNumber: '+34 699 321 654'
  },
  {
    id: 'INC-2024-005',
    title: 'Queja por servicio de atención al cliente',
    description: 'Cliente insatisfecho con el tiempo de respuesta del servicio de atención telefónica.',
    customerName: 'Pedro Sánchez',
    type: 'queja',
    priority: 'media',
    status: 'en_proceso',
    createdAt: new Date('2024-01-11T11:30:00'),
    updatedAt: new Date('2024-01-11T12:00:00'),
    phoneNumber: '+34 610 555 777'
  },
  {
    id: 'INC-2024-006',
    title: 'Información sobre tarifas de temporada alta',
    description: 'Solicitud de información detallada sobre tarifas especiales durante temporada alta de verano.',
    customerName: 'Laura Jiménez',
    type: 'solicitud_info',
    priority: 'baja',
    status: 'resuelta',
    createdAt: new Date('2024-01-10T13:20:00'),
    updatedAt: new Date('2024-01-10T14:45:00'),
    phoneNumber: '+34 622 888 999'
  },
  // Incidencias adicionales para Juan Pérez (historial)
  {
    id: 'INC-2023-089',
    title: 'Problema con devolución de fianza',
    description: 'Demora en la devolución de la fianza después de la entrega del vehículo.',
    customerName: 'Juan Pérez',
    type: 'incidencia_devolucion',
    priority: 'media',
    status: 'resuelta',
    createdAt: new Date('2023-12-20T10:00:00'),
    updatedAt: new Date('2023-12-22T16:30:00'),
    phoneNumber: '+34 666 123 456',
    amount: 300.00
  },
  {
    id: 'INC-2023-067',
    title: 'Consulta sobre modificación de reserva',
    description: 'Cliente quería cambiar las fechas de su reserva navideña.',
    customerName: 'Juan Pérez',
    type: 'consulta',
    priority: 'baja',
    status: 'resuelta',
    createdAt: new Date('2023-11-15T14:30:00'),
    updatedAt: new Date('2023-11-15T15:00:00'),
    phoneNumber: '+34 666 123 456'
  },
  // Incidencias adicionales para Ana Martínez (historial)
  {
    id: 'INC-2023-078',
    title: 'Problema con el combustible',
    description: 'Vehículo entregado con menos combustible del indicado en el contrato.',
    customerName: 'Ana Martínez',
    type: 'incidencia_vehiculo',
    priority: 'baja',
    status: 'resuelta',
    createdAt: new Date('2023-12-05T09:30:00'),
    updatedAt: new Date('2023-12-05T11:00:00'),
    phoneNumber: '+34 677 987 654',
    vehicleId: 'AV789012',
    vehicleModel: 'Seat Ibiza'
  }
];

export const mockStats: IncidentStats = {
  totalIncidents: 5,
  consultasVsIncidencias: {
    consultas: 3,
    incidencias: 2
  },
  incidentsByType: [
    { type: 'Consulta', count: 2 },
    { type: 'Inc. Vehículo', count: 1 },
    { type: 'Inc. Pago', count: 1 },
    { type: 'Solicitud Info', count: 1 }
  ],
  incidentsByPriority: [
    { priority: 'Alta', count: 2, percentage: 40 },
    { priority: 'Media', count: 2, percentage: 40 },
    { priority: 'Baja', count: 1, percentage: 20 }
  ],
  incidentsByStatus: [
    { status: 'Abierta', count: 2 },
    { status: 'En Proceso', count: 1 },
    { status: 'Resuelta', count: 2 }
  ],
  resolutionTrends: [
    { date: '14/01', created: 1, resolved: 1 },
    { date: '15/01', created: 1, resolved: 1 },
    { date: '16/01', created: 1, resolved: 0 },
    { date: '17/01', created: 2, resolved: 0 }
  ]
}; 

export const mockSessions: ConversationSession[] = [
  {
    id: 'SES-2024-001',
    customerName: 'Juan Pérez',
    phoneNumber: '+34 666 123 456',
    sessionDate: new Date('2024-01-15T08:37:00'),
    summary: 'El cliente consultó sobre la edad mínima para alquilar un coche y las políticas en caso de llegar tarde a recogerlo. Además, reportó una incidencia relacionada con una pertenencia olvidada (una mochila) dentro del vehículo, la cual fue registrada y gestionada por el equipo de soporte.',
    totalCasesManaged: 3,
    cases: [
      {
        id: 'CASE-001-1',
        type: 'consulta',
        title: 'Edad mínima para alquilar coche',
        description: 'Cliente preguntó sobre los requisitos de edad para alquilar un vehículo. Se le informó que debe tener al menos 21 años y contar con un año mínimo de antigüedad en el permiso de conducir.',
        resolved: true
      },
      {
        id: 'CASE-001-2',
        type: 'consulta',
        title: 'Política por retraso en recogida de vehículo',
        description: 'Consulta sobre qué sucede si llega tarde a recoger el vehículo reservado. Se le explicó la política de tolerancia y posibles cargos adicionales.',
        resolved: true
      },
      {
        id: 'CASE-001-3',
        type: 'incidencia',
        title: 'Pertenencias olvidadas dentro del vehículo',
        description: 'El cliente reportó haber olvidado una mochila dentro del vehículo devuelto. Se registró la incidencia y se coordinó con el equipo de limpieza para recuperar el objeto.',
        resolved: true
      }
    ],
    customerSatisfaction: {
      rating: 8,
      feedback: 'El cliente mostró un tono cordial y agradecido, resolviendo todas sus dudas y cerrando la conversación con un agradecimiento explícito.'
    },
    agentName: 'Corporín - AVIS Bot',
    duration: 12,
    emailSent: true
  },
  {
    id: 'SES-2024-002',
    customerName: 'María González',
    phoneNumber: '+34 677 234 567',
    sessionDate: new Date('2024-01-16T10:15:00'),
    summary: 'Sesión de consulta sobre seguros adicionales para viaje internacional. La cliente requería información detallada sobre coberturas y tarifas para un viaje de negocios a Francia.',
    totalCasesManaged: 2,
    cases: [
      {
        id: 'CASE-002-1',
        type: 'consulta',
        title: 'Información sobre seguros para viajes internacionales',
        description: 'La cliente solicitó información sobre coberturas de seguro adicionales para un viaje de negocios a Francia, incluyendo asistencia en carretera y cobertura internacional.',
        resolved: true
      },
      {
        id: 'CASE-002-2',
        type: 'consulta',
        title: 'Tarifas y condiciones de seguros premium',
        description: 'Consulta específica sobre las tarifas del seguro premium y las condiciones de cobertura total para vehículos de gama alta.',
        resolved: true
      }
    ],
    customerSatisfaction: {
      rating: 9,
      feedback: 'Excelente atención, muy satisfecha con la información proporcionada. El proceso fue muy eficiente y claro.'
    },
    agentName: 'Laura Fernández',
    duration: 18,
    emailSent: true
  },
  {
    id: 'SES-2024-003',
    customerName: 'Carlos Ruiz',
    phoneNumber: '+34 688 345 678',
    sessionDate: new Date('2024-01-17T14:22:00'),
    summary: 'Incidencia relacionada con un cargo inesperado en la tarjeta de crédito por concepto de combustible. Se revisó la póliza de devolución y se explicaron los cargos adicionales aplicados.',
    totalCasesManaged: 1,
    cases: [
      {
        id: 'CASE-003-1',
        type: 'incidencia',
        title: 'Cargo inesperado por combustible',
        description: 'El cliente reportó un cargo de 200€ adicionales en su tarjeta por concepto de combustible. Se revisó el contrato y se confirmó que el vehículo fue devuelto con menos combustible del recibido, generando el cargo por repostaje.',
        resolved: true
      }
    ],
    customerSatisfaction: {
      rating: 6,
      feedback: 'Aunque se resolvió la duda, el cliente expresó cierta insatisfacción por no haber sido informado claramente sobre esta política al momento de la entrega.'
    },
    agentName: 'Ana López',
    duration: 25,
    emailSent: true
  },
  {
    id: 'SES-2024-004',
    customerName: 'Ana Martín',
    phoneNumber: '+34 699 456 789',
    sessionDate: new Date('2024-01-14T16:05:00'),
    summary: 'Consulta rápida sobre horarios de recogida y devolución de vehículos, incluyendo opciones para devoluciones fuera del horario comercial.',
    totalCasesManaged: 2,
    cases: [
      {
        id: 'CASE-004-1',
        type: 'consulta',
        title: 'Horarios de recogida de vehículos',
        description: 'Consulta sobre los horarios disponibles para recoger vehículos en la oficina principal. Se le informó el horario de 7:00 a 22:00 de lunes a domingo.',
        resolved: true
      },
      {
        id: 'CASE-004-2',
        type: 'consulta',
        title: 'Devoluciones fuera de horario',
        description: 'Pregunta sobre las opciones disponibles para devolver el vehículo fuera del horario comercial. Se le explicó el sistema de buzón de llaves 24h.',
        resolved: true
      }
    ],
    customerSatisfaction: {
      rating: 10,
      feedback: 'Perfecto, información muy clara y útil. Respuesta rápida y eficiente.'
    },
    agentName: 'AVIS Bot',
    duration: 8,
    emailSent: true
  },
  {
    id: 'SES-2024-005',
    customerName: 'Pedro Sánchez',
    phoneNumber: '+34 600 567 890',
    sessionDate: new Date('2024-01-13T11:45:00'),
    summary: 'Incidencia compleja relacionada con una modificación de reserva que generó problemas en el sistema de facturación. Se requirió escalamiento al departamento técnico.',
    totalCasesManaged: 2,
    cases: [
      {
        id: 'CASE-005-1',
        type: 'incidencia',
        title: 'Error en modificación de reserva',
        description: 'El cliente intentó modificar su reserva a través de la web pero el sistema generó una doble facturación. Se escaló al departamento técnico para corrección.',
        resolved: true
      },
      {
        id: 'CASE-005-2',
        type: 'consulta',
        title: 'Proceso de reembolso por error del sistema',
        description: 'Consulta sobre los tiempos y procedimientos para el reembolso del cargo duplicado generado por el error del sistema.',
        resolved: true
      }
    ],
    customerSatisfaction: {
      rating: 7,
      feedback: 'Aunque se resolvió el problema, el proceso fue más largo de lo esperado. Agradece la paciencia del equipo técnico.'
    },
    agentName: 'Miguel Torres',
    duration: 45,
    emailSent: true
  }
]; 