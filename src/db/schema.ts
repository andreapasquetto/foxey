import { relations } from "drizzle-orm";
import { boolean, date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  isArchived: boolean("is_archived").default(false),
  isBusiness: boolean("is_business").default(false),
  fullName: varchar("full_name").notNull(),
  subtitle: varchar("subtitle"),
  dob: date("dob"),
});

export const contactPhoneNumbers = pgTable("contact_phone_numbers", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  value: varchar("value").notNull(),
  type: varchar("type"),
});

export const contactEmails = pgTable("contact_emails", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  value: varchar("value").notNull(),
  type: varchar("type"),
});

export const contactAddresses = pgTable("contact_addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  contactId: uuid("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  value: varchar("value").notNull(),
  type: varchar("type"),
});

export const contactRelations = relations(contacts, ({ many }) => ({
  contactPhoneNumbers: many(contactPhoneNumbers),
  contactEmails: many(contactEmails),
  contactAddresses: many(contactAddresses),
}));

export const contactPhoneNumbersRelations = relations(contactPhoneNumbers, ({ one }) => ({
  contacts: one(contacts, {
    fields: [contactPhoneNumbers.contactId],
    references: [contacts.id],
  }),
}));

export const contactEmailsRelations = relations(contactEmails, ({ one }) => ({
  contacts: one(contacts, {
    fields: [contactEmails.contactId],
    references: [contacts.id],
  }),
}));

export const contactAddressesRelations = relations(contactAddresses, ({ one }) => ({
  contacts: one(contacts, {
    fields: [contactAddresses.contactId],
    references: [contacts.id],
  }),
}));
