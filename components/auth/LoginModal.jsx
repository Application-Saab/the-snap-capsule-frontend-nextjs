import Modal from "../ui/Modal";
import LoginCard from "./LoginCard";

const HEADING_ID = "login-modal-heading";

/**
 * The login popup: email + 6-digit code, or Google.
 *
 * @param onSignedIn (user) => void, called once the session cookie is set
 */
export default function LoginModal({ open, onClose, onSignedIn }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy={HEADING_ID}>
      <LoginCard headingId={HEADING_ID} onSignedIn={onSignedIn} />
    </Modal>
  );
}
