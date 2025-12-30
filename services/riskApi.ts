const RISK_AGENT_ENDPOINT = "https://risk-agent-imaginecup.azurewebsites.net/api/risk_agent";

export interface RiskAgentRequest {
  patient_id: string;
  vitals: {
    spo2: number;
    temperature: number;
    heart_rate: number;
  };
  voice: {
    voice_score: number;
    metrics: {
      pause_ratio: number;
      speech_rate: number;
    };
  };
  behaviour: {
    missed_checkin_ratio: number;
    response_delay_ratio: number;
    caregiver_dependency: boolean;
    flags: string[];
  };
}

export const analyzeOverallRisk = async (payload: RiskAgentRequest) => {
  const response = await fetch(RISK_AGENT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Risk Agent Error: ${response.status}`);
  }

  return await response.json();
};