import type { Theme } from "$lib/types";

let theme:Theme = $state('light');

export const getTheme = () => {
    return theme;
};

export const toggleTheme = () => {
    theme = theme === 'light' ? 'dark' : 'light';
}