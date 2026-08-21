"use client";
import InfoModal from "@/ui/components/InfoModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PrivacyModal({ isOpen, onClose }: Props) {
  return (
    <InfoModal isOpen={isOpen} onClose={onClose}>
      <h1>Privacy Policy</h1>
      <p>Last updated: 2026-08-21</p>
      <p>
        Knytkalas ("the Service") is a student project built as part of a higher
        vocational education (in Swedish "Yrkeshögskola, YH") graduation
        project. This policy explains what personal data is collected when you
        use it, and how it's handled.
      </p>
      <ol className="flex list-decimal flex-col gap-3">
        <li>
          <h2>What we collect</h2>
          <ul className="flex flex-col gap-3">
            <li>
              Account data - When you sign in with Google, we receive your name,
              email address, and profile picture from Google. We do not receive
              or store your Google password.
            </li>
            <li>
              Session data — To keep you signed in, we store a session token,
              and, for security purposes, the IP address and browser/device
              information (user agent) associated with that session.
            </li>
            <li>
              Event data — If you host an event, we store what you enter: The
              occasion, description, date, location, and response deadline.
            </li>
            <li>
              Guest and invite data — If you invite someone, we store the
              guest's name, their RSVP status, and how many guests they are
              bringing.
            </li>
            <li>
              Contribution data — If you or a guest signs up to bring something,
              we store the dish name, category, servings, and description.
            </li>
            <li>
              Dietary information — You may optionally mark foods you avoid
              (e.g. dairy, nuts, gluten, shellfish) on your profile, and this
              can be attached to a contribution. This helps hosts and guests
              plan food safely. This data is only shown to people involved in
              the same event.
            </li>
            <li>
              Cookies — We use a single essential session cookie required to
              keep you logged in. We do not use analytics, advertising, or
              tracking cookies, so no cookie consent banner is shown.
            </li>
          </ul>
        </li>
        <li>
          <h2>Why we use it</h2>
          <ul className="flex flex-col gap-3">
            <li>To let you sign in and use the Service</li>
            <li>
              To let hosts organize events and guests coordinate contributions
              (contract necessity)
            </li>
            <li>
              To keep the Service secure (legitimate interest — e.g. session/IP
              logging to detect abuse)
            </li>
          </ul>
        </li>
        <li>
          <h2>Who we share it with</h2>
          <ul className="flex flex-col gap-3">
            <li>Google — For sign-in (Google Sign-In / OAuth)</li>
            <li>
              Neon — Our database provider, which stores the data listed above
              on our behalf.
            </li>
            <li>Vercel — Which hosts the application itself.</li>
          </ul>
          We do not sell your data or share it with advertisers.
        </li>
        <li>
          <h2>How long we keep it</h2>
          Event and invite data is kept for as long as the event exists, plus a
          limited period after (or until deleted by the host). Deleting your
          account removes your account data; contributions tied to a deleted
          invite are removed as well.
        </li>
        <li>
          <h2>Your rights</h2> You can:
          <ul className="flex flex-col gap-3">
            <li>
              See and edit your profile data at any time from your account.
            </li>
            <li>
              Delete your account, which removes your personal data from our
              systems (subject to what's needed to keep other users' events
              consistent, e.g. an event you attended may keep a record that a
              guest attended without your full profile).
            </li>
            <li>
              Contact us to request a copy of your data, ask us to correct it,
              or raise any other data protection question.
            </li>
            <li>
              Lodge a complaint with your local data protection authority (in
              Sweden: Integritetsskyddsmyndigheten, imy.se).
            </li>
          </ul>
        </li>
        <li>
          <h2>Children</h2> This Service isn't directed at children and isn't
          intended for users under 13 (or the minimum age required by Google's
          own terms).
        </li>
        <li>
          <h2>Changes</h2> We may update this policy as the Service changes. We
          will update the "last updated" date above when we do.
        </li>
      </ol>
    </InfoModal>
  );
}
