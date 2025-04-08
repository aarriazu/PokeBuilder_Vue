import { ref } from 'vue';
import moveData from '@/assets/json/moveData.json';
import typeData from '@/assets/json/typeData.json';
import eggGroupData from '@/assets/json/eggGroupData.json';

function typeTranslate(type: string, lang: string): string | undefined{
    const typeRef = ref(
      typeData.find(p => p.name === type)
    );
    if (lang === 'en'){
      return type.replace('-', ' ');
    }
    else {
      const type_es = typeRef!.value?.name_es;
      return type_es;
    }
  }
  
  function moveTranslate(move: string, lang: string): string | undefined{
    const moveRef = ref(
      moveData.find(p => p.name === move)
    );
    if (lang === 'en'){
      return move.replace('-', ' ');
    }
    else {
      const move_es = moveRef!.value?.name_es;
      return move_es;
    }
  }
  
  function eggGroupTranslate(eggGroup: string, lang: string): string | undefined{
    const eggGroupRef = ref(
      eggGroupData.find(p => p.name === eggGroup)
    );
    if (lang === 'en'){
      const eggGroup_en = eggGroupRef!.value?.name_en;
      return eggGroup_en;
    }
    else {
      const eggGroup_es = eggGroupRef!.value?.name_es;
      return eggGroup_es;
    }
  }