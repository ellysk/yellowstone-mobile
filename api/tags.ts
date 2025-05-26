import { config } from "./config";

interface TagCount {
  name: string;
  count: number;
}

interface TagsCountResponse {
  count: number;
  region: TagCount[];
  district: TagCount[];
}

export const fetchTotalTags = async (): Promise<TagsCountResponse> => {
  try {
    const response = await fetch(`${config.baseURL}/tags/count`, {
      method: "GET",
      headers: config.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tags data:", error);
    throw error;
  }
};
