import { LegalPageLayout } from './components/LegalPageLayout';

export function TerminosPage() {
  return (
    <LegalPageLayout 
      title="Términos y Condiciones" 
      lastUpdated="30 de enero de 2026"
    >
      {/* 1. Introducción */}
      <section>
        <h2>1. Introducción</h2>
        <p>
          Bienvenido a <strong>LiquiMarket</strong>, una plataforma operada en Uruguay que conecta 
          compradores con vendedores de productos en liquidación. Nuestra propuesta de valor es 
          simple: <strong>"Todo ≥25% OFF real"</strong>.
        </p>
        <p>
          Al acceder y utilizar nuestra plataforma, usted acepta estos Términos y Condiciones en 
          su totalidad. Si no está de acuerdo con alguna parte de estos términos, le solicitamos 
          que no utilice nuestros servicios.
        </p>
      </section>

      {/* 2. Definiciones */}
      <section>
        <h2>2. Definiciones</h2>
        <p>Para los efectos de estos términos, se entenderá por:</p>
        <ul>
          <li>
            <strong>"Plataforma"</strong>: El sitio web LiquiMarket y todos sus servicios asociados.
          </li>
          <li>
            <strong>"Comprador"</strong>: Usuario que navega la plataforma y realiza reservas de productos.
          </li>
          <li>
            <strong>"Vendedor"</strong>: Usuario registrado que publica productos en liquidación en la plataforma.
          </li>
          <li>
            <strong>"Reserva"</strong>: Manifestación de interés de un comprador sobre un producto. 
            <strong> No constituye una compra ni genera obligación de adquisición.</strong>
          </li>
          <li>
            <strong>"Liquidación"</strong>: Producto ofrecido con un descuento mínimo del 25% sobre 
            su precio original verificable.
          </li>
        </ul>
      </section>

      {/* 3. Naturaleza del Servicio */}
      <section>
        <h2>3. Naturaleza del Servicio</h2>
        <p>
          LiquiMarket actúa exclusivamente como <strong>intermediario</strong> entre compradores y 
          vendedores. Es importante que comprenda que:
        </p>
        <ul>
          <li>No somos vendedores directos de los productos publicados.</li>
          <li>No formamos parte de las transacciones realizadas entre compradores y vendedores.</li>
          <li>No garantizamos la disponibilidad, calidad, ni entrega de los productos publicados.</li>
          <li>La transacción final (pago, retiro, envío) se coordina directamente entre las partes.</li>
        </ul>
      </section>

      {/* 4. Regla del Descuento Mínimo */}
      <section>
        <h2>4. Regla del Descuento Mínimo (25% OFF)</h2>
        <p>
          El compromiso central de LiquiMarket es que todos los productos publicados tengan un 
          descuento real y verificable:
        </p>
        <ul>
          <li>
            <strong>Descuento mínimo obligatorio:</strong> Todos los productos deben tener al menos 
            un 25% de descuento sobre el precio original.
          </li>
          <li>
            <strong>Precio original verificable:</strong> El precio original (P0) debe ser verificable 
            mediante documentación o declarado de buena fe por el vendedor.
          </li>
          <li>
            <strong>Moderación activa:</strong> Nos reservamos el derecho de rechazar o remover 
            publicaciones que no cumplan con este requisito.
          </li>
          <li>
            <strong>Sanciones:</strong> Vendedores que infrinjan repetidamente esta regla pueden 
            ser suspendidos o eliminados de la plataforma.
          </li>
        </ul>
      </section>

      {/* 5. Sistema de Reservas */}
      <section>
        <h2>5. Sistema de Reservas</h2>
        <p>
          Nuestro sistema de reservas funciona de la siguiente manera:
        </p>
        <ul>
          <li>
            La reserva es una <strong>manifestación de interés</strong> del comprador, no una compra.
          </li>
          <li>
            No existe obligación de compra por parte del comprador ni obligación de venta por parte 
            del vendedor derivada de una reserva.
          </li>
          <li>
            La coordinación del pago, retiro o envío del producto se realiza directamente entre 
            comprador y vendedor.
          </li>
          <li>
            LiquiMarket no interviene en disputas que surjan después de realizada la reserva.
          </li>
        </ul>
      </section>

      {/* 6. Responsabilidades del Vendedor */}
      <section>
        <h2>6. Responsabilidades del Vendedor</h2>
        <p>Al registrarse como vendedor en LiquiMarket, usted se compromete a:</p>
        <ul>
          <li>Publicar información veraz, completa y actualizada sobre sus productos.</li>
          <li>Mantener disponible el stock declarado en sus publicaciones.</li>
          <li>Responder a las reservas en un tiempo razonable (máximo 48 horas hábiles).</li>
          <li>Cumplir estrictamente con la regla del descuento mínimo del 25%.</li>
          <li>
            No publicar productos prohibidos, incluyendo pero no limitado a: falsificaciones, 
            productos robados, artículos ilegales, o productos que infrinjan derechos de terceros.
          </li>
        </ul>
      </section>

      {/* 7. Responsabilidades del Comprador */}
      <section>
        <h2>7. Responsabilidades del Comprador</h2>
        <p>Al utilizar la plataforma como comprador, usted se compromete a:</p>
        <ul>
          <li>Verificar la información del producto antes de realizar una reserva.</li>
          <li>Contactar al vendedor de buena fe para coordinar la transacción.</li>
          <li>Reportar publicaciones que considere sospechosas, fraudulentas o que no cumplan 
            con las políticas de la plataforma.</li>
          <li>No realizar reservas sin intención genuina de adquirir el producto.</li>
        </ul>
      </section>

      {/* 8. Moderación y Sanciones */}
      <section>
        <h2>8. Moderación y Sanciones</h2>
        <p>
          Para mantener la calidad y confiabilidad de la plataforma, implementamos un sistema 
          de moderación activo:
        </p>
        <ul>
          <li>
            <strong>Moderación previa:</strong> Todas las publicaciones son revisadas antes de 
            ser aprobadas y visibles en el catálogo.
          </li>
          <li>
            <strong>Acciones correctivas:</strong> Podemos rechazar, ocultar o eliminar publicaciones 
            que no cumplan con nuestras políticas.
          </li>
          <li>
            <strong>Suspensión de cuentas:</strong> Podemos suspender temporal o permanentemente 
            cuentas de vendedores que infrinjan estos términos.
          </li>
          <li>
            <strong>Sistema de reportes:</strong> Contamos con un sistema para que los usuarios 
            puedan denunciar irregularidades o infracciones.
          </li>
        </ul>
      </section>

      {/* 9. Limitación de Responsabilidad */}
      <section>
        <h2>9. Limitación de Responsabilidad</h2>
        <p>LiquiMarket, dentro del marco legal aplicable:</p>
        <ul>
          <li>
            No garantiza la exactitud, veracidad o actualidad de la información publicada por 
            los vendedores.
          </li>
          <li>
            No es responsable por transacciones fallidas, incumplimientos o disputas entre 
            compradores y vendedores.
          </li>
          <li>
            No es responsable por daños directos, indirectos, incidentales o consecuentes 
            derivados del uso de la plataforma.
          </li>
          <li>
            La responsabilidad máxima de LiquiMarket se limitará según lo establecido por 
            la legislación uruguaya vigente.
          </li>
        </ul>
      </section>

      {/* 10. Propiedad Intelectual */}
      <section>
        <h2>10. Propiedad Intelectual</h2>
        <ul>
          <li>
            El diseño, código, marca y contenido original de la plataforma son propiedad 
            exclusiva de LiquiMarket.
          </li>
          <li>
            Los vendedores mantienen los derechos sobre las imágenes y descripciones de 
            sus productos, otorgando a LiquiMarket licencia para mostrarlos en la plataforma.
          </li>
          <li>
            Está prohibido copiar, reproducir o utilizar cualquier contenido de la plataforma 
            sin autorización expresa por escrito.
          </li>
        </ul>
      </section>

      {/* 11. Modificaciones */}
      <section>
        <h2>11. Modificaciones</h2>
        <p>
          LiquiMarket se reserva el derecho de modificar estos Términos y Condiciones en 
          cualquier momento:
        </p>
        <ul>
          <li>Los cambios serán publicados en esta página con una nueva fecha de actualización.</li>
          <li>
            El uso continuado de la plataforma después de publicados los cambios implica la 
            aceptación de los nuevos términos.
          </li>
          <li>
            Para cambios sustanciales, haremos esfuerzos razonables para notificar a los 
            usuarios registrados.
          </li>
        </ul>
      </section>

      {/* 12. Legislación Aplicable */}
      <section>
        <h2>12. Legislación Aplicable y Jurisdicción</h2>
        <ul>
          <li>
            Estos Términos y Condiciones se rigen por las leyes de la República Oriental del Uruguay.
          </li>
          <li>
            Cualquier disputa o controversia será sometida a los tribunales competentes de 
            la ciudad de Montevideo, Uruguay.
          </li>
          <li>
            Las partes renuncian expresamente a cualquier otro fuero que pudiera corresponderles.
          </li>
        </ul>
      </section>

      {/* 13. Contacto */}
      <section>
        <h2>13. Contacto</h2>
        <p>
          Para consultas relacionadas con estos Términos y Condiciones, puede contactarnos a través de:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:legal@liquimarket.uy">legal@liquimarket.uy</a>
          </li>
        </ul>
        <p className="mt-4 text-sm">
          Al utilizar LiquiMarket, usted confirma que ha leído, comprendido y aceptado estos 
          Términos y Condiciones en su totalidad.
        </p>
      </section>
    </LegalPageLayout>
  );
}
