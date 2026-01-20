import { Seller } from '@/types/seller';

export const mockSellers: Seller[] = [
  {
    id: "seller-1",
    nombre_comercial: "Norte Sports",
    telefono: "59899123456",
    zona: "Montevideo",
    politicas: "Retiro en local con documento. No se aceptan devoluciones en liquidación.",
    horario_retiro: "Lunes a Viernes 10:00 - 18:00, Sábados 10:00 - 14:00"
  },
  {
    id: "seller-2",
    nombre_comercial: "TecnoHogar",
    telefono: "59898765432",
    zona: "Canelones",
    politicas: "Productos con garantía limitada. Retiro coordinado previamente.",
    horario_retiro: "Lunes a Viernes 9:00 - 17:00"
  },
  {
    id: "seller-3",
    nombre_comercial: "Casa Design",
    telefono: "59897654321",
    zona: "Maldonado",
    politicas: "Envíos disponibles con costo adicional. Retiro previa cita.",
    horario_retiro: "Martes a Sábado 11:00 - 19:00"
  },
  {
    id: "seller-4",
    nombre_comercial: "Beauty Corner",
    telefono: "59896543210",
    zona: "Montevideo",
    politicas: "Productos sellados, sin devolución. Verificar fecha de vencimiento.",
    horario_retiro: "Lunes a Sábado 10:00 - 20:00"
  },
  {
    id: "seller-5",
    nombre_comercial: "Deportes Plus",
    telefono: "59895432109",
    zona: "Paysandú",
    politicas: "Cambios solo por talle dentro de 48hs con etiqueta.",
    horario_retiro: "Lunes a Viernes 8:00 - 12:00 y 14:00 - 18:00"
  }
];
