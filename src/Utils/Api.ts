export const API = 'https://randomuser.me/api/?results=12';

export const getIds = async (): Promise<IDCard[]> => {
    const response = await fetch(API)
    const data = await response.json();
    return data.results;
}

export type NestedKeyOf<ObjectType extends object> =
    {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`
    }[keyof ObjectType & (string | number)];

export type SortableKeys = NestedKeyOf<IDCard>;

export interface IDCard {
   name: {
     first: string;
     last: string;
   };
   location: {
        street: {
            number: number;
            name: string;
        }
        city: string;
        state: string;
        country: string;
        postcode: number;
   };
   phone: string;
   email: string;
   dob: {
        date: string;
   };
   picture: {
        large: string;
        medium: string;
        thumbnail: string;
   };
   login: {
        uuid: string;
   }
}