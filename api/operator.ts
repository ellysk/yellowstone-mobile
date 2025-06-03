import { config } from "./config";

interface TagZone {
  region: string;
  districts: string[];
}

export interface OperatorResponse {
  operatorId: string;
  fullName: string;
  allowedTagZones: TagZone[];
}

export const fetchOperator = async (
  operatorId: string
): Promise<OperatorResponse> => {
  const response = await fetch(`${config.baseURL}/operators/${operatorId}`, {
    method: "GET",
    headers: config.headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
