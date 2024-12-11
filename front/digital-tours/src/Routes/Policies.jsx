import styles from "../styles/policies.module.css"

const Policies = () => {
    return (
        <div className={styles.policy_container}>
            <h1 className={styles.block_title} >Políticas de DigitalTours</h1>

            <section className={styles.policy_section}>
                <h2>Políticas de privacidad</h2>
                <p>Al aceptar esta política de privacidad, usted autoriza a DigitalTours a tratar sus datos personales para todos o algunos de los fines presentes en esta política.</p>
                <ul>
                    <li>Toda recopilación y tratamiento de datos personales se llevará a cabo de acuerdo con lo establecido por la ley.</li>
                    <li>Sus datos personales no serán transferidos, vendidos, divulgados o arrendados a terceros.</li>
                    <li>Cuando un dato personal ya no sea de uso necesario y no se tenga obligación legal de almacenarlo, nuestra intención es eliminarlo o anonimizarlo.</li>
                    <li>No se recopilará información de menores de edad, si no a través del mayor responsable que realice la reserva.</li>
                </ul>
            </section>

            <section className={styles.policy_section}>
                <h2>Políticas de Cancelaciones</h2>
                <p>El plazo mínimo para realizar reservas es de 8 horas de anticipación. La cancelación es gratuita hasta 24 horas antes de la experiencia. Las reservas, en algunos casos, no son reembolsables.</p>
            </section>

            <section className={styles.policy_section}>
                <h2>Políticas de Accesibilidad</h2>
                <p>Los usuarios deben revisar las características de los tours para identificar las limitantes de accesibilidad. Además, deben cumplir con las condiciones médicas y físicas para realizar experiencias de aventura.</p>
            </section>

            <section className={styles.policy_section}>
                <h2>Políticas para Mascotas</h2>
                <p>El dueño debe garantizar el bienestar de la mascota durante la estadía en el sitio. Revisar en qué experiencias se permite el ingreso y contar con los elementos necesarios, como bolsas para aseo, correa y bozal si aplica.</p>
            </section>

            <section className={styles.policy_section}>
                <h2>Políticas de Sostenibilidad</h2>
                <ul>
                    <li>Separación de residuos en origen (orgánicos, reciclables, no reciclables).</li>
                    <li>Uso de productos biodegradables y compostables.</li>
                    <li>Promoción del reciclaje entre los viajeros y el personal.</li>
                    <li>Colaboración con empresas locales de reciclaje.</li>
                </ul>
                <p>Se priorizan compras sostenibles de proveedores locales y productos de comercio justo. Se prohíbe sustraer fauna o flora de los lugares visitados y se promueve la compensación de la huella de carbono.</p>
            </section>
        </div>
    );
}

export default Policies;