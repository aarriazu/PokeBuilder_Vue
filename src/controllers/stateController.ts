import { ref } from 'vue';
import { User } from '@/classes/User';

export const userState = ref<User | null>(null);
export const mobileMenuState = ref(false);