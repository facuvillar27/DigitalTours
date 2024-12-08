import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css"; // Archivo CSS

const WhatsAppButton = () => {
  const numToSend = "59892378972";
  const messageToSend = "Hola, me gustaría contactarme con un asesor comercial.";
  const encodedMessageToSend = encodeURIComponent(messageToSend);
  const href = `https://wa.me/${numToSend}?text=${encodedMessageToSend}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppButton;

