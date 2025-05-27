import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Team } from '@/classes/Team';

export const useTeamStore = defineStore('teamStore', () => {
  const teams = ref<Team[]>([]);

  const setTeams = (newTeams: Team[]) => {
    teams.value = newTeams;
  };

  const addTeam = (newTeam: Team) => {
    teams.value.push(newTeam);
  };

  const removeTeam = (teamId: string) => {
    teams.value = teams.value.filter((team) => team._id !== teamId);
  };

  return {
    teams,
    setTeams,
    addTeam,
    removeTeam,
  };
});