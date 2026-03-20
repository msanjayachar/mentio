import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const getEpochSeconds = (time: string) => {
  const ms = new Date(time).getTime();

  return isNaN(ms) ? null : Math.floor(ms / 1000);
};

export const fetchSlides = async (token: string) => {
  const url = "http://localhost:8000/slides";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchCanvasSlides = async (token: string) => {
  const url = "http://localhost:8000/canvas";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};
