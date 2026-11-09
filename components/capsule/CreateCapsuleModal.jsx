import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import LoginCard from "../auth/LoginCard";
import CreateCapsuleCard from "./CreateCapsuleCard";

/**
 * The "Create Capsule" popup on the home page, in two steps:
 *   1. "login"   – sign in with email code or Google (skipped if signed in)
 *   2. "details" – event name and date, then the capsule is created
 *
 * @param startStep "login" or "details", decided when the popup opens
 * @param onCreated (capsule) => void
 */
export default function CreateCapsuleModal({ open, onClose, startStep = "login", onCreated }) {
  const [step, setStep] = useState(startStep);

  // Each time the popup opens, start at the step the caller chose.
  useEffect(() => {
    if (open) setStep(startStep);
  }, [open, startStep]);

  const headingId = step === "login" ? "capsule-modal-login-heading" : "capsule-modal-details-heading";

  return (
    <Modal open={open} onClose={onClose} labelledBy={headingId} focusKey={step}>
      {step === "login" ? (
        <LoginCard headingId={headingId} onSignedIn={() => setStep("details")} />
      ) : (
        <CreateCapsuleCard headingId={headingId} onCreated={onCreated} onSessionExpired={() => setStep("login")} />
      )}
    </Modal>
  );
}
