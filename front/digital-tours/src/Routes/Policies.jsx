import styles from "../styles/policies.module.css"

const Policies = () => {
    return (
        <div class={styles.policies_container}>
            <h1 class={styles.policies_h1}> Politicas</h1>
                <h2 class={styles.policies_h2}>Políticas de privacidad</h2>
                <p>Al aceptar esta política de privacidad, usted autoriza a DigitalTours a tratar sus datos personales para todos o algunos de los fines presentes en esta política. Esta política puede ser cambiada en cualquier momento y se garantizará la notificación de dichos cambios.</p>
                <p>En DigitalTours estamos comprometidos con la protección de sus datos personales y garantizamos que serán tratados de acuerdo con la ley aplicable, estos son los principios que nos guían:</p>
                <ul class={styles.policies_ul}>
                    <li>Toda recopilación y tratamiento de datos personales se llevará a cabo de acuerdo con lo establecido por la ley.</li>
                    <li>Sus datos personales no serán transferidos, vendidos, divulgados o arrendados a terceros.</li>
                    <li>Cuando un dato personal ya no sea de uso necesario y no se tenga obligación legal de almacenarlo, nuestra intención es eliminarlo o anonimizarlo.</li>
                    <li>No se recopilará información de menores de edad, si no a través del mayor responsable que realice la reserva.</li>
                </ul>

                <h2 class={styles.policies_h2}>Políticas de Cancelaciones</h2>
                <ul class={styles.policies_ul}>
                    <li>El plazo mínimo para realizar reservas es de 8 horas de anticipación (aplicables para algunos tours, consultar antes de realizar).</li>
                    <li>La cancelación es gratuita hasta 24 horas antes de la experiencia, después de este tiempo solo aplica para casos fortuitos.</li>
                    <li>Por lo anterior, las reservas en algunos casos no son reembolsables.</li>
                </ul>

                <h2 class={styles.policies_h2}>Políticas de Accesibilidad</h2>
                <p>Los usuarios de nuestros servicios deben revisar las características de los tours para identificar las limitantes de accesibilidad de los mismos. Además, se debe cumplir con las condiciones médicas y físicas para realizar algunas de nuestras experiencias (prestar atención en las de Aventura).</p>

                <h2 class={styles.policies_h2}>Políticas para Mascotas</h2>
                <ul class={styles.policies_ul}>
                    <li>El dueño de la mascota debe garantizar el bienestar de esta durante la estadía en el sitio.</li>
                    <li>Revisar en qué experiencias se permite el ingreso de estas.</li>
                    <li>Se debe contar con los elementos para el cuidado de estas, como lo son bolsas para aseo, correa y bozal si es el caso.</li>
                </ul>

                <h2 class={styles.policies_h2}>Políticas de Sostenibilidad</h2>
                <h2 class={styles.policies_h2}>Gestión de Residuos</h2>
                <ul class={styles.policies_ul}>
                    <li>Separación de residuos en origen (orgánicos, reciclables, no reciclables).</li>
                    <li>Uso de productos biodegradables y compostables.</li>
                    <li>Promoción del reciclaje entre los viajeros y el personal.</li>
                    <li>Colaboración con empresas locales de reciclaje.</li>
                </ul>
                <p>Se prioriza las compras sostenibles, a proveedores locales y productos de comercio justo. Se busca que sean productos de bajo impacto ambiental y social. Se promueve la economía circular y reutilización de materiales.</p>
                <p>Se prohíbe sustraer fauna o flora de los lugares visitados.</p>
                <p>Se promueve la compensación de la huella de carbono entre nuestros clientes y operadores.</p>
        </div>
    );
}

export default Policies;