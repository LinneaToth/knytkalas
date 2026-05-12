import Event from "../models/event.js";
import Invite from "../models/invite.js";
import User from "../models/user.js";

export const getAllInvites = async () => await Invite.find();

export const createInvite = async (
  eventId: string,
  inviteeId: string,
  invitedById: string,
) => {
  const [event, invitee, invBy] = await Promise.all([
    Event.findById(eventId),
    User.findById(inviteeId),
    User.findById(invitedById),
  ]);

  if (!event) return { error: "404-event" };
  if (!invitee) return { error: "404-invitee" };
  if (!invBy) return { error: "404-invitedby" };

  const alreadyInvited = await Invite.find({
    "invitee.id": invitee._id,
    "event.id": event._id,
  });

  if (alreadyInvited.length !== 0) return { error: "409-exists" };

  const newInvite = await new Invite({
    event: { occasion: event.occasion, id: event._id },
    invitee: { name: invitee.name, id: invitee._id },
    invitedBy: { name: invBy.name, id: invBy._id },
  }).save();

  await Promise.all([
    Event.findByIdAndUpdate(eventId, { $push: { invites: newInvite._id } }),
    User.findByIdAndUpdate(inviteeId, {
      $push: { invitesReceived: newInvite._id },
    }),
  ]);

  return newInvite;
};

export const findInviteByEvent = async (eventId: string) =>
  await Invite.find({ "event.id": eventId });

export const deleteInvite = async (id: string) => {
  const invite = await Invite.findByIdAndDelete(id);

  if (invite && invite.event && invite.invitee) {
    await Promise.all([
      Event.findByIdAndUpdate(invite.event.id, {
        $pull: { invites: invite._id },
      }),
      User.findByIdAndUpdate(invite.invitee.id, {
        $pull: { invitesReceived: invite._id },
      }),
    ]);
  }

  return { deleted: invite };
};
