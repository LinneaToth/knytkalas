"use client";
import InfoModal from "@/ui/components/InfoModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TermsModal({ isOpen, onClose }: Props) {
  return (
    <InfoModal isOpen={isOpen} onClose={onClose}>
      {" "}
      <h1>Terms and conditions</h1>
      <p>Last updated: 2026-08-21</p>
      <p>
        These terms cover using Knytkalas.net itself — what the Service is,
        what's expected of you as a user, and what you can and can't hold us
        responsible for.
      </p>
      <ol className="flex list-decimal flex-col gap-3">
        <li>
          <h2>Acceptance</h2>
          By creating an account or using Knytkalas.net, you agree to these
          terms. If you don't agree, please don't use the Service.
        </li>
        <li>
          <h2>What the Service is</h2>
          Knytkalas.net is a student project (graduation project at
          Yrkeshögskolan i Borås) that helps hosts and guests organize
          potluck-style events: creating events, sending invites, tracking
          RSVPs, and coordinating food contributions.
        </li>
        <li>
          <h2>Accounts</h2>
          You sign in with a Google account. You are responsible for keeping
          that account secure, and for the accuracy of the information you
          provide: Your own name, and any event, guest, or contribution details
          you enter.
        </li>
        <li>
          <h2>Entering information about other people</h2>
          As a host, you may enter information on behalf of guests (e.g. when
          creating an invite). Only do this for people who have actually agreed
          to be invited, and only with information they are comfortable being
          shared with the other event participants.
        </li>
        <li>
          <h2>Dietary and allergy information</h2>
          Dietary flags and allergy tags in Knytkalas.net are entered by users,
          not verified by the Service. They are a coordination tool, not a
          guarantee. If you or a guest has a serious allergy or medical dietary
          requirement, always confirm directly with whoever is preparing the
          food and seek adequate medical advice whenever needed. Do not rely on
          the app alone. Knytkalas.net is not liable for reactions or harm
          resulting from inaccurate, missing, or outdated dietary information.
        </li>
        <li>
          <h2>Your content</h2>
          You keep ownership of what you enter (event details, contributions,
          etc.). By entering it, you give the Service permission to display it
          to the other people involved in that event, for as long as your
          account or the event exists.
        </li>
        <li>
          <h2>Acceptable use</h2>
          Do not use the Service to harass anyone, impersonate someone else, or
          enter false, harmful, or illegal content. The Service can and will
          remove content or suspend accounts that do.
        </li>
        <li>
          <h2>Availability</h2>
          This is a student project, not a commercial product with an uptime
          guarantee. The Service is likely to change, have downtime, and may be
          taken offline entirely — for example, after this graduation project is
          complete — without advance notice.
        </li>
        <li>
          <h2>No warranty, limited liability</h2>
          The Service is provided "as is," without warranties of any kind. To
          the extent allowed by law, Knytkalas.net is not liable for any damages
          or losses arising from your use of the Service, including but not
          limited to the food.
        </li>
        <li>
          <h2>Termination</h2>
          You can stop using the Service and delete your account at any time.
          Knytkalas.net will suspend or remove access for anyone who violates
          these terms. Content can be deleted by the Service at any time.
        </li>
        <li>
          <h2>Governing law</h2>
          These terms are governed by Swedish law.
        </li>
        <li>
          <h2>Changes</h2>I may update these terms as the Service changes. I'll
          update the "last updated" date above when I do.
        </li>
      </ol>
    </InfoModal>
  );
}
