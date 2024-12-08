import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css"; // Archivo CSS

const WhatsAppButton = () => {
  const numToSend = "59898559874";
  const messageToSend = "Soy un tipo tranquilo, chill de cojones";
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

