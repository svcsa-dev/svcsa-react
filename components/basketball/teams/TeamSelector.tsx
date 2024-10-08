"use client";

import React, { ReactNode, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import TeamImage from "./TeamImage";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface TeamSelectorProp {
  seasonTeams: BbSeasonTeam[];
  allBtnText?: string;
  allBtnIcon?: ReactNode; // ReactNode for JSX elements
}

export const TeamSelector: React.FC<TeamSelectorProp> = ({
  seasonTeams,
  allBtnText = "All Players",
  allBtnIcon = (
    <FontAwesomeIcon
      fixedWidth
      className="w-8 h-8"
      icon={faPeopleGroup}
      size="xl"
    />
  ),
}) => {
  const filteredTeam = seasonTeams.filter((t) => !!t);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const teamId = Number(searchParams?.get("teamid"));

  const [activedId, setActivedId] = useState(!teamId ? -1 : teamId);

  const handleTeamSelect = (newTeamId?: number): void => {
    const currentParams = new URLSearchParams(searchParams?.toString());

    if (!newTeamId) {
      currentParams.delete("teamid");
      setActivedId(-1);
    } else {
      currentParams.set("teamid", newTeamId.toString());
      setActivedId(newTeamId);
    }
    currentParams.delete("page");

    router.push(`${pathName}?${currentParams.toString()}`);
  };

  return (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 bg-white">
      <Listbox
        variant="faded"
        aria-label="Listbox menu with icons"
        topContent={
          <button
            className={`flex gap-2 items-center px-2 ${
              activedId === -1
                ? "bg-neutral-100 border-1 border-slate-300 rounded-md"
                : ""
            }`}
            onClick={() => handleTeamSelect()}
          >
            {allBtnIcon}
            <div>{allBtnText}</div>
          </button>
        }
      >
        {filteredTeam.map((seasonTeam) => {
          return (
            <ListboxItem
              key={seasonTeam.teamid}
              textValue="team"
              className={
                seasonTeam.teamid === teamId
                  ? "bg-neutral-100 border-1 border-slate-300"
                  : ""
              }
            >
              <div
                className="flex gap-2 items-center"
                onClick={() => handleTeamSelect(seasonTeam.teamid)}
              >
                <TeamImage
                  imageClass="w-8 h-8 bg-slate-100"
                  team={seasonTeam.team}
                  textClass="text-center font-medium text-xl font-thin text-zinc-800"
                />
                <div> {seasonTeam.team?.name}</div>
              </div>
            </ListboxItem>
          );
        })}
      </Listbox>
    </div>
  );
};
