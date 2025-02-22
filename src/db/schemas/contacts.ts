import { relations } from "drizzle-orm";
import { boolean, date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").notNull(),
  isArchived: boolean("is_archived").notNull().default(false),
  isBusiness: boolean("is_business").notNull().default(false),
  fullName: varchar("full_name").notNull(),
  subtitle: varchar("subtitle"),
  dob: date("dob"),
});

export const contactPhoneNumbers = pgTable("contact_phone_numbers", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id),
  value: varchar("value").notNull(),
  isArchived: boolean("is_archived").notNull().default(false),
});

export const contactEmails = pgTable("contact_emails", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id),
  value: varchar("value").notNull(),
  isArchived: boolean("is_archived").notNull().default(false),
});

export const contactAddresses = pgTable("contact_addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id),
  isArchived: boolean("is_archived").notNull().default(false),
  value: varchar("value").notNull(),
});

export const contactRelations = relations(contacts, ({ many }) => ({
  phoneNumbers: many(contactPhoneNumbers),
  emails: many(contactEmails),
  addresses: many(contactAddresses),
}));

export const contactPhoneNumberRelations = relations(contactPhoneNumbers, ({ one }) => ({
  contact: one(contacts, {
    fields: [contactPhoneNumbers.contactId],
    references: [contacts.id],
  }),
}));

export const contactEmailRelations = relations(contactEmails, ({ one }) => ({
  contact: one(contacts, {
    fields: [contactEmails.contactId],
    references: [contacts.id],
  }),
}));

export const contactAddressRelations = relations(contactAddresses, ({ one }) => ({
  contact: one(contacts, {
    fields: [contactAddresses.contactId],
    references: [contacts.id],
  }),
}));
