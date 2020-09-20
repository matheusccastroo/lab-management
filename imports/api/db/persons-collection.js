import { Mongo } from 'meteor/mongo';

export const PersonsCollection = new Mongo.Collection('persons');
