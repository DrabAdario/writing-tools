export type NameRegionFilter =
  | "any"
  | "us"
  | "gb"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "nl"
  | "br"
  | "au"
  | "ca";

type RandomUserNameBlock = {
  title: string;
  first: string;
  last: string;
};

type RandomUserResult = {
  gender: string;
  name: RandomUserNameBlock;
  nat: string;
};

type RandomUserResponse = {
  results: RandomUserResult[];
};

export type FetchedName = {
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  /** Used only for RNG; never shown in prose. */
  nationality: string;
};

function buildNatQuery(region: NameRegionFilter): string {
  if (region === "any") return "";
  return `&nat=${encodeURIComponent(region)}`;
}

export async function fetchRandomName(region: NameRegionFilter): Promise<FetchedName> {
  const url = `https://randomuser.me/api/?inc=name,nat,gender${buildNatQuery(region)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Name service returned ${res.status}`);
  }
  const data = (await res.json()) as RandomUserResponse;
  const r = data.results[0];
  if (!r?.name) {
    throw new Error("Unexpected name response");
  }
  const firstName = r.name.first;
  const lastName = r.name.last;
  const fullName = `${firstName} ${lastName}`;
  return {
    title: r.name.title,
    firstName,
    lastName,
    fullName,
    gender: r.gender,
    nationality: r.nat,
  };
}
