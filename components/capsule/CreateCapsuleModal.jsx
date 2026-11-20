import Modal from "../ui/Modal";
import LoginCard from "../auth/LoginCard";
import CreateCapsuleCard from "./CreateCapsuleCard";

const LOGIN_HEADING = "create-capsule-login-heading";
const DETAILS_HEADING = "create-capsule-details-heading";

/**
 * The Create Capsule popup:
 *   step "login"   – Get Started / Verification (skipped if already signed in)
 *   step "details" – Let's Create Your Capsule (event name + date)
 *
 * @param onStepChange (step) => void, e.g. back to "login" if the session ended
 * @param onCreated    (capsule) => void, called after the capsule is saved
 */
export default function CreateCapsuleModal({ open, step, onClose, onStepChange, onCreated }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy={step === "login" ? LOGIN_HEADING : DETAILS_HEADING}>
      {step === "login" ? (
        <LoginCard headingId={LOGIN_HEADING} onSignedIn={() => onStepChange("details")} />
      ) : (
        <CreateCapsuleCard
          headingId={DETAILS_HEADING}
          onCreated={onCreated}
          onSessionExpired={() => onStepChange("login")}
        />
      )}
    </Modal>
  );
}
