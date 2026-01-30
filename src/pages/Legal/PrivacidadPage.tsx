import { LegalPageLayout } from './components/LegalPageLayout';

export function PrivacidadPage() {
  return (
    <LegalPageLayout 
      title="Política de Privacidad" 
      lastUpdated="30 de enero de 2026"
    >
      {/* 1. Introducción */}
      <section>
        <h2>1. Introducción</h2>
        <p>
          En <strong>LiquiMarket</strong> nos comprometemos a proteger la privacidad de nuestros 
          usuarios. Esta Política de Privacidad describe cómo recolectamos, usamos, almacenamos 
          y protegemos tu información personal.
        </p>
        <p>
          Esta política aplica a todos los usuarios de nuestra plataforma, tanto compradores 
          como vendedores, y está diseñada para cumplir con la{' '}
          <strong>Ley N° 18.331 de Protección de Datos Personales</strong> de la República 
          Oriental del Uruguay.
        </p>
        <p>
          El responsable del tratamiento de tus datos personales es <strong>LiquiMarket</strong>, 
          operando en Uruguay.
        </p>
      </section>

      {/* 2. Datos que Recolectamos */}
      <section>
        <h2>2. Datos que Recolectamos</h2>
        
        <h3>2.1 De Compradores (sin cuenta)</h3>
        <p>Cuando interactuás con nuestra plataforma sin crear una cuenta, podemos recolectar:</p>
        <ul>
          <li>
            <strong>Al hacer una reserva:</strong> nombre, teléfono o email, cantidad deseada 
            y comentarios opcionales.
          </li>
          <li>
            <strong>Al suscribirte a alertas de liquidaciones (Drops):</strong> nombre, email 
            o WhatsApp, categorías de interés y zona/departamento.
          </li>
          <li>
            <strong>Al reportar una publicación:</strong> email (opcional) y motivo del reporte.
          </li>
        </ul>

        <h3>2.2 De Vendedores (con cuenta)</h3>
        <p>Cuando te registrás como vendedor, recolectamos:</p>
        <ul>
          <li>
            <strong>En el registro:</strong> nombre comercial, nombre del responsable, email, 
            teléfono, departamento/zona, dirección (opcional) y contraseña.
          </li>
          <li>
            <strong>En tu perfil:</strong> mensaje de WhatsApp predeterminado y políticas de 
            venta personalizadas.
          </li>
          <li>
            <strong>En tus publicaciones:</strong> imágenes de productos, descripciones, 
            precios, stock y ubicación para retiro.
          </li>
        </ul>
        <p>
          <strong>Nota importante:</strong> Las contraseñas se almacenan utilizando técnicas 
          de hash seguro y nunca en texto plano.
        </p>

        <h3>2.3 Datos Técnicos (automáticos)</h3>
        <p>Cuando navegás por nuestra plataforma, podemos recolectar automáticamente:</p>
        <ul>
          <li>Dirección IP</li>
          <li>Tipo de navegador y dispositivo</li>
          <li>Páginas visitadas y tiempo de permanencia</li>
          <li>Información de cookies (ver sección específica)</li>
        </ul>
      </section>

      {/* 3. Finalidad del Tratamiento */}
      <section>
        <h2>3. Finalidad del Tratamiento</h2>
        
        <h3>3.1 Usamos tus datos para:</h3>
        <ul>
          <li>Facilitar la conexión entre compradores y vendedores</li>
          <li>Enviar notificaciones de reservas a vendedores</li>
          <li>Enviar alertas de nuevas liquidaciones a suscriptores (Drops)</li>
          <li>Moderar contenido y prevenir fraudes</li>
          <li>Mejorar la plataforma y la experiencia de usuario</li>
          <li>Cumplir con obligaciones legales</li>
          <li>Responder a consultas y brindar soporte</li>
        </ul>

        <h3>3.2 NO usamos tus datos para:</h3>
        <ul>
          <li>Vender información a terceros</li>
          <li>Enviar marketing no solicitado (salvo que te hayas suscrito explícitamente a Drops)</li>
          <li>Crear perfiles con fines publicitarios externos</li>
        </ul>
      </section>

      {/* 4. Base Legal del Tratamiento */}
      <section>
        <h2>4. Base Legal del Tratamiento</h2>
        <p>El tratamiento de tus datos se basa en:</p>
        <ul>
          <li>
            <strong>Consentimiento:</strong> Al enviar formularios de reserva, suscripción o 
            reporte, nos das tu consentimiento para procesar esos datos.
          </li>
          <li>
            <strong>Ejecución de contrato:</strong> Para vendedores registrados, el tratamiento 
            es necesario para la prestación del servicio acordado.
          </li>
          <li>
            <strong>Interés legítimo:</strong> Para garantizar la seguridad de la plataforma 
            y prevenir fraudes.
          </li>
          <li>
            <strong>Cumplimiento legal:</strong> Cuando la ley uruguaya lo requiera.
          </li>
        </ul>
      </section>

      {/* 5. Compartición de Datos */}
      <section>
        <h2>5. Compartición de Datos</h2>
        
        <h3>5.1 Compartimos datos de forma limitada:</h3>
        <ul>
          <li>
            <strong>Datos de reserva del comprador → con el vendedor:</strong> Cuando hacés 
            una reserva, tus datos de contacto se comparten con el vendedor del producto 
            específico para que pueda coordinar contigo.
          </li>
          <li>
            <strong>Datos públicos del vendedor → con compradores:</strong> Nombre comercial, 
            zona y políticas de venta son visibles para los compradores.
          </li>
        </ul>

        <h3>5.2 NO compartimos:</h3>
        <ul>
          <li>Datos con terceros para fines de marketing</li>
          <li>Datos de contacto de compradores con otros vendedores o terceros</li>
          <li>Información personal sin tu consentimiento previo</li>
        </ul>

        <h3>5.3 Proveedores de servicios</h3>
        <p>
          Podemos utilizar proveedores de servicios externos (hosting, email transaccional) 
          que procesan datos bajo nuestras instrucciones y con obligaciones de confidencialidad.
        </p>
      </section>

      {/* 6. Retención de Datos */}
      <section>
        <h2>6. Retención de Datos</h2>
        <p>Conservamos tus datos personales durante los siguientes períodos:</p>
        <ul>
          <li>
            <strong>Datos de reservas:</strong> 12 meses después de completada o cancelada 
            la reserva.
          </li>
          <li>
            <strong>Datos de suscriptores (Drops):</strong> Hasta que solicites la baja de 
            las notificaciones.
          </li>
          <li>
            <strong>Datos de vendedores:</strong> Mientras la cuenta esté activa, más 24 meses 
            adicionales después del cierre de la cuenta.
          </li>
          <li>
            <strong>Datos técnicos y logs:</strong> 6 meses.
          </li>
        </ul>
        <p>
          Pasados estos períodos, los datos se eliminan o se anonimizan de forma irreversible.
        </p>
      </section>

      {/* 7. Seguridad de los Datos */}
      <section>
        <h2>7. Seguridad de los Datos</h2>
        <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos:</p>
        <ul>
          <li>Contraseñas almacenadas con algoritmos de hash seguro</li>
          <li>Conexiones cifradas mediante protocolo HTTPS</li>
          <li>Acceso restringido a datos personales solo a personal autorizado</li>
          <li>Revisión periódica de nuestras medidas de seguridad</li>
          <li>Respaldos regulares de la información</li>
        </ul>
      </section>

      {/* 8. Derechos del Usuario */}
      <section>
        <h2>8. Tus Derechos (según Ley 18.331)</h2>
        <p>
          De acuerdo con la Ley N° 18.331 de Protección de Datos Personales de Uruguay, 
          tenés los siguientes derechos:
        </p>
        <ul>
          <li>
            <strong>Derecho de Acceso:</strong> Podés solicitar información sobre qué datos 
            personales tenemos sobre vos.
          </li>
          <li>
            <strong>Derecho de Rectificación:</strong> Podés corregir datos personales que 
            sean inexactos o estén incompletos.
          </li>
          <li>
            <strong>Derecho de Supresión:</strong> Podés solicitar la eliminación de tus 
            datos personales cuando ya no sean necesarios.
          </li>
          <li>
            <strong>Derecho de Oposición:</strong> Podés oponerte a determinados tratamientos 
            de tus datos.
          </li>
        </ul>
        <p>
          Para ejercer estos derechos, contactanos a{' '}
          <a href="mailto:privacidad@liquimarket.uy">privacidad@liquimarket.uy</a>.
        </p>
        <p>
          <strong>Plazo de respuesta:</strong> Responderemos a tu solicitud dentro de los 
          15 días hábiles, según lo establecido por la ley.
        </p>
      </section>

      {/* 9. Cookies */}
      <section>
        <h2>9. Cookies y Tecnologías Similares</h2>
        <p>Nuestra plataforma puede utilizar cookies para:</p>
        <ul>
          <li>
            <strong>Funcionalidad:</strong> Recordar tus preferencias y mantener tu sesión 
            activa (vendedores).
          </li>
          <li>
            <strong>Análisis:</strong> Entender cómo se usa la plataforma para mejorarla.
          </li>
        </ul>
        <p>
          Podés configurar tu navegador para rechazar cookies o recibir avisos cuando se 
          envían. Sin embargo, algunas funcionalidades de la plataforma pueden no funcionar 
          correctamente sin cookies.
        </p>
      </section>

      {/* 10. Menores de Edad */}
      <section>
        <h2>10. Menores de Edad</h2>
        <ul>
          <li>LiquiMarket no está dirigido a menores de 18 años.</li>
          <li>Los vendedores deben ser mayores de edad para registrarse.</li>
          <li>
            Si detectamos que hemos recolectado datos de un menor sin el consentimiento 
            de sus padres o tutores, procederemos a eliminarlos.
          </li>
        </ul>
      </section>

      {/* 11. Transferencias Internacionales */}
      <section>
        <h2>11. Transferencias Internacionales</h2>
        <p>
          Nuestros servidores pueden estar ubicados fuera de Uruguay. En caso de transferencias 
          internacionales de datos, nos aseguramos de que existan garantías de protección 
          equivalentes a las establecidas por la legislación uruguaya, según lo dispuesto 
          por la Ley 18.331.
        </p>
      </section>

      {/* 12. Cambios en la Política */}
      <section>
        <h2>12. Cambios en esta Política</h2>
        <ul>
          <li>
            Podemos actualizar esta Política de Privacidad periódicamente para reflejar 
            cambios en nuestras prácticas o en la legislación aplicable.
          </li>
          <li>
            Los cambios se publicarán en esta página con una nueva fecha de actualización.
          </li>
          <li>
            Para cambios significativos, haremos esfuerzos razonables por notificar a los 
            usuarios registrados.
          </li>
          <li>
            El uso continuado de la plataforma después de publicados los cambios implica 
            la aceptación de la nueva política.
          </li>
        </ul>
      </section>

      {/* 13. Contacto y Reclamos */}
      <section>
        <h2>13. Contacto y Reclamos</h2>
        <p>Para consultas sobre esta política o sobre el tratamiento de tus datos:</p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:privacidad@liquimarket.uy">privacidad@liquimarket.uy</a>
          </li>
        </ul>
        <p className="mt-4">
          Si considerás que tus derechos no han sido respetados, tenés derecho a presentar 
          un reclamo ante la{' '}
          <strong>Unidad Reguladora y de Control de Datos Personales (URCDP)</strong> de Uruguay.
        </p>
        <ul>
          <li>
            <strong>Web URCDP:</strong>{' '}
            <a href="https://www.gub.uy/unidad-reguladora-control-datos-personales" target="_blank" rel="noopener noreferrer">
              www.gub.uy/unidad-reguladora-control-datos-personales
            </a>
          </li>
        </ul>
        <p className="mt-4 text-sm">
          Al utilizar LiquiMarket, confirmás que has leído y comprendido esta Política de 
          Privacidad.
        </p>
      </section>
    </LegalPageLayout>
  );
}
