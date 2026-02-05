-- ============================================
-- SEED DATA - LiquiOff Marketplace
-- Ejecutar en el SQL Editor de Supabase
-- ============================================

-- Limpiar datos existentes (en orden por FK)
TRUNCATE public.report_actions CASCADE;
TRUNCATE public.reports CASCADE;
TRUNCATE public.moderation_history CASCADE;
TRUNCATE public.leads CASCADE;
TRUNCATE public.reservations CASCADE;
TRUNCATE public.products CASCADE;
TRUNCATE public.subscribers CASCADE;
TRUNCATE public.seller_actions CASCADE;
TRUNCATE public.user_roles CASCADE;
TRUNCATE public.sellers CASCADE;

-- ============================================
-- SELLERS (sin auth.users, IDs fijos para referencia)
-- ============================================
INSERT INTO public.sellers (id, user_id, nombre_comercial, responsable, email, telefono, zona, direccion, politicas, horario_retiro, whatsapp_message, status, is_verified, created_at) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Outlet TechUY', 'Martín Rodríguez', 'martin@techu.com.uy', '099123456', 'Montevideo', 'Av. 18 de Julio 1234, Centro', 'Cambios dentro de las 48hs con ticket. No se aceptan devoluciones en productos de liquidación.', 'Lunes a Viernes 10:00 - 18:00', 'Hola! Vi tu producto en LiquiOff y me interesa. ¿Está disponible?', 'active', true, now() - interval '45 days'),
  
  ('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'Moda Sur', 'Carolina Méndez', 'carolina@modasur.uy', '098765432', 'Montevideo', 'Bvar. España 2890, Pocitos', 'Se puede probar antes de retirar. Solo efectivo o transferencia.', 'Martes a Sábado 11:00 - 19:00', 'Hola! Quiero consultar por un producto que vi en LiquiOff.', 'active', true, now() - interval '30 days'),
  
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'ElectroHogar MVD', 'Federico Suárez', 'fede@electrohogar.uy', '097111222', 'Canelones', 'Ruta 8 km 24, Barros Blancos', 'Garantía de fábrica vigente en todos los productos. Factura incluida.', 'Lunes a Viernes 9:00 - 17:00, Sábados 9:00 - 13:00', 'Buenas! Me interesa un producto de LiquiOff, ¿me das más info?', 'active', false, now() - interval '20 days'),
  
  ('a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000004', 'Juguetería Arcoíris', 'Lucía Ferreira', 'lucia@arcoiris.uy', '099888777', 'Maldonado', 'Gorlero 456, Punta del Este', 'Todos los juguetes están en perfecto estado, solo exceso de stock.', 'Lunes a Domingo 10:00 - 21:00 (temporada)', 'Hola! Vi un juguete en LiquiOff que me interesa.', 'active', true, now() - interval '15 days'),
  
  ('a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000005', 'Deportes Total', 'Andrés Giménez', 'andres@deportestotal.uy', '096555444', 'Montevideo', 'Av. Rivera 3456, Punta Carretas', NULL, 'Lunes a Sábado 10:00 - 20:00', NULL, 'pending', false, now() - interval '3 days'),
  
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000006', 'Bazar El Encuentro', 'María José López', 'majo@bazarencuentro.uy', '098222333', 'Colonia', 'Calle de los Suspiros 12, Colonia del Sacramento', 'Precios finales. Envíos solo dentro de Colonia.', 'Jueves a Domingo 10:00 - 18:00', NULL, 'active', false, now() - interval '10 days');

-- ============================================
-- PRODUCTS
-- ============================================

