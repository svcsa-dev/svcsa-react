

type BbTeam = {
  description?: string | undefined;
  id: number;
  name: string;
  email: string;
  shortname: string;
  captain: string;
  tel: string;
  wechat: string;
  logosrc: string;
  photosrc: string;
};

type BbTeamrank = {
  rank?: number;
  team?: BbTeam;
  teamid: number;
  win: number;
  lose: number;
  forfeit: number;
  point: number;
  total_score: number;
  oppo_score: number;
  score_diff?: number;
  groupid: number;
};

type BbSeasonTeam = {
  team?: BbTeam;
  season?: BbSeason;
  seasonid: number;
  teamid: number;
  groupid: number;
}