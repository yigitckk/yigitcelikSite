import { useLayoutEffect, useEffect } from "react";

// Hook that works both on client-side and server-side
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Converts ISO date string to 'YYYY-MM-DD' format
export function ISOToDate(date) {
  if (!date) return null;

  const convertDate = new Date(date);
  if (isNaN(convertDate.getTime())) return null; // Handle invalid dates

  const year = convertDate.getFullYear();
  const month = String(convertDate.getMonth() + 1).padStart(2, '0'); // Add leading zero for single digit months
  const day = String(convertDate.getDate()).padStart(2, '0'); // Add leading zero for single digit days

  return `${year}-${month}-${day}`;
}

// Returns a random image URL from a predefined list
export function getRandomImage() {
  const randomImageUrl = [
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1657295791913-5074c912398e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=996&q=80",
  ];

  // Ensure there's at least one image in the list
  if (randomImageUrl.length === 0) return null;

  return randomImageUrl[Math.floor(Math.random() * randomImageUrl.length)];
}