-- Seller 1: Outlet TechUY (Tecnología)
INSERT INTO public.products (id, seller_id, title, slug, description, category, price_before, price_now, discount_pct, stock_qty, images, status, delivery_type, pickup_address, pickup_hours, offers_shipping, shipping_cost, liquidation_reason, location, created_at) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'Notebook Lenovo IdeaPad 3 - 8GB RAM 256GB SSD',
   'notebook-lenovo-ideapad-3-8gb-' || substr(gen_random_uuid()::text, 1, 8),
   'Notebook Lenovo IdeaPad 3, pantalla 15.6" Full HD, procesador Intel Core i5-1135G7, 8GB RAM DDR4, 256GB SSD. Windows 11 Home. Caja abierta, sin uso, garantía de fábrica 12 meses. Liquidamos por cambio de modelo.',
   'Tecnología', 32000, 22900, 28, 5,
   ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'],
   'approved', 'both', 'Av. 18 de Julio 1234, Centro', 'Lun-Vie 10-18hs', true, 350, 'sobrestock', 'Montevideo', now() - interval '10 days'),

  ('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001',
   'Auriculares Sony WH-1000XM4 - Noise Cancelling',
   'auriculares-sony-wh1000xm4-' || substr(gen_random_uuid()::text, 1, 8),
   'Auriculares inalámbricos Sony WH-1000XM4 con cancelación de ruido líder en la industria. Batería de 30 horas, carga rápida. Color negro. Producto de exhibición, perfecto estado.',
   'Tecnología', 12500, 8500, 32, 3,
   ARRAY['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
   'approved', 'shipping', NULL, NULL, true, 200, 'ultimas_unidades', 'Montevideo', now() - interval '8 days'),

  ('c1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001',
   'Monitor Samsung 27" Curvo Full HD',
   'monitor-samsung-27-curvo-' || substr(gen_random_uuid()::text, 1, 8),
   'Monitor Samsung 27" curvo, resolución Full HD 1920x1080, 75Hz, FreeSync. Ideal para trabajo y gaming casual. Últimas 2 unidades de exhibición.',
   'Tecnología', 15000, 9800, 35, 2,
   ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800'],
   'approved', 'pickup', 'Av. 18 de Julio 1234, Centro', 'Lun-Vie 10-18hs', false, NULL, 'ultimas_unidades', 'Montevideo', now() - interval '5 days'),

  ('c1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001',
   'Teclado Mecánico Redragon Kumara RGB',
   'teclado-mecanico-redragon-kumara-' || substr(gen_random_uuid()::text, 1, 8),
   'Teclado mecánico compacto TKL con switches blue, retroiluminación RGB. Nuevo en caja sellada. Liquidación por fin de lote.',
   'Tecnología', 3200, 1990, 38, 12,
   ARRAY['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'],
   'approved', 'both', 'Av. 18 de Julio 1234, Centro', 'Lun-Vie 10-18hs', true, 150, 'sobrestock', 'Montevideo', now() - interval '3 days'),

-- Seller 2: Moda Sur (Ropa y Calzado)
  ('c1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000002',
   'Campera de cuero sintético - Talle M/L/XL',
   'campera-cuero-sintetico-' || substr(gen_random_uuid()::text, 1, 8),
   'Campera de cuero sintético premium, forro interior de polar. Disponible en talles M, L y XL. Color negro. Fin de temporada otoño-invierno, liquidamos stock completo.',
   'Ropa y Calzado', 8500, 4200, 51, 15,
   ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800'],
   'approved', 'both', 'Bvar. España 2890, Pocitos', 'Mar-Sab 11-19hs', true, 250, 'fin_temporada', 'Montevideo', now() - interval '12 days'),

  ('c1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000002',
   'Pack 3 Jeans Slim Fit - Hombre',
   'pack-3-jeans-slim-fit-hombre-' || substr(gen_random_uuid()::text, 1, 8),
   'Pack de 3 jeans slim fit para hombre. Colores: azul oscuro, negro y gris. Tela con elastano para mayor comodidad. Talles 38 a 44.',
   'Ropa y Calzado', 7500, 4500, 40, 8,
   ARRAY['https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800'],
   'approved', 'both', 'Bvar. España 2890, Pocitos', 'Mar-Sab 11-19hs', true, 200, 'pack', 'Montevideo', now() - interval '9 days'),

  ('c1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000002',
   'Zapatillas Running Nike Revolution 6',
   'zapatillas-nike-revolution-6-' || substr(gen_random_uuid()::text, 1, 8),
   'Zapatillas Nike Revolution 6 para running. Talle 40-44. Modelo de temporada anterior, nuevas en caja. Ideales para entrenamiento diario.',
   'Ropa y Calzado', 6800, 3900, 43, 6,
   ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'],
   'approved', 'shipping', NULL, NULL, true, 300, 'fin_temporada', 'Montevideo', now() - interval '7 days'),

  ('c1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000002',
   'Vestido Midi Floral - Primavera',
   'vestido-midi-floral-primavera-' || substr(gen_random_uuid()::text, 1, 8),
   'Vestido midi con estampado floral, tela liviana y fresca. Talles S a XL. Perfecto para primavera-verano. Sobrestock de importación.',
   'Ropa y Calzado', 4200, 2100, 50, 20,
   ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'],
   'pending', 'pickup', 'Bvar. España 2890, Pocitos', 'Mar-Sab 11-19hs', false, NULL, 'sobrestock', 'Montevideo', now() - interval '1 day'),

-- Seller 3: ElectroHogar MVD (Hogar)
  ('c1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000003',
   'Cafetera Nespresso Essenza Mini',
   'cafetera-nespresso-essenza-mini-' || substr(gen_random_uuid()::text, 1, 8),
   'Cafetera Nespresso Essenza Mini, color rojo. Presión 19 bares, tanque 0.6L. Modelo de exhibición con solo 5 usos de prueba. Incluye kit de cápsulas de bienvenida.',
   'Hogar', 8900, 5900, 34, 4,
   ARRAY['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800'],
   'approved', 'both', 'Ruta 8 km 24, Barros Blancos', 'Lun-Vie 9-17hs, Sab 9-13hs', true, 400, 'ultimas_unidades', 'Canelones', now() - interval '14 days'),

  ('c1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000003',
   'Aspiradora Robot iRobot Roomba 694',
   'aspiradora-robot-irobot-roomba-' || substr(gen_random_uuid()::text, 1, 8),
   'Aspiradora robot iRobot Roomba 694 con WiFi. Limpieza automática programable via app. Producto reacondicionado certificado, funciona perfecto.',
   'Hogar', 18000, 11500, 36, 2,
   ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800'],
   'approved', 'shipping', NULL, NULL, true, 500, 'otro', 'Canelones', now() - interval '11 days'),

  ('c1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000003',
   'Set de Ollas Tramontina Acero Inox x5',
   'set-ollas-tramontina-acero-' || substr(gen_random_uuid()::text, 1, 8),
   'Set de 5 ollas Tramontina en acero inoxidable triple fondo. Incluye: cacerola 16cm, 20cm, 24cm, olla 20cm y sartén 24cm con tapas de vidrio. Nuevas en caja.',
   'Hogar', 12000, 7200, 40, 7,
   ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
   'approved', 'both', 'Ruta 8 km 24, Barros Blancos', 'Lun-Vie 9-17hs, Sab 9-13hs', true, 350, 'sobrestock', 'Canelones', now() - interval '6 days'),

  ('c1000000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000003',
   'Licuadora Philips ProBlend 1000W',
   'licuadora-philips-problend-' || substr(gen_random_uuid()::text, 1, 8),
   'Licuadora Philips ProBlend de 1000W con jarra de 2L. 5 velocidades + pulso. Cuchillas ProBlend de acero inoxidable. Caja dañada, producto intacto.',
   'Hogar', 5500, 3300, 40, 10,
   ARRAY['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800'],
   'approved', 'pickup', 'Ruta 8 km 24, Barros Blancos', 'Lun-Vie 9-17hs, Sab 9-13hs', false, NULL, 'sobrestock', 'Canelones', now() - interval '4 days'),

-- Seller 4: Juguetería Arcoíris (Juguetes / Niños)
  ('c1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000004',
   'LEGO City Estación de Bomberos 60320',
   'lego-city-estacion-bomberos-' || substr(gen_random_uuid()::text, 1, 8),
   'LEGO City Estación de Bomberos 60320, +540 piezas. Incluye camión de bomberos, helicóptero y 5 minifiguras. Nuevo, caja sellada. Exceso de stock navideño.',
   'Niños', 9500, 5900, 38, 4,
   ARRAY['https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800'],
   'approved', 'both', 'Gorlero 456, Punta del Este', 'Lun-Dom 10-21hs', true, 350, 'sobrestock', 'Maldonado', now() - interval '13 days'),

  ('c1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000004',
   'Muñeca Barbie Dreamhouse Adventures',
   'muneca-barbie-dreamhouse-' || substr(gen_random_uuid()::text, 1, 8),
   'Muñeca Barbie Dreamhouse Adventures con accesorios completos. Incluye ropa intercambiable y mascotas. Nueva en caja. Liquidación de línea anterior.',
   'Niños', 3800, 1900, 50, 8,
   ARRAY['https://images.unsplash.com/photo-1613682988402-1230b00b0386?w=800'],
   'approved', 'shipping', NULL, NULL, true, 200, 'fin_temporada', 'Maldonado', now() - interval '10 days'),

  ('c1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000004',
   'Pack Juegos de Mesa Familiar x3',
   'pack-juegos-mesa-familiar-' || substr(gen_random_uuid()::text, 1, 8),
   'Pack de 3 juegos de mesa: Monopoly Uruguay, Jenga y UNO. Todos nuevos y sellados. Precio increíble por el pack completo.',
   'Niños', 5400, 2900, 46, 6,
   ARRAY['https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800'],
   'approved', 'both', 'Gorlero 456, Punta del Este', 'Lun-Dom 10-21hs', true, 250, 'pack', 'Maldonado', now() - interval '4 days'),

-- Seller 5: Deportes Total (pending seller - productos en draft/pending)
  ('c1000000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000005',
   'Bicicleta Mountain Bike Rodado 29',
   'bicicleta-mountain-bike-r29-' || substr(gen_random_uuid()::text, 1, 8),
   'Bicicleta Mountain Bike rodado 29, cuadro de aluminio, 21 velocidades Shimano. Modelo de exhibición en excelente estado.',
   'Deportes', 25000, 16500, 34, 2,
   ARRAY['https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800'],
   'pending', 'pickup', 'Av. Rivera 3456, Punta Carretas', 'Lun-Sab 10-20hs', false, NULL, 'ultimas_unidades', 'Montevideo', now() - interval '2 days'),

  ('c1000000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000005',
   'Mancuernas Ajustables 2-24kg (par)',
   'mancuernas-ajustables-2-24kg-' || substr(gen_random_uuid()::text, 1, 8),
   'Par de mancuernas ajustables de 2 a 24kg cada una. Sistema de ajuste rápido. Ideales para entrenamiento en casa. Sobrestock de importación.',
   'Deportes', 15000, 9500, 37, 5,
   ARRAY['https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800'],
   'draft', 'both', 'Av. Rivera 3456, Punta Carretas', 'Lun-Sab 10-20hs', true, 600, 'sobrestock', 'Montevideo', now() - interval '1 day'),

-- Seller 6: Bazar El Encuentro (Hogar / Varios)
  ('c1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000006',
   'Vajilla Completa Porcelana x24 piezas',
   'vajilla-porcelana-24-piezas-' || substr(gen_random_uuid()::text, 1, 8),
   'Vajilla de porcelana blanca con borde dorado, set de 24 piezas para 6 personas. Incluye plato llano, hondo, postre y taza con plato. Importada, último set.',
   'Hogar', 8000, 4800, 40, 1,
   ARRAY['https://images.unsplash.com/photo-1603199506016-5d54ad6de507?w=800'],
   'approved', 'pickup', 'Calle de los Suspiros 12, Colonia del Sacramento', 'Jue-Dom 10-18hs', false, NULL, 'ultimas_unidades', 'Colonia', now() - interval '8 days'),

  ('c1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000006',
   'Lámpara de Pie Industrial Vintage',
   'lampara-pie-industrial-vintage-' || substr(gen_random_uuid()::text, 1, 8),
   'Lámpara de pie estilo industrial vintage, estructura de metal negro con detalles en madera. Altura regulable. Incluye lámpara LED. Excedente de decoración de local.',
   'Hogar', 4500, 2500, 44, 3,
   ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800'],
   'approved', 'pickup', 'Calle de los Suspiros 12, Colonia del Sacramento', 'Jue-Dom 10-18hs', false, NULL, 'otro', 'Colonia', now() - interval '6 days');

-- Producto con quantity_promo
UPDATE public.products SET quantity_promo = '{"min_qty": 3, "discount_pct": 15, "label": "15% extra llevando 3+"}'::jsonb
WHERE id = 'c1000000-0000-0000-0000-000000000004';

UPDATE public.products SET quantity_promo = '{"min_qty": 2, "discount_pct": 10, "label": "10% extra llevando 2+"}'::jsonb
WHERE id = 'c1000000-0000-0000-0000-000000000011';

UPDATE public.products SET quantity_promo = '{"min_qty": 2, "discount_pct": 20, "label": "20% extra llevando 2 packs"}'::jsonb
WHERE id = 'c1000000-0000-0000-0000-000000000032';

-- ============================================
-- RESERVATIONS
-- ============================================
INSERT INTO public.reservations (id, product_id, seller_id, buyer_name, buyer_contact, buyer_contact_type, quantity, note, status, seller_notes, created_at, updated_at) VALUES
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'Juan Pérez', '099111222', 'phone', 1, 'Me interesa la notebook, ¿tiene cargador original?', 'new', NULL,
   now() - interval '2 days', now() - interval '2 days'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'Ana García', 'ana.garcia@gmail.com', 'email', 2, 'Necesito 2 notebooks para la oficina. ¿Hacen precio por cantidad?', 'contacted', 'Le ofrecí 5% adicional por las 2. Queda en confirmar mañana.',
   now() - interval '5 days', now() - interval '3 days'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001',
   'Pedro Martínez', '098333444', 'phone', 1, NULL, 'closed', 'Retiró el producto. Pago en efectivo.',
   now() - interval '7 days', now() - interval '4 days'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000002',
   'Sofía López', 'sofia.lopez@hotmail.com', 'email', 3, 'Quiero 3 camperas: 1 M, 1 L y 1 XL. ¿Tienen los 3 talles?', 'contacted', 'Confirmé stock de los 3 talles. Coordinar envío.',
   now() - interval '4 days', now() - interval '2 days'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000002',
   'Diego Fernández', '097555666', 'phone', 1, 'Talle 42, ¿está disponible?', 'lost', 'No teníamos talle 42, solo 40 y 44.',
   now() - interval '6 days', now() - interval '5 days'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000003',
   'Valentina Ruiz', '099777888', 'phone', 1, '¿Las cápsulas que incluye son de qué sabor?', 'new', NULL,
   now() - interval '1 day', now() - interval '1 day'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000003',
   'Roberto Silva', 'roberto.silva@gmail.com', 'email', 2, 'Me interesan 2 sets. ¿Hacen envío a Rivera?', 'contacted', 'Le pasé costo de envío al interior. Esperando confirmación.',
   now() - interval '3 days', now() - interval '2 days'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000004',
   'Laura Acosta', '098444555', 'phone', 1, 'Es para regalo de cumpleaños, ¿pueden envolver?', 'closed', 'Envuelto y enviado. Cliente muy contenta.',
   now() - interval '10 days', now() - interval '8 days'),

  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000004',
   'Carlos Méndez', 'carlos.mendez@yahoo.com', 'email', 2, 'Quiero 2 packs para regalar en Navidad.', 'new', NULL,
   now() - interval '12 hours', now() - interval '12 hours');

