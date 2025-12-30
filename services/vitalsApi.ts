// services/vitalsApi.ts

// NOTE: Replace /analyze with the actual endpoint path from your friend
const VITALS_API_URL = "https://fuzzy-patient-api-tanmayi.azurewebsites.net/predict-risk"; 

export interface VitalsInput {
  patient_id: number;
  heart_rate: number;
  body_temperature: number;
  spo2: number;
}

export interface VitalsResponse {
  risk_score: number;
}

/**
 * Sends patient vitals to the Fuzzy Logic Vitals Agent.
 */
export const analyzeVitals = async (data: VitalsInput): Promise<VitalsResponse> => {
  try {
    const response = await fetch(VITALS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Vitals API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Vitals Integration Failed:", error);
    // Fallback mock for MVP stability
    return { risk_score: 50.0 }; 
  }
};