//WARNING! RUNNING THIS SCRIPT WILL OVERWRITE ANY EVENTS, USERS, INVITES COLLECTION YOU MAY HAVE IN YOUR DB

import "dotenv/config";
import Event from "../models/event.js";
import User from "../models/user.js";
import type { UserInput, EventInput, InviteInput } from "../types/types.js";
import Invite from "../models/invite.js";
import { connectToDb } from "../config/db.js";

await connectToDb();

const curYear = new Date().getFullYear();

const fictionalUsers = [
  {
    name: "Soren Lindstrom",
    email: "soren.l@example.com",
    dietaryRestrictions: {},
  },
  {
    name: "Amara Okoro",
    email: "amara.okoro@example.com",
    dietaryRestrictions: {},
  },
  {
    name: "Leo Rossi",
    email: "leo.rossi@example.com",
    dietaryRestrictions: {},
  },
  { name: "Yuki Tanaka", email: "yuki.t@example.com", dietaryRestrictions: {} },
  {
    name: "Finn O'Connor",
    email: "finn.oc@example.com",
    dietaryRestrictions: {},
  },
  {
    name: "Elena Vance",
    email: "evance@example.com",
    dietaryRestrictions: {
      meat: true,
      fish: true,
      dairy: true,
      egg: true,
      honey: true,
    },
  },
  {
    name: "Julian Thorne",
    email: "j.thorne@example.com",
    dietaryRestrictions: {
      meat: true,
      fish: true,
      dairy: true,
      egg: true,
      honey: true,
      soy: true,
    },
  },
  {
    name: "Clara Beaumont",
    email: "clara.b@example.com",
    dietaryRestrictions: { nuts: true, shellfish: true },
  },
  {
    name: "Marcus Vane",
    email: "mvane@example.com",
    dietaryRestrictions: { dairy: true, gluten: true },
  },
  {
    name: "Nadia Petrova",
    email: "n.petrova@example.com",
    dietaryRestrictions: { shellfish: true, egg: true },
  },
];

const seedUsers = async (users: UserInput[]) => {
  try {
    const createdUsers = await User.insertMany(users);
    console.log(
      `${createdUsers.length} users created successfully! First of which is: ${createdUsers[0].name}`,
    );
    return createdUsers;
  } catch (e) {
    console.error("Error seeding users:", e);
  }
};

await User.deleteMany({});
const users = await seedUsers(fictionalUsers);

if (!users) {
  throw new Error("Something went wrong, we have no users");
}

const fictionalEvents = [
  {
    startTime: new Date(`${curYear}-05-15T18:00:00`),
    location: "Vallåkra Garden",
    occasion: "Mid-May Mingle",
    host: { name: users[0].name, id: users[0]._id },
    description: "A casual evening with drinks and appetizers.",
  },
  {
    startTime: new Date("2026-05-22T18:00:00"),
    location: "Elena's place",
    occasion: "Dinner Party",
    host: { name: users[5].name, id: users[5]._id },
    description: "Let's try to keep it plant-based",
  },
  {
    startTime: new Date(`${curYear}-06-05T12:00:00`),
    location: "Stadsparken",
    occasion: "Summer Kickoff Picnic",
    host: { name: users[2].name, id: users[2]._id },
    description: "Family-friendly picnic. Bring your own blankets!",
  },
  {
    startTime: new Date(`${curYear}-08-14T17:00:00`),
    location: "Bredgatan 15, Vinslöv",
    occasion: "Kräftskiva (Crayfish Party)",
    host: { name: users[1].name, id: users[1]._id },
    description: "Crayfish, hats, and singing! Don't forget your snaps.",
  },
  {
    startTime: new Date(`${curYear}-11-10T19:00:00`),
    location: "The Old Farmhouse",
    occasion: "Mårten Gås Dinner",
    host: { name: users[4].name, id: users[4]._id },
    description: "A traditional goose dinner for late autumn vibes.",
  },
  {
    startTime: new Date(`${curYear}-12-24T14:00:00`),
    location: "Soren's Cabin",
    occasion: "Julafton",
    host: { name: users[0].name, id: users[0]._id },
    description: "Watching Kalle Anka and moving on to Julbord.",
  },
  {
    startTime: new Date(`${curYear}-12-31T20:00:00`),
    location: "Claras Ballroom, Trädgårdsgatan 20B",
    occasion: "New Year's Eve Gala",
    host: { name: users[7].name, id: users[7]._id },

    description: `Happy new ${curYear + 1}!`,
  },
];