-- ============================================
-- LEADS (tabla legacy / captura rápida)
-- ============================================
INSERT INTO public.leads (id, product_id, buyer_name, buyer_contact, quantity, note, status, created_at) VALUES
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000003', 'Marcos Vega', '099222111', 1, 'Vi el monitor, ¿se puede probar antes de comprar?', 'new', now() - interval '1 day'),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000021', 'Camila Torres', 'camila.t@gmail.com', 1, NULL, 'new', now() - interval '6 hours'),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000050', 'Elena Rodríguez', '098666777', 1, 'Me encanta la vajilla. ¿Hacen envío a Montevideo?', 'contacted', now() - interval '3 days');

-- ============================================
-- REPORTS
-- ============================================
INSERT INTO public.reports (id, product_id, reason, description, reporter_email, status, created_at) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002',
   'precio_no_real', 'Vi estos auriculares en otra tienda a $9000 nuevos. El "precio anterior" de $12500 parece inflado para simular mayor descuento.',
   'comprador_atento@gmail.com', 'open', now() - interval '3 days'),

  ('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000012',
   'info_incorrecta', 'Dice que son Nike Revolution 6 pero la foto parece ser de otro modelo completamente diferente.',
   'runner_uy@hotmail.com', 'open', now() - interval '2 days'),

  ('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000023',
   'fraude', 'Compré una licuadora de este vendedor hace un mes por otra plataforma y nunca llegó. Desconfío de sus publicaciones.',
   'usuario_afectado@gmail.com', 'resolved', now() - interval '15 days');

