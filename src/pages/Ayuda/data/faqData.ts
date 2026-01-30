export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'comprador' | 'vendedor' | 'general';
  tags: string[];
}

export const faqData: FaqItem[] = [
  // ============ COMPRADORES ============
  // Sobre la plataforma
  {
    id: 'que-es-liquimarket',
    question: '¿Qué es LiquiMarket?',
    answer: 'LiquiMarket es un marketplace donde encontrás productos en liquidación con descuentos reales de al menos 25%. Conectamos compradores con vendedores que necesitan mover stock de forma rápida.',
    category: 'comprador',
    tags: ['inicio', 'plataforma', 'qué es'],
  },
  {
    id: 'que-significa-25-off',
    question: '¿Qué significa "≥25% OFF real"?',
    answer: 'Significa que todos los productos publicados tienen un descuento mínimo del 25% sobre su precio original. Verificamos que los descuentos sean reales, no precios inflados artificialmente.',
    category: 'comprador',
    tags: ['descuento', 'precio', 'real', '25%'],
  },
  {
    id: 'necesito-cuenta-comprar',
    question: '¿Necesito crear una cuenta para comprar?',
    answer: 'No. Podés navegar, ver productos y hacer reservas sin registrarte. Solo necesitás proporcionar tu nombre y contacto al reservar.',
    category: 'comprador',
    tags: ['cuenta', 'registro', 'comprar'],
  },
  // Sobre las reservas
  {
    id: 'que-es-reserva',
    question: '¿Qué es una "reserva"?',
    answer: 'Una reserva es tu manifestación de interés en un producto. NO es una compra ni un compromiso de pago. Cuando reservás, el vendedor recibe tu información de contacto para coordinar la venta directamente con vos.',
    category: 'comprador',
    tags: ['reserva', 'interés', 'contacto'],
  },
  {
    id: 'proceso-compra',
    question: '¿Cómo funciona el proceso de compra?',
    answer: `El proceso es simple:
1. Encontrás un producto que te interesa
2. Hacés una reserva dejando tu contacto
3. El vendedor te contacta (generalmente por WhatsApp)
4. Coordinan pago, retiro o envío directamente

LiquiMarket no interviene en el pago ni la entrega.`,
    category: 'comprador',
    tags: ['proceso', 'compra', 'pasos', 'cómo comprar'],
  },
  {
    id: 'reserva-garantiza-producto',
    question: '¿La reserva me garantiza el producto?',
    answer: 'No. La reserva es solo una expresión de interés. El vendedor puede tener múltiples reservas y el producto se vende al primero que concrete la compra.',
    category: 'comprador',
    tags: ['reserva', 'garantía', 'disponibilidad'],
  },
  {
    id: 'cancelar-reserva',
    question: '¿Puedo cancelar una reserva?',
    answer: 'Como no hay compromiso de compra, simplemente podés no responder al vendedor. Te pedimos que avises si ya no estás interesado para no hacer perder tiempo al vendedor.',
    category: 'comprador',
    tags: ['cancelar', 'reserva'],
  },
  // Sobre pagos y entregas
  {
    id: 'como-pago',
    question: '¿Cómo pago los productos?',
    answer: 'El pago se coordina directamente con el vendedor. Los métodos comunes son efectivo al retirar, transferencia bancaria, o MercadoPago, pero depende de cada vendedor.',
    category: 'comprador',
    tags: ['pago', 'efectivo', 'transferencia', 'mercadopago'],
  },
  {
    id: 'hay-envios',
    question: '¿Hay envíos?',
    answer: 'Depende de cada vendedor. Algunos ofrecen envío (con costo adicional) y otros solo retiro en su ubicación. Esta información aparece en cada producto.',
    category: 'comprador',
    tags: ['envío', 'retiro', 'entrega'],
  },
  {
    id: 'responsabilidad-problemas',
    question: '¿LiquiMarket es responsable si algo sale mal?',
    answer: 'No. LiquiMarket es un intermediario que conecta compradores y vendedores. Las transacciones son directamente entre ustedes. Te recomendamos verificar el producto antes de pagar.',
    category: 'comprador',
    tags: ['responsabilidad', 'problema', 'reclamo'],
  },
  // Seguridad
  {
    id: 'producto-legitimo',
    question: '¿Cómo sé que un producto es legítimo?',
    answer: 'Moderamos todas las publicaciones antes de aprobarlas. Además, podés reportar cualquier publicación sospechosa y la revisaremos.',
    category: 'comprador',
    tags: ['legítimo', 'seguro', 'moderación'],
  },
  {
    id: 'publicacion-fraudulenta',
    question: '¿Qué hago si creo que una publicación es fraudulenta?',
    answer: 'Usá el botón "Reportar publicación" en el detalle del producto. Elegí el motivo y agregá detalles. Nuestro equipo lo revisará.',
    category: 'comprador',
    tags: ['fraude', 'reportar', 'denuncia'],
  },

  // ============ VENDEDORES ============
  // Empezar a vender
  {
    id: 'como-registro-vendedor',
    question: '¿Cómo me registro como vendedor?',
    answer: 'Andá a "Vender" en el menú y completá el formulario de registro con tus datos comerciales. Una vez registrado, podés empezar a publicar.',
    category: 'vendedor',
    tags: ['registro', 'vendedor', 'cuenta'],
  },
  {
    id: 'es-gratis-publicar',
    question: '¿Es gratis publicar en LiquiMarket?',
    answer: 'Sí, durante esta etapa publicar es completamente gratis. No cobramos comisiones por venta.',
    category: 'vendedor',
    tags: ['gratis', 'costo', 'comisión', 'precio'],
  },
  {
    id: 'que-productos-puedo-vender',
    question: '¿Qué productos puedo vender?',
    answer: 'Productos nuevos o usados en buen estado que estén en liquidación real (mínimo 25% de descuento). Están prohibidos: productos falsificados, robados, ilegales, o sin el descuento mínimo.',
    category: 'vendedor',
    tags: ['productos', 'permitidos', 'prohibidos'],
  },
  // Publicar productos
  {
    id: 'como-publico-producto',
    question: '¿Cómo publico un producto?',
    answer: `Para publicar un producto:
1. Iniciá sesión en tu panel de vendedor
2. Hacé clic en "Publicar producto"
3. Completá la información: título, descripción, fotos, precio original, precio de liquidación
4. Enviá a aprobación

Una vez aprobado, aparece en el catálogo.`,
    category: 'vendedor',
    tags: ['publicar', 'producto', 'pasos'],
  },
  {
    id: 'publicacion-pendiente',
    question: '¿Por qué mi publicación está "Pendiente"?',
    answer: 'Todas las publicaciones pasan por moderación antes de aparecer en el catálogo. Verificamos que cumplan con la regla del 25% OFF y las políticas de la plataforma. Esto suele tomar menos de 24 horas.',
    category: 'vendedor',
    tags: ['pendiente', 'moderación', 'aprobación'],
  },
  {
    id: 'publicacion-rechazada',
    question: '¿Por qué rechazaron mi publicación?',
    answer: 'Puede ser por: descuento menor al 25%, información incompleta, fotos de baja calidad, producto prohibido, o precio original no verificable. Revisá el motivo en tu panel y corregí la publicación.',
    category: 'vendedor',
    tags: ['rechazado', 'rechazo', 'motivo'],
  },
  {
    id: 'editar-producto-publicado',
    question: '¿Puedo editar un producto ya publicado?',
    answer: 'Sí, podés editar tus productos. Si cambiás el precio, puede requerir nueva aprobación.',
    category: 'vendedor',
    tags: ['editar', 'modificar', 'producto'],
  },
  // Gestionar reservas
  {
    id: 'notificacion-reserva',
    question: '¿Cómo me avisan cuando alguien reserva?',
    answer: 'Recibís una notificación con los datos del comprador (nombre, contacto, cantidad). También podés ver todas las reservas en tu panel.',
    category: 'vendedor',
    tags: ['notificación', 'reserva', 'aviso'],
  },
  {
    id: 'obligacion-vender-reserva',
    question: '¿Tengo que venderle a todos los que reservan?',
    answer: 'No. Las reservas son manifestaciones de interés. Vos elegís con quién concretar la venta. Te recomendamos responder rápido para no perder ventas.',
    category: 'vendedor',
    tags: ['obligación', 'vender', 'reserva'],
  },
  {
    id: 'contactar-comprador',
    question: '¿Cómo contacto al comprador?',
    answer: 'Desde tu panel de reservas tenés un botón para abrir WhatsApp con el mensaje predeterminado que configuraste, o podés contactarlo por email/teléfono.',
    category: 'vendedor',
    tags: ['contactar', 'comprador', 'whatsapp'],
  },
  // Cuenta y perfil
  {
    id: 'cambiar-datos-contacto',
    question: '¿Cómo cambio mis datos de contacto?',
    answer: 'En tu panel, andá a "Mi perfil" y actualizá la información que necesites.',
    category: 'vendedor',
    tags: ['perfil', 'datos', 'contacto', 'editar'],
  },
  {
    id: 'cuenta-suspendida',
    question: '¿Qué pasa si me suspenden la cuenta?',
    answer: 'Si recibís reportes o violás las políticas, podemos suspender tu cuenta temporalmente. Recibirás un email con el motivo y podés contactarnos para apelar.',
    category: 'vendedor',
    tags: ['suspensión', 'cuenta', 'bloqueo'],
  },

  // ============ GENERAL ============
  {
    id: 'suscribirse-drops',
    question: '¿Cómo me suscribo a los "drops"?',
    answer: 'En la página de inicio o en "/suscribirme" podés dejar tu email o WhatsApp para recibir alertas cuando lleguen nuevas liquidaciones en las categorías que te interesan.',
    category: 'general',
    tags: ['drops', 'suscripción', 'alertas', 'notificaciones'],
  },
  {
    id: 'contactar-liquimarket',
    question: '¿Cómo contacto a LiquiMarket?',
    answer: 'Podés escribirnos a soporte@liquimarket.uy. Respondemos en 24-48 horas hábiles.',
    category: 'general',
    tags: ['contacto', 'soporte', 'email'],
  },
];

export const faqCategories = {
  comprador: {
    label: 'Compradores',
    description: 'Preguntas sobre reservas, pagos y seguridad',
  },
  vendedor: {
    label: 'Vendedores',
    description: 'Preguntas sobre registro, publicaciones y gestión',
  },
  general: {
    label: 'General',
    description: 'Preguntas generales sobre la plataforma',
  },
} as const;
