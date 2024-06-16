import { format } from "date-fns";

export const formatDate = (date?: string | null | Date) =>
    date ? format(new Date(date), "dd.MM.yyyy") : "";

export const formatTime = (date?: string | null | Date) =>
    date ? format(new Date(date), "HH:mm:ss") : "";

export const formatDateTime = (date?: string | null | Date) =>
    date ? format(new Date(date), "dd.MM.yyyy HH:mm:ss") : "";