-- Report actions for the resolved report
INSERT INTO public.report_actions (id, report_id, action, admin_id, admin_name, note, created_at) VALUES
  (gen_random_uuid(), 'd1000000-0000-0000-0000-000000000003', 'report_created', 'b1000000-0000-0000-0000-000000000099', 'Sistema', 'Reporte creado automáticamente', now() - interval '15 days'),
  (gen_random_uuid(), 'd1000000-0000-0000-0000-000000000003', 'evidence_requested', 'b1000000-0000-0000-0000-000000000099', 'Admin', 'Se solicitó evidencia al denunciante', now() - interval '13 days'),
  (gen_random_uuid(), 'd1000000-0000-0000-0000-000000000003', 'report_resolved', 'b1000000-0000-0000-0000-000000000099', 'Admin', 'Se verificó con el vendedor. Fue un problema logístico de otra plataforma, no aplica a LiquiOff.', now() - interval '10 days');

-- Update resolved report
UPDATE public.reports SET resolved_at = now() - interval '10 days' WHERE id = 'd1000000-0000-0000-0000-000000000003';

-- ============================================
-- SUBSCRIBERS
-- ============================================
INSERT INTO public.subscribers (id, nombre, contacto, metodo_contacto, zona, categorias, frecuencia, created_at) VALUES
  (gen_random_uuid(), 'María Belén', 'mbelen@gmail.com', 'email', 'Montevideo', ARRAY['Tecnología', 'Hogar'], 'semanal', now() - interval '20 days'),
  (gen_random_uuid(), 'Santiago', '099888999', 'whatsapp', 'Canelones', ARRAY['Deportes', 'Ropa y Calzado'], 'semanal', now() - interval '15 days'),
  (gen_random_uuid(), 'Florencia P.', 'flor.p@outlook.com', 'email', 'Maldonado', ARRAY['Niños', 'Hogar'], 'semanal', now() - interval '10 days'),
  (gen_random_uuid(), 'Gonzalo R.', '098111000', 'whatsapp', 'Montevideo', ARRAY['Tecnología'], 'semanal', now() - interval '5 days');

-- ============================================
-- MODERATION HISTORY (para productos aprobados)
-- ============================================
INSERT INTO public.moderation_history (product_id, action, admin_id, admin_name, reason, created_at)
SELECT id, 'submitted', NULL, 'Sistema', 'Enviado para revisión', created_at + interval '1 minute'
FROM public.products WHERE status IN ('approved', 'pending');

INSERT INTO public.moderation_history (product_id, action, admin_id, admin_name, reason, created_at)
SELECT id, 'approved', 'b1000000-0000-0000-0000-000000000099', 'Admin', 'Producto aprobado - cumple políticas', created_at + interval '1 hour'
FROM public.products WHERE status = 'approved';

-- ============================================
-- FIN DEL SEED
-- ============================================
