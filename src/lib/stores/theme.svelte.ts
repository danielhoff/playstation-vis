import type { Theme } from "$lib/types";

let theme:Theme = $state('light');

export const getTheme = () => {
    return $state.snapshot(theme);
};

export const toggleTheme = () => {
    theme = theme === 'light' ? 'dark' : 'light';
}