const seedEvents = async (events: EventInput[]) => {
  try {
    const insertedEvents = await Event.insertMany(events);
    console.log(
      `${insertedEvents.length} events created successfully! First of which is: ${insertedEvents[0].occasion}`,
    );
    return insertedEvents;
  } catch (e) {
    console.error("Error seeding events: ", e);
    return [];
  }
};

await Event.deleteMany({});
const events = await seedEvents(fictionalEvents);

if (!events) {
  throw new Error("Something went wrong, we have no events");
}

const fictionalInvites: InviteInput[] = [
  {
    event: { occasion: "Mid-May Mingle", id: events[0]._id },
    invitee: { name: "Amara Okoro", id: users[1]._id },
    invitedBy: { name: "Soren Lindstrom", id: users[0]._id },
    status: "accepted",
    contributions: [
      {
        name: "Potato Salad",
        amount: 2,
        unit: "kg",
        dietaryRestrictions: {},
      },
    ],
  },
  {
    event: { occasion: "Mid-May Mingle", id: events[0]._id },
    invitee: { name: "Leo Rossi", id: users[2]._id },
    invitedBy: { name: "Soren Lindstrom", id: users[0]._id },
    status: "accepted",
    contributions: [
      { name: "Red Wine", amount: 3, unit: "bottles", dietaryRestrictions: {} },
      {
        name: "Baguette",
        amount: 4,
        unit: "loaves",
        dietaryRestrictions: { gluten: true },
      },
    ],
  },
  {
    event: { occasion: "Mid-May Mingle", id: events[0]._id },
    invitee: { name: "Finn O'Connor", id: users[4]._id },
    invitedBy: { name: "Leo Rossi", id: users[2]._id },
    status: "accepted",
    contributions: [
      {
        name: "Craft Beer",
        amount: 6,
        unit: "cans",
        dietaryRestrictions: { gluten: true },
      },
    ],
  },

  {
    event: { occasion: "Dinner Party", id: events[1]._id },
    invitee: { name: "Julian Thorne", id: users[6]._id },
    invitedBy: { name: "Elena Vance", id: users[5]._id },
    status: "accepted",
    contributions: [
      {
        name: "Vegan Brownies",
        amount: 12,
        unit: "squares",
        dietaryRestrictions: { gluten: true },
      },
      {
        name: "Oat Milk Ice Cream",
        amount: 2,
        unit: "liters",
        dietaryRestrictions: {},
      },
    ],
  },
  {
    event: { occasion: "Dinner Party", id: events[1]._id },
    invitee: { name: "Marcus Vane", id: users[8]._id },
    invitedBy: { name: "Elena Vance", id: users[5]._id },
    status: "accepted",
    contributions: [
      {
        name: "Gluten-free Pasta",
        amount: 1,
        unit: "kg",
        dietaryRestrictions: {},
      },
    ],
  },
  {
    event: { occasion: "Summer Kickoff Picnic", id: events[2]._id },
    invitee: { name: "Yuki Tanaka", id: users[3]._id },
    invitedBy: { name: "Leo Rossi", id: users[2]._id },
    status: "accepted",
    contributions: [
      {
        name: "Onigiri",
        amount: 10,
        unit: "pieces",
        dietaryRestrictions: { fish: true },
      },
    ],
  },
  {
    event: { occasion: "Summer Kickoff Picnic", id: events[2]._id },
    invitee: { name: "Elena Vance", id: users[5]._id },
    invitedBy: { name: "Soren Lindstrom", id: users[0]._id },
    status: "accepted",
    contributions: [
      {
        name: "Vegan Wraps",
        amount: 8,
        unit: "pieces",
        dietaryRestrictions: { gluten: true },
      },
    ],
  },

  {
    event: { occasion: "Kräftskiva (Crayfish Party)", id: events[3]._id },
    invitee: { name: "Nadia Petrova", id: users[9]._id },
    invitedBy: { name: "Amara Okoro", id: users[1]._id },
    status: "accepted",
    contributions: [
      {
        name: "Västerbotten Cheese Pie",
        amount: 2,
        unit: "pies",
        dietaryRestrictions: { dairy: true, gluten: true },
      },
    ],
  },

  {
    event: { occasion: "Julafton", id: events[5]._id },
    invitee: { name: "Amara Okoro", id: users[1]._id },
    invitedBy: { name: "Soren Lindstrom", id: users[0]._id },
    status: "accepted",
    contributions: [
      {
        name: "Meatballs",
        amount: 50,
        unit: "pcs",
        dietaryRestrictions: { meat: true, dairy: true, egg: true },
      },
    ],
  },
  {
    event: { occasion: "Julafton", id: events[5]._id },
    invitee: { name: "Yuki Tanaka", id: users[3]._id },
    invitedBy: { name: "Soren Lindstrom", id: users[0]._id },
    status: "accepted",
    contributions: [
      {
        name: "Pickled Herring",
        amount: 3,
        unit: "jars",
        dietaryRestrictions: { fish: true },
      },
    ],
  },

  {
    event: { occasion: "New Year's Eve Gala", id: events[6]._id },
    invitee: { name: "Elena Vance", id: users[5]._id },
    invitedBy: { name: "Clara Beaumont", id: users[7]._id },
    status: "accepted",
    contributions: [
      {
        name: "Vegan Canapés",
        amount: 30,
        unit: "pcs",
        dietaryRestrictions: { gluten: true },
      },
    ],
  },
];

