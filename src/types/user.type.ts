import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  image: StaticImport;
};