const seedInvites = async (invites: InviteInput[]) => {
  try {
    const createdInvites = await Invite.insertMany(invites);
    console.log(
      `${createdInvites.length} invites created successfully! First of which is for: ${createdInvites[0].invitee.name}`,
    );
    return createdInvites;
  } catch (e) {
    console.error("Error seeding invites: ", e);
  }
};

await Invite.deleteMany({});
const invites = await seedInvites(fictionalInvites);

if (!invites) {
  throw new Error("Something went wrong, we have no invites");
}

const addInvitesToEvents = async () => {
  for (const event of events) {
    const relatedInvites = invites.filter(
      (inv) => inv.event.id.toString() === event._id.toString(),
    );

    for (const invite of relatedInvites) {
      await Event.findByIdAndUpdate(
        event._id,
        { $push: { invites: invite._id } },
        { returnDocument: "after" },
      );
    }
  }
};

await addInvitesToEvents();

const connectToUsers = async () => {
  for (const user of users) {
    const relatedInvites = invites.filter(
      (inv) => inv.invitee.id.toString() === user._id.toString(),
    );
    const relatedEvents = events.filter(
      (event) => event.host.id.toString() === user._id.toString(),
    );

    for (const invite of relatedInvites) {
      await User.findByIdAndUpdate(
        user._id,
        { $push: { invitesReceived: invite._id } },
        { returnDocument: "after" },
      );
    }

    for (const event of relatedEvents) {
      await User.findByIdAndUpdate(
        user._id,
        { $push: { eventsHosting: event._id } },
        { returnDocument: "after" },
      );
    }
  }
};

await connectToUsers();

process.exit(0);